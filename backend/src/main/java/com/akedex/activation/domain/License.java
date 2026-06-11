package com.akedex.activation.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "licenses", indexes = {
    @Index(name = "idx_license_key", columnList = "license_key", unique = true),
    @Index(name = "idx_license_institution", columnList = "institution_id")
})
@Getter
@Setter
@NoArgsConstructor
public class License {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "license_key", nullable = false, unique = true, length = 50)
    private String licenseKey;

    @Column(name = "institution_id")
    private UUID institutionId;

    @Column(name = "plan", nullable = false)
    @Enumerated(EnumType.STRING)
    private LicensePlan plan;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private LicenseStatus status = LicenseStatus.ISSUED;

    @Column(name = "max_students")
    private Integer maxStudents;

    @Column(name = "max_staff")
    private Integer maxStaff;

    @Column(name = "valid_from")
    private LocalDate validFrom;

    @Column(name = "valid_until")
    private LocalDate validUntil;

    @Column(name = "activated_at")
    private Instant activatedAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public enum LicensePlan {
        STARTER,
        PROFESSIONAL,
        ENTERPRISE,
        NETWORK
    }

    public enum LicenseStatus {
        ISSUED,
        ACTIVATED,
        EXPIRED,
        REVOKED
    }
}
