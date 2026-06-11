-- =====================================================
-- Akedex Platform — V1 Database Schema
-- Education Operating Environment
-- =====================================================
-- Multi-tenant: All tables include tenant_id
-- RLS-ready: PostgreSQL Row-Level Security compatible
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- LICENSING & ACTIVATION
-- =====================================================

CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_key VARCHAR(50) NOT NULL UNIQUE,
    institution_id UUID,
    plan VARCHAR(20) NOT NULL CHECK (plan IN ('STARTER', 'PROFESSIONAL', 'ENTERPRISE', 'NETWORK')),
    status VARCHAR(20) NOT NULL DEFAULT 'ISSUED' CHECK (status IN ('ISSUED', 'ACTIVATED', 'EXPIRED', 'REVOKED')),
    max_students INTEGER,
    max_staff INTEGER,
    valid_from DATE,
    valid_until DATE,
    activated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE activations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID NOT NULL REFERENCES licenses(id),
    institution_id UUID NOT NULL,
    tenant_id UUID NOT NULL,
    activated_by VARCHAR(255),
    machine_fingerprint VARCHAR(255),
    ip_address VARCHAR(45),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DEACTIVATED', 'SUPERSEDED')),
    activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deactivated_at TIMESTAMPTZ
);

CREATE INDEX idx_activation_institution ON activations(institution_id);
CREATE INDEX idx_activation_license ON activations(license_id);

-- =====================================================
-- INSTITUTIONS
-- =====================================================

CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    institution_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('SCHOOL', 'COLLEGE', 'UNIVERSITY', 'COACHING_INSTITUTE', 'VOCATIONAL_INSTITUTE', 'EDUCATIONAL_NETWORK')),
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING_ACTIVATION' CHECK (status IN ('PENDING_ACTIVATION', 'ACTIVE', 'SUSPENDED', 'DEACTIVATED')),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(3),
    postal_code VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    affiliation_number VARCHAR(50),
    board VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_institution_tenant ON institutions(tenant_id);

CREATE TABLE campuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    institution_id UUID NOT NULL REFERENCES institutions(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL,
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_campus_institution ON campuses(institution_id);
CREATE INDEX idx_campus_tenant ON campuses(tenant_id);

-- =====================================================
-- AUTH & RBAC
-- =====================================================

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) NOT NULL UNIQUE,
    module VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    name VARCHAR(50) NOT NULL,
    display_name VARCHAR(100),
    description VARCHAR(255),
    is_system_role BOOLEAN DEFAULT FALSE,
    UNIQUE(name, tenant_id)
);

CREATE INDEX idx_role_tenant ON roles(tenant_id);

CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id),
    permission_id UUID NOT NULL REFERENCES permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'LOCKED', 'PENDING_VERIFICATION')),
    last_login_at TIMESTAMPTZ,
    login_count INTEGER DEFAULT 0,
    institution_id UUID REFERENCES institutions(id),
    campus_id UUID REFERENCES campuses(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0,
    UNIQUE(email, tenant_id)
);

CREATE INDEX idx_user_tenant ON users(tenant_id);
CREATE INDEX idx_user_email ON users(tenant_id, email);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id),
    role_id UUID NOT NULL REFERENCES roles(id),
    PRIMARY KEY (user_id, role_id)
);

-- =====================================================
-- STUDENTS & IDENTITY
-- =====================================================

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    universal_academic_id VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20) CHECK (gender IN ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY')),
    email VARCHAR(255),
    phone VARCHAR(20),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(3),
    nationality VARCHAR(50),
    blood_group VARCHAR(5),
    aadhaar_number VARCHAR(12),
    photo_url VARCHAR(500),
    lifecycle_status VARCHAR(30) NOT NULL DEFAULT 'PROSPECT',
    current_institution_id UUID REFERENCES institutions(id),
    current_campus_id UUID REFERENCES campuses(id),
    admission_number VARCHAR(30),
    roll_number VARCHAR(20),
    current_class VARCHAR(30),
    current_section VARCHAR(10),
    academic_year VARCHAR(10),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_student_tenant ON students(tenant_id);
CREATE INDEX idx_student_status ON students(tenant_id, lifecycle_status);
CREATE INDEX idx_student_name ON students(tenant_id, last_name, first_name);
CREATE INDEX idx_student_institution ON students(tenant_id, current_institution_id);

CREATE TABLE guardians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    relationship VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    occupation VARCHAR(100),
    address VARCHAR(500),
    is_primary_contact BOOLEAN DEFAULT FALSE,
    student_id UUID NOT NULL REFERENCES students(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_guardian_tenant ON guardians(tenant_id);
CREATE INDEX idx_guardian_student ON guardians(student_id);

-- =====================================================
-- TEACHERS
-- =====================================================

CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    universal_teacher_id VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    qualification VARCHAR(200),
    specialization VARCHAR(200),
    experience_years INTEGER,
    institution_id UUID REFERENCES institutions(id),
    campus_id UUID REFERENCES campuses(id),
    department VARCHAR(100),
    designation VARCHAR(100),
    joining_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_teacher_tenant ON teachers(tenant_id);
CREATE INDEX idx_teacher_institution ON teachers(tenant_id, institution_id);

-- =====================================================
-- ENROLLMENTS
-- =====================================================

CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id),
    institution_id UUID NOT NULL REFERENCES institutions(id),
    campus_id UUID REFERENCES campuses(id),
    program VARCHAR(100),
    class_name VARCHAR(30),
    section VARCHAR(10),
    academic_year VARCHAR(10) NOT NULL,
    enrollment_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    exit_date DATE,
    exit_reason VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_enrollment_student ON enrollments(student_id);
CREATE INDEX idx_enrollment_tenant ON enrollments(tenant_id);
CREATE INDEX idx_enrollment_institution ON enrollments(institution_id);
CREATE INDEX idx_enrollment_year ON enrollments(tenant_id, academic_year);

-- =====================================================
-- ADMISSIONS
-- =====================================================

CREATE TABLE admission_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    application_reference VARCHAR(30) NOT NULL UNIQUE,
    student_id UUID REFERENCES students(id),
    case_id UUID,
    institution_id UUID NOT NULL REFERENCES institutions(id),
    campus_id UUID REFERENCES campuses(id),
    applicant_first_name VARCHAR(100) NOT NULL,
    applicant_last_name VARCHAR(100) NOT NULL,
    applicant_email VARCHAR(255),
    applicant_phone VARCHAR(20),
    date_of_birth DATE,
    applying_for_class VARCHAR(30),
    applying_for_program VARCHAR(100),
    academic_year VARCHAR(10),
    previous_school VARCHAR(255),
    previous_class VARCHAR(30),
    status VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
    reviewed_by UUID,
    review_notes TEXT,
    decision_date DATE,
    source VARCHAR(30),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_admission_tenant ON admission_applications(tenant_id);
CREATE INDEX idx_admission_status ON admission_applications(tenant_id, status);
CREATE INDEX idx_admission_institution ON admission_applications(institution_id);

-- =====================================================
-- WORKFLOW & CASE MANAGEMENT
-- =====================================================

CREATE TABLE workflow_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    case_reference VARCHAR(30) NOT NULL UNIQUE,
    case_type VARCHAR(30) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    priority VARCHAR(10) NOT NULL DEFAULT 'MEDIUM',
    assigned_to UUID,
    assigned_to_name VARCHAR(200),
    subject_type VARCHAR(20),
    subject_id UUID,
    subject_name VARCHAR(200),
    institution_id UUID REFERENCES institutions(id),
    campus_id UUID REFERENCES campuses(id),
    due_date TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ,
    next_action VARCHAR(500),
    resolution_notes TEXT,
    source VARCHAR(20),
    tags VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_case_tenant ON workflow_cases(tenant_id);
CREATE INDEX idx_case_type ON workflow_cases(tenant_id, case_type);
CREATE INDEX idx_case_status ON workflow_cases(tenant_id, status);
CREATE INDEX idx_case_assignee ON workflow_cases(tenant_id, assigned_to);

CREATE TABLE case_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    case_id UUID NOT NULL REFERENCES workflow_cases(id),
    event_type VARCHAR(30) NOT NULL,
    description TEXT,
    old_value VARCHAR(500),
    new_value VARCHAR(500),
    performed_by UUID,
    performed_by_name VARCHAR(200),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_case_event_case ON case_events(case_id);
CREATE INDEX idx_case_event_tenant ON case_events(tenant_id);

-- =====================================================
-- TRANSFERS
-- =====================================================

CREATE TABLE transfer_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    transfer_reference VARCHAR(30) NOT NULL UNIQUE,
    case_id UUID REFERENCES workflow_cases(id),
    student_id UUID NOT NULL REFERENCES students(id),
    sending_institution_id UUID NOT NULL REFERENCES institutions(id),
    receiving_institution_id UUID REFERENCES institutions(id),
    transfer_type VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'REQUESTED',
    reason TEXT,
    requested_date DATE,
    approved_date DATE,
    completed_date DATE,
    documents_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_transfer_tenant ON transfer_cases(tenant_id);
CREATE INDEX idx_transfer_student ON transfer_cases(student_id);

-- =====================================================
-- DOCUMENTS
-- =====================================================

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    document_type VARCHAR(30) NOT NULL,
    title VARCHAR(255) NOT NULL,
    file_name VARCHAR(255),
    file_url VARCHAR(500),
    file_size BIGINT,
    mime_type VARCHAR(100),
    subject_type VARCHAR(20) NOT NULL,
    subject_id UUID NOT NULL,
    verification_status VARCHAR(20) DEFAULT 'PENDING',
    verified_by UUID,
    verification_notes VARCHAR(500),
    is_confidential BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_document_tenant ON documents(tenant_id);
CREATE INDEX idx_document_subject ON documents(subject_type, subject_id);

-- =====================================================
-- ATTENDANCE
-- =====================================================

CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id),
    institution_id UUID NOT NULL REFERENCES institutions(id),
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'HALF_DAY')),
    marked_by UUID,
    remarks VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, student_id, date)
);

CREATE INDEX idx_attendance_tenant ON attendance_records(tenant_id);
CREATE INDEX idx_attendance_student ON attendance_records(student_id, date);
CREATE INDEX idx_attendance_date ON attendance_records(tenant_id, date);

-- =====================================================
-- ASSESSMENTS
-- =====================================================

CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id),
    institution_id UUID NOT NULL REFERENCES institutions(id),
    subject VARCHAR(100) NOT NULL,
    assessment_type VARCHAR(30) NOT NULL,
    academic_year VARCHAR(10),
    term VARCHAR(20),
    max_marks NUMERIC(5,1),
    obtained_marks NUMERIC(5,1),
    grade VARCHAR(5),
    remarks VARCHAR(255),
    assessed_by UUID,
    assessment_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_assessment_tenant ON assessments(tenant_id);
CREATE INDEX idx_assessment_student ON assessments(student_id);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(30) NOT NULL,
    priority VARCHAR(10) DEFAULT 'MEDIUM',
    is_read BOOLEAN DEFAULT FALSE,
    entity_type VARCHAR(30),
    entity_id UUID,
    action_url VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notification_user ON notifications(tenant_id, user_id, is_read);

-- =====================================================
-- AUDIT LOG
-- =====================================================

CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    description TEXT,
    old_values TEXT,
    new_values TEXT,
    performed_by UUID,
    performed_by_name VARCHAR(200),
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    module VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_tenant ON audit_events(tenant_id);
CREATE INDEX idx_audit_entity ON audit_events(entity_type, entity_id);
CREATE INDEX idx_audit_user ON audit_events(performed_by);
CREATE INDEX idx_audit_timestamp ON audit_events(tenant_id, created_at);

-- =====================================================
-- SEED DATA: Default Permissions
-- =====================================================

INSERT INTO permissions (id, code, module, description) VALUES
    (gen_random_uuid(), 'INSTITUTION_READ', 'INSTITUTION', 'View institution details'),
    (gen_random_uuid(), 'INSTITUTION_WRITE', 'INSTITUTION', 'Create/edit institution'),
    (gen_random_uuid(), 'STUDENT_READ', 'STUDENTS', 'View student records'),
    (gen_random_uuid(), 'STUDENT_WRITE', 'STUDENTS', 'Create/edit student records'),
    (gen_random_uuid(), 'TEACHER_READ', 'TEACHERS', 'View teacher records'),
    (gen_random_uuid(), 'TEACHER_WRITE', 'TEACHERS', 'Create/edit teacher records'),
    (gen_random_uuid(), 'ADMISSION_READ', 'ADMISSIONS', 'View admission applications'),
    (gen_random_uuid(), 'ADMISSION_WRITE', 'ADMISSIONS', 'Process admission applications'),
    (gen_random_uuid(), 'ADMISSION_APPROVE', 'ADMISSIONS', 'Approve/reject admissions'),
    (gen_random_uuid(), 'TRANSFER_READ', 'TRANSFERS', 'View transfer cases'),
    (gen_random_uuid(), 'TRANSFER_WRITE', 'TRANSFERS', 'Process transfer cases'),
    (gen_random_uuid(), 'TRANSFER_APPROVE', 'TRANSFERS', 'Approve/reject transfers'),
    (gen_random_uuid(), 'CASE_READ', 'WORKFLOW', 'View workflow cases'),
    (gen_random_uuid(), 'CASE_WRITE', 'WORKFLOW', 'Create/edit cases'),
    (gen_random_uuid(), 'CASE_ASSIGN', 'WORKFLOW', 'Assign cases'),
    (gen_random_uuid(), 'DOCUMENT_READ', 'DOCUMENTS', 'View documents'),
    (gen_random_uuid(), 'DOCUMENT_WRITE', 'DOCUMENTS', 'Upload documents'),
    (gen_random_uuid(), 'DOCUMENT_VERIFY', 'DOCUMENTS', 'Verify documents'),
    (gen_random_uuid(), 'ATTENDANCE_READ', 'ATTENDANCE', 'View attendance'),
    (gen_random_uuid(), 'ATTENDANCE_WRITE', 'ATTENDANCE', 'Mark attendance'),
    (gen_random_uuid(), 'ASSESSMENT_READ', 'ASSESSMENTS', 'View assessments'),
    (gen_random_uuid(), 'ASSESSMENT_WRITE', 'ASSESSMENTS', 'Create/edit assessments'),
    (gen_random_uuid(), 'AUDIT_READ', 'AUDIT', 'View audit logs'),
    (gen_random_uuid(), 'USER_MANAGE', 'AUTH', 'Manage users'),
    (gen_random_uuid(), 'ROLE_MANAGE', 'AUTH', 'Manage roles'),
    (gen_random_uuid(), 'DASHBOARD_VIEW', 'DASHBOARD', 'View dashboard'),
    (gen_random_uuid(), 'REPORT_VIEW', 'REPORTS', 'View reports'),
    (gen_random_uuid(), 'SYSTEM_ADMIN', 'SYSTEM', 'System administration');
