package com.akedex.students.domain;

import com.akedex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "students", indexes = {
    @Index(name = "idx_student_uai", columnList = "universal_academic_id", unique = true),
    @Index(name = "idx_student_tenant", columnList = "tenant_id"),
    @Index(name = "idx_student_status", columnList = "tenant_id, lifecycle_status"),
    @Index(name = "idx_student_name", columnList = "tenant_id, last_name, first_name")
})
@Getter
@Setter
@NoArgsConstructor
public class Student extends BaseEntity {

    @Column(name = "universal_academic_id", nullable = false, unique = true, length = 30)
    private String universalAcademicId; // e.g. UAI-2026-0000000001

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address_line1")
    private String addressLine1;

    @Column(name = "address_line2")
    private String addressLine2;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "country", length = 3)
    private String country;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "blood_group", length = 5)
    private String bloodGroup;

    @Column(name = "aadhaar_number", length = 12)
    private String aadhaarNumber;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "lifecycle_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private StudentLifecycleStatus lifecycleStatus = StudentLifecycleStatus.PROSPECT;

    @Column(name = "current_institution_id")
    private UUID currentInstitutionId;

    @Column(name = "current_campus_id")
    private UUID currentCampusId;

    @Column(name = "admission_number")
    private String admissionNumber;

    @Column(name = "roll_number")
    private String rollNumber;

    @Column(name = "current_class")
    private String currentClass;

    @Column(name = "current_section")
    private String currentSection;

    @Column(name = "academic_year")
    private String academicYear;

    public String getFullName() {
        StringBuilder sb = new StringBuilder(firstName);
        if (middleName != null && !middleName.isEmpty()) sb.append(" ").append(middleName);
        sb.append(" ").append(lastName);
        return sb.toString();
    }

    public enum Gender {
        MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY
    }
}
