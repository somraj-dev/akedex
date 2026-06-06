package com.acadex.students.domain;

import com.acadex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "enrollments", indexes = {
    @Index(name = "idx_enrollment_student", columnList = "student_id"),
    @Index(name = "idx_enrollment_tenant", columnList = "tenant_id"),
    @Index(name = "idx_enrollment_institution", columnList = "institution_id"),
    @Index(name = "idx_enrollment_academic_year", columnList = "tenant_id, academic_year")
})
@Getter
@Setter
@NoArgsConstructor
public class Enrollment extends BaseEntity {

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(name = "institution_id", nullable = false)
    private UUID institutionId;

    @Column(name = "campus_id")
    private UUID campusId;

    @Column(name = "program")
    private String program;

    @Column(name = "class_name")
    private String className;

    @Column(name = "section")
    private String section;

    @Column(name = "academic_year", nullable = false)
    private String academicYear;

    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status = EnrollmentStatus.ACTIVE;

    @Column(name = "exit_date")
    private LocalDate exitDate;

    @Column(name = "exit_reason")
    private String exitReason;

    public enum EnrollmentStatus {
        ACTIVE, COMPLETED, TRANSFERRED_OUT, WITHDRAWN, EXPELLED
    }
}
