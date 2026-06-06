package com.acadex.transfers.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransferCaseRepository extends JpaRepository<TransferCase, UUID> {
    
    Optional<TransferCase> findByIdAndTenantId(UUID id, UUID tenantId);
    
    Optional<TransferCase> findByTransferReferenceAndTenantId(String transferReference, UUID tenantId);
    
    List<TransferCase> findByTenantId(UUID tenantId);
}
