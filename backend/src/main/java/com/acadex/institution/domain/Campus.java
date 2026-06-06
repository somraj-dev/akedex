package com.acadex.institution.domain;

import com.acadex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "campuses", indexes = {
    @Index(name = "idx_campus_institution", columnList = "institution_id"),
    @Index(name = "idx_campus_tenant", columnList = "tenant_id")
})
@Getter
@Setter
@NoArgsConstructor
public class Campus extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "is_primary")
    private boolean primary;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CampusStatus status = CampusStatus.ACTIVE;

    public enum CampusStatus {
        ACTIVE, INACTIVE
    }
}
