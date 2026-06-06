package com.acadex.institution.domain;

import com.acadex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "institutions", indexes = {
    @Index(name = "idx_institution_code", columnList = "institution_code", unique = true),
    @Index(name = "idx_institution_tenant", columnList = "tenant_id")
})
@Getter
@Setter
@NoArgsConstructor
public class Institution extends BaseEntity {

    @Column(name = "institution_code", nullable = false, unique = true, length = 20)
    private String institutionCode; // e.g. INS-MP-000102

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private InstitutionType type;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private InstitutionStatus status = InstitutionStatus.PENDING_ACTIVATION;

    @Column(name = "address_line1")
    private String addressLine1;

    @Column(name = "address_line2")
    private String addressLine2;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country", length = 3)
    private String country;

    @Column(name = "postal_code", length = 10)
    private String postalCode;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "website")
    private String website;

    @Column(name = "affiliation_number")
    private String affiliationNumber;

    @Column(name = "board")
    private String board; // CBSE, ICSE, State Board, University

    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Campus> campuses = new ArrayList<>();
}
