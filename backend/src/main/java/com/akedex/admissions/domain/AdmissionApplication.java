package com.akedex.admissions.domain;

import com.akedex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "admission_applications", indexes = {
    @Index(name = "idx_admission_tenant", columnList = "tenant_id"),
    @Index(name = "idx_admission_status", columnList = "tenant_id, status"),
    @Index(name = "idx_admission_ref", columnList = "application_reference", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
public class AdmissionApplication extends BaseEntity {

    @Column(name = "application_reference", nullable = false, unique = true, length = 30)
    private String applicationReference;

    @Column(name = "student_id")
    private UUID studentId;

    @Column(name = "case_id")
    private UUID caseId;

    @Column(name = "institution_id", nullable = false)
    private UUID institutionId;

    @Column(name = "campus_id")
    private UUID campusId;

    @Column(name = "applicant_first_name", nullable = false)
    private String applicantFirstName;

    @Column(name = "applicant_last_name", nullable = false)
    private String applicantLastName;

    @Column(name = "applicant_email")
    private String applicantEmail;

    @Column(name = "applicant_phone")
    private String applicantPhone;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "applying_for_class")
    private String applyingForClass;

    @Column(name = "applying_for_program")
    private String applyingForProgram;

    @Column(name = "academic_year")
    private String academicYear;

    @Column(name = "previous_school")
    private String previousSchool;

    @Column(name = "previous_class")
    private String previousClass;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.SUBMITTED;

    @Column(name = "reviewed_by")
    private UUID reviewedBy;

    @Column(name = "review_notes", columnDefinition = "TEXT")
    private String reviewNotes;

    @Column(name = "decision_date")
    private LocalDate decisionDate;

    @Column(name = "source")
    private String source; // ONLINE, WALK_IN, REFERRAL

    public enum ApplicationStatus {
        DRAFT,
        SUBMITTED,
        UNDER_REVIEW,
        DOCUMENTS_PENDING,
        VERIFIED,
        INTERVIEW_SCHEDULED,
        ACCEPTED,
        WAITLISTED,
        REJECTED,
        ENROLLED,
        WITHDRAWN
    }
}
