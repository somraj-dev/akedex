package com.akedex.teachers.domain;

import com.akedex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "teachers", indexes = {
    @Index(name = "idx_teacher_uti", columnList = "universal_teacher_id", unique = true),
    @Index(name = "idx_teacher_tenant", columnList = "tenant_id"),
    @Index(name = "idx_teacher_institution", columnList = "tenant_id, institution_id")
})
@Getter
@Setter
@NoArgsConstructor
public class Teacher extends BaseEntity {

    @Column(name = "universal_teacher_id", nullable = false, unique = true, length = 30)
    private String universalTeacherId; // e.g. AKD-TCH-2026-0000001203

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "institution_id")
    private UUID institutionId;

    @Column(name = "campus_id")
    private UUID campusId;

    @Column(name = "department")
    private String department;

    @Column(name = "designation")
    private String designation;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private TeacherStatus status = TeacherStatus.ACTIVE;

    @Column(name = "user_id")
    private UUID userId;

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public enum Gender { MALE, FEMALE, OTHER }

    public enum TeacherStatus {
        ACTIVE, ON_LEAVE, RESIGNED, TERMINATED, RETIRED
    }
}
