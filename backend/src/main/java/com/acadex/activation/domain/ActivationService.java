package com.acadex.activation.domain;

import com.acadex.auth.domain.*;
import com.acadex.institution.domain.Campus;
import com.acadex.institution.domain.Institution;
import com.acadex.institution.domain.InstitutionRepository;
import com.acadex.institution.domain.InstitutionStatus;
import com.acadex.institution.domain.InstitutionType;
import com.acadex.students.domain.*;
import com.acadex.teachers.domain.*;
import com.acadex.workflow.domain.*;
import com.acadex.admissions.domain.*;
import com.acadex.transfers.domain.*;
import com.acadex.documents.domain.*;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ActivationService {

    private final LicenseRepository licenseRepository;
    private final ActivationRepository activationRepository;
    private final InstitutionRepository institutionRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Seeding repositories
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final WorkflowCaseRepository workflowCaseRepository;
    private final AdmissionApplicationRepository admissionApplicationRepository;
    private final TransferCaseRepository transferCaseRepository;
    private final DocumentRepository documentRepository;

    @Transactional
    public Map<String, Object> activateLicense(String licenseKey, String ipAddress, String fingerprint) {
        License license = licenseRepository.findByLicenseKey(licenseKey)
                .orElseThrow(() -> new IllegalArgumentException("Invalid license key."));

        if (license.getStatus() == License.LicenseStatus.ACTIVATED) {
            Institution existingInst = institutionRepository.findById(license.getInstitutionId())
                    .orElseThrow(() -> new IllegalStateException("Institution not found for activated license."));
            
            Map<String, Object> response = new HashMap<>();
            response.put("tenantId", existingInst.getTenantId().toString());
            response.put("institutionName", existingInst.getName());
            response.put("plan", license.getPlan().toString());
            return response;
        }

        if (license.getStatus() != License.LicenseStatus.ISSUED) {
            throw new IllegalArgumentException("License cannot be activated (Status: " + license.getStatus() + ")");
        }

        UUID tenantId = UUID.randomUUID();

        // 1. Create Institution
        Institution institution = new Institution();
        institution.setTenantId(tenantId);
        institution.setInstitutionCode("INS-DPS-" + String.format("%04d", new Random().nextInt(10000)));
        institution.setName("Delhi Public School, R.K. Puram");
        institution.setType(InstitutionType.SCHOOL);
        institution.setStatus(InstitutionStatus.ACTIVE);
        institution.setCity("New Delhi");
        institution.setCountry("IND");
        institution.setCreatedBy(UUID.fromString("00000000-0000-0000-0000-000000000000"));
        institution.setUpdatedBy(UUID.fromString("00000000-0000-0000-0000-000000000000"));
        institution = institutionRepository.save(institution);

        // 2. Create primary Campus
        Campus campus = new Campus();
        campus.setTenantId(tenantId);
        campus.setInstitution(institution);
        campus.setName("Dwarka Campus");
        campus.setCode("DPS-DWK-01");
        campus.setPrimary(true);
        campus.setCreatedBy(UUID.fromString("00000000-0000-0000-0000-000000000000"));
        campus.setUpdatedBy(UUID.fromString("00000000-0000-0000-0000-000000000000"));
        institution.getCampuses().add(campus);
        institutionRepository.save(institution);

        // 3. Create default roles and attach permissions
        List<Permission> allPermissions = permissionRepository.findAll();
        
        Role adminRole = new Role();
        adminRole.setTenantId(tenantId);
        adminRole.setName("SYSTEM_ADMIN");
        adminRole.setDisplayName("System Administrator");
        adminRole.setSystemRole(true);
        adminRole.setPermissions(new HashSet<>(allPermissions));
        adminRole = roleRepository.save(adminRole);

        Role registrarRole = new Role();
        registrarRole.setTenantId(tenantId);
        registrarRole.setName("REGISTRAR");
        registrarRole.setDisplayName("Registrar");
        registrarRole.setSystemRole(true);
        for (Permission p : allPermissions) {
            if (p.getCode().contains("STUDENT") || p.getCode().contains("ADMISSION") || p.getCode().contains("DOCUMENT")) {
                registrarRole.getPermissions().add(p);
            }
        }
        roleRepository.save(registrarRole);

        // 4. Create default superadmin User
        User adminUser = new User();
        adminUser.setTenantId(tenantId);
        adminUser.setEmail("admin@dps.edu");
        adminUser.setPasswordHash(passwordEncoder.encode("admin"));
        adminUser.setFirstName("Dr. Meena");
        adminUser.setLastName("Shah");
        adminUser.setStatus(User.UserStatus.ACTIVE);
        adminUser.setInstitutionId(institution.getId());
        adminUser.setCampusId(institution.getCampuses().get(0).getId());
        adminUser.setRoles(Collections.singleton(adminRole));
        adminUser.setCreatedBy(UUID.fromString("00000000-0000-0000-0000-000000000000"));
        adminUser.setUpdatedBy(UUID.fromString("00000000-0000-0000-0000-000000000000"));
        userRepository.save(adminUser);

        // 5. Update License
        license.setInstitutionId(institution.getId());
        license.setStatus(License.LicenseStatus.ACTIVATED);
        license.setActivatedAt(Instant.now());
        licenseRepository.save(license);

        // 6. Record Activation
        Activation activation = new Activation();
        activation.setLicenseId(license.getId());
        activation.setInstitutionId(institution.getId());
        activation.setTenantId(tenantId);
        activation.setActivatedBy("SYSTEM_AUTO");
        activation.setMachineFingerprint(fingerprint);
        activation.setIpAddress(ipAddress);
        activation.setStatus(Activation.ActivationStatus.ACTIVE);
        activationRepository.save(activation);

        // Seed demo data
        seedDemoData(tenantId, institution.getId(), institution.getCampuses().get(0).getId());

        Map<String, Object> response = new HashMap<>();
        response.put("tenantId", tenantId.toString());
        response.put("institutionName", institution.getName());
        response.put("plan", license.getPlan().toString());
        return response;
    }

    private void seedDemoData(UUID tenantId, UUID institutionId, UUID campusId) {
        // Seed Students
        Student s1 = createStudent(tenantId, "UAI-2026-0000000001", "Arjun", "Mehta", "10-A", StudentLifecycleStatus.ACTIVE, "DPS-2024-1001", "arjun.m@dps.edu", "+91 98100 10001");
        Student s2 = createStudent(tenantId, "UAI-2026-0000000002", "Priya", "Sharma", "10-B", StudentLifecycleStatus.ACTIVE, "DPS-2024-1002", "priya.s@dps.edu", "+91 98100 10002");
        Student s3 = createStudent(tenantId, "UAI-2026-0000000003", "Rohan", "Gupta", "9-A", StudentLifecycleStatus.ACTIVE, "DPS-2024-1003", "rohan.g@dps.edu", "+91 98100 10003");
        Student s4 = createStudent(tenantId, "UAI-2026-0000000004", "Ananya", "Patel", "11-Science", StudentLifecycleStatus.ACTIVE, "DPS-2024-1004", "ananya.p@dps.edu", "+91 98100 10004");
        Student s5 = createStudent(tenantId, "UAI-2026-0000000005", "Karan", "Singh", "12-Commerce", StudentLifecycleStatus.TRANSFERRED, "DPS-2024-1005", "karan.s@dps.edu", "+91 98100 10005");
        Student s6 = createStudent(tenantId, "UAI-2026-0000000008", "Sneha", "Reddy", "9-B", StudentLifecycleStatus.SUSPENDED, "DPS-2024-1008", "sneha.r@dps.edu", "+91 98100 10008");

        studentRepository.saveAll(Arrays.asList(s1, s2, s3, s4, s5, s6));

        // Seed Teachers
        createTeacher(tenantId, "UTI-2026-0000001201", "Dr. Meena", "Shah", "Administration", "Principal", "meena.shah@dps.edu", 22);
        createTeacher(tenantId, "UTI-2026-0000001202", "Mr. Rajiv", "Saxena", "Mathematics", "HOD", "rajiv.s@dps.edu", 15);
        createTeacher(tenantId, "UTI-2026-0000001203", "Mrs. Anita", "Desai", "Science", "Senior Teacher", "anita.d@dps.edu", 12);
        createTeacher(tenantId, "UTI-2026-0000001204", "Ms. Pooja", "Iyer", "Accounts", "Accounts Head", "pooja.i@dps.edu", 8);

        // Seed Workflow Cases
        WorkflowCase c1 = createCase(tenantId, "ADM-2026-000001", WorkflowCase.CaseType.ADMISSION, "New admission application — Ravi Kumar", WorkflowCase.CaseStatus.OPEN, WorkflowCase.CasePriority.HIGH, "Dr. Meena Shah", "Ravi Kumar", "Review documents and schedule interview");
        WorkflowCase c2 = createCase(tenantId, "TRF-2026-000001", WorkflowCase.CaseType.TRANSFER, "Transfer request — Karan Singh to St. Xavier's", WorkflowCase.CaseStatus.IN_PROGRESS, WorkflowCase.CasePriority.MEDIUM, "Mrs. Anita Desai", "Karan Singh", "Verify transfer certificate");
        WorkflowCase c3 = createCase(tenantId, "ATT-2026-000001", WorkflowCase.CaseType.ATTENDANCE_RISK, "Attendance below 70% — Sneha Reddy", WorkflowCase.CaseStatus.ESCALATED, WorkflowCase.CasePriority.CRITICAL, "Mr. Rajiv Saxena", "Sneha Reddy", "Parent meeting scheduled");
        
        workflowCaseRepository.saveAll(Arrays.asList(c1, c2, c3));

        // Seed Admission Applications
        createAdmission(tenantId, "APP-2026-0001", "Ravi Kumar", "Class 6", AdmissionApplication.ApplicationStatus.SUBMITTED, "ONLINE", "St. Mary's School", institutionId, campusId);
        createAdmission(tenantId, "APP-2026-0002", "Sita Devi", "Class 9", AdmissionApplication.ApplicationStatus.UNDER_REVIEW, "WALK_IN", "Kendriya Vidyalaya", institutionId, campusId);
        createAdmission(tenantId, "APP-2026-0003", "Amit Patel", "Class 11-Science", AdmissionApplication.ApplicationStatus.DOCUMENTS_PENDING, "REFERRAL", "Ryan International", institutionId, campusId);

        // Seed Transfer Case
        createTransfer(tenantId, "TRF-REF-001", c2.getId(), s5.getId(), institutionId);

        // Seed Documents
        createDocument(tenantId, Document.DocumentType.TRANSFER_CERTIFICATE, "Transfer Certificate — Karan Singh", "tc_karan.pdf", s5.getId());
        createDocument(tenantId, Document.DocumentType.BIRTH_CERTIFICATE, "Birth Certificate — Arjun Mehta", "birth_arjun.pdf", s1.getId());
    }

    private Student createStudent(UUID tenantId, String uai, String first, String last, String currentClass, StudentLifecycleStatus status, String admNo, String email, String phone) {
        Student s = new Student();
        s.setTenantId(tenantId);
        s.setUniversalAcademicId(uai);
        s.setFirstName(first);
        s.setLastName(last);
        s.setCurrentClass(currentClass);
        s.setLifecycleStatus(status);
        s.setAdmissionNumber(admNo);
        s.setEmail(email);
        s.setPhone(phone);
        s.setDateOfBirth(LocalDate.of(2010, 5, 20));
        s.setGender(Student.Gender.MALE);
        return s;
    }

    private void createTeacher(UUID tenantId, String uti, String first, String last, String dept, String desig, String email, int exp) {
        Teacher t = new Teacher();
        t.setTenantId(tenantId);
        t.setUniversalTeacherId(uti);
        t.setFirstName(first);
        t.setLastName(last);
        t.setDepartment(dept);
        t.setDesignation(desig);
        t.setEmail(email);
        t.setExperienceYears(exp);
        t.setJoiningDate(LocalDate.now().minusYears(2));
        teacherRepository.save(t);
    }

    private WorkflowCase createCase(UUID tenantId, String ref, WorkflowCase.CaseType type, String title, WorkflowCase.CaseStatus status, WorkflowCase.CasePriority priority, String assigneeName, String subjectName, String nextAction) {
        WorkflowCase c = new WorkflowCase();
        c.setTenantId(tenantId);
        c.setCaseReference(ref);
        c.setCaseType(type);
        c.setTitle(title);
        c.setStatus(status);
        c.setPriority(priority);
        c.setAssignedToName(assigneeName);
        c.setSubjectName(subjectName);
        c.setNextAction(nextAction);
        c.setDueDate(Instant.now().plus(7, ChronoUnit.DAYS));
        c.setSource("SYSTEM");
        return c;
    }

    private void createAdmission(UUID tenantId, String ref, String name, String applyFor, AdmissionApplication.ApplicationStatus status, String source, String prevSchool, UUID instId, UUID campId) {
        AdmissionApplication a = new AdmissionApplication();
        a.setTenantId(tenantId);
        a.setApplicationReference(ref);
        String[] parts = name.split(" ");
        a.setApplicantFirstName(parts[0]);
        a.setApplicantLastName(parts.length > 1 ? parts[1] : "");
        a.setApplyingForClass(applyFor);
        a.setStatus(status);
        a.setSource(source);
        a.setPreviousSchool(prevSchool);
        a.setInstitutionId(instId);
        a.setCampusId(campId);
        admissionApplicationRepository.save(a);
    }

    private void createTransfer(UUID tenantId, String ref, UUID caseId, UUID studentId, UUID instId) {
        TransferCase t = new TransferCase();
        t.setTenantId(tenantId);
        t.setTransferReference(ref);
        t.setCaseId(caseId);
        t.setStudentId(studentId);
        t.setSendingInstitutionId(instId);
        t.setTransferType(TransferCase.TransferType.SCHOOL_TRANSFER);
        t.setStatus(TransferCase.TransferStatus.REQUESTED);
        t.setRequestedDate(LocalDate.now());
        transferCaseRepository.save(t);
    }

    private void createDocument(UUID tenantId, Document.DocumentType type, String title, String file, UUID subjectId) {
        Document d = new Document();
        d.setTenantId(tenantId);
        d.setDocumentType(type);
        d.setTitle(title);
        d.setFileName(file);
        d.setFileUrl("http://localhost:8080/files/" + file);
        d.setFileSize(102400L);
        d.setMimeType("application/pdf");
        d.setSubjectType(Document.SubjectType.STUDENT);
        d.setSubjectId(subjectId);
        d.setVerificationStatus(Document.VerificationStatus.PENDING);
        documentRepository.save(d);
    }
}
