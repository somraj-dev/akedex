package com.acadex.documents.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {
    
    Optional<Document> findByIdAndTenantId(UUID id, UUID tenantId);
    
    List<Document> findByTenantId(UUID tenantId);
    
    List<Document> findBySubjectTypeAndSubjectIdAndTenantId(
            Document.SubjectType subjectType, UUID subjectId, UUID tenantId);
}
