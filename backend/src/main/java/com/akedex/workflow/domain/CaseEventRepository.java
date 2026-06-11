package com.akedex.workflow.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CaseEventRepository extends JpaRepository<CaseEvent, UUID> {
    List<CaseEvent> findByCaseIdAndTenantIdOrderByCreatedAtAsc(UUID caseId, UUID tenantId);
    List<CaseEvent> findByTenantId(UUID tenantId);
}
