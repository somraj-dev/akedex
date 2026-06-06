package com.acadex.students.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentRepository extends JpaRepository<Student, UUID> {
    
    Optional<Student> findByIdAndTenantId(UUID id, UUID tenantId);
    
    Optional<Student> findByUniversalAcademicIdAndTenantId(String universalAcademicId, UUID tenantId);
    
    List<Student> findByTenantId(UUID tenantId);
    
    @Query("SELECT s FROM Student s WHERE s.tenantId = :tenantId AND (" +
           "LOWER(s.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.universalAcademicId) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.currentClass) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Student> searchStudents(@Param("tenantId") UUID tenantId, @Param("query") String query);
}
