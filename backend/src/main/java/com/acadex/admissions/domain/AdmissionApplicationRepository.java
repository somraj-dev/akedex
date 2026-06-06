package com.acadex.admissions.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdmissionApplicationRepository extends JpaRepository<AdmissionApplication, UUID> {
    
    Optional<AdmissionApplication> findByIdAndTenantId(UUID id, UUID tenantId);
    
    Optional<AdmissionApplication> findByApplicationReferenceAndTenantId(String applicationReference, UUID tenantId);
    
    List<AdmissionApplication> findByTenantId(UUID tenantId);
    
    List<AdmissionApplication> findByTenantIdAndStatus(UUID tenantId, AdmissionApplication.ApplicationStatus status);
    
    @Query("SELECT a FROM AdmissionApplication a WHERE a.tenantId = :tenantId AND (" +
           "LOWER(a.applicantFirstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(a.applicantLastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(a.applicationReference) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<AdmissionApplication> searchApplications(@Param("tenantId") UUID tenantId, @Param("query") String query);
}
