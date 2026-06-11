package com.akedex.workflow.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkflowCaseRepository extends JpaRepository<WorkflowCase, UUID> {
    
    Optional<WorkflowCase> findByIdAndTenantId(UUID id, UUID tenantId);
    
    Optional<WorkflowCase> findByCaseReferenceAndTenantId(String caseReference, UUID tenantId);
    
    List<WorkflowCase> findByTenantId(UUID tenantId);
    
    List<WorkflowCase> findByTenantIdAndStatus(UUID tenantId, WorkflowCase.CaseStatus status);
    
    List<WorkflowCase> findByTenantIdAndAssignedTo(UUID tenantId, UUID assignedTo);
    
    @Query("SELECT c FROM WorkflowCase c WHERE c.tenantId = :tenantId AND (" +
           "LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.caseReference) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.subjectName) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<WorkflowCase> searchCases(@Param("tenantId") UUID tenantId, @Param("query") String query);
}
