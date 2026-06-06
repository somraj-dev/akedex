package com.acadex.auth.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "permissions", indexes = {
    @Index(name = "idx_permission_code", columnList = "code", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "code", nullable = false, unique = true, length = 100)
    private String code; // e.g. STUDENT_READ, ADMISSION_APPROVE

    @Column(name = "module", nullable = false, length = 50)
    private String module; // e.g. STUDENTS, ADMISSIONS

    @Column(name = "description")
    private String description;
}
