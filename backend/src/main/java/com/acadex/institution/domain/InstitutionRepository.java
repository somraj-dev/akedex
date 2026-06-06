package com.acadex.institution.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, UUID> {
    Optional<Institution> findByInstitutionCode(String institutionCode);
    Optional<Institution> findByTenantId(UUID tenantId);
}
