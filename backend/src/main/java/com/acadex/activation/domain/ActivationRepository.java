package com.acadex.activation.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ActivationRepository extends JpaRepository<Activation, UUID> {
    List<Activation> findByInstitutionId(UUID institutionId);
    List<Activation> findByTenantId(UUID tenantId);
}
