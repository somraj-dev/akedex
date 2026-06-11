package com.akedex.institution.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CampusRepository extends JpaRepository<Campus, UUID> {
    List<Campus> findByInstitutionId(UUID institutionId);
    List<Campus> findByTenantId(UUID tenantId);
}
