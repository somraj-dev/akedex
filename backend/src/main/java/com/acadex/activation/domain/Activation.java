package com.acadex.activation.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "activations", indexes = {
    @Index(name = "idx_activation_institution", columnList = "institution_id"),
    @Index(name = "idx_activation_license", columnList = "license_id")
})
@Getter
@Setter
@NoArgsConstructor
public class Activation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "license_id", nullable = false)
    private UUID licenseId;

    @Column(name = "institution_id", nullable = false)
    private UUID institutionId;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "activated_by")
    private String activatedBy;

    @Column(name = "machine_fingerprint")
    private String machineFingerprint;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ActivationStatus status = ActivationStatus.ACTIVE;

    @CreationTimestamp
    @Column(name = "activated_at", nullable = false, updatable = false)
    private Instant activatedAt;

    @Column(name = "deactivated_at")
    private Instant deactivatedAt;

    public enum ActivationStatus {
        ACTIVE,
        DEACTIVATED,
        SUPERSEDED
    }
}
