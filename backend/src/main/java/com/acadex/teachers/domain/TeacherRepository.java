package com.acadex.teachers.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
    
    Optional<Teacher> findByIdAndTenantId(UUID id, UUID tenantId);
    
    List<Teacher> findByTenantId(UUID tenantId);
    
    @Query("SELECT t FROM Teacher t WHERE t.tenantId = :tenantId AND (" +
           "LOWER(t.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(t.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(t.department) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(t.designation) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Teacher> searchTeachers(@Param("tenantId") UUID tenantId, @Param("query") String query);
}
