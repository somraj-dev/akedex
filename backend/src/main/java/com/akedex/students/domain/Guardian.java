package com.akedex.students.domain;

import com.akedex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "guardians", indexes = {
    @Index(name = "idx_guardian_tenant", columnList = "tenant_id"),
    @Index(name = "idx_guardian_phone", columnList = "tenant_id, phone")
})
@Getter
@Setter
@NoArgsConstructor
public class Guardian extends BaseEntity {

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "relationship", nullable = false)
    @Enumerated(EnumType.STRING)
    private GuardianRelationship relationship;

    @Column(name = "email")
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "address")
    private String address;

    @Column(name = "is_primary_contact")
    private boolean primaryContact;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    public enum GuardianRelationship {
        FATHER, MOTHER, GRANDFATHER, GRANDMOTHER, UNCLE, AUNT, SIBLING, LEGAL_GUARDIAN, OTHER
    }
}
