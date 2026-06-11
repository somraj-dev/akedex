package com.akedex.workflow.domain;

import com.akedex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * WorkflowCase — The universal case entity.
 * Everything important in Akedex becomes a Case.
 * Admissions, transfers, disciplinary actions, scholarships, etc.
 */
@Entity
@Table(name = "workflow_cases", indexes = {
    @Index(name = "idx_case_tenant", columnList = "tenant_id"),
    @Index(name = "idx_case_type", columnList = "tenant_id, case_type"),
    @Index(name = "idx_case_status", columnList = "tenant_id, status"),
    @Index(name = "idx_case_assignee", columnList = "tenant_id, assigned_to"),
    @Index(name = "idx_case_reference", columnList = "case_reference", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
public class WorkflowCase extends BaseEntity {

    @Column(name = "case_reference", nullable = false, unique = true, length = 30)
    private String caseReference; // e.g. ADM-2026-000001

    @Column(name = "case_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private CaseType caseType;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private CaseStatus status = CaseStatus.OPEN;

    @Column(name = "priority", nullable = false)
    @Enumerated(EnumType.STRING)
    private CasePriority priority = CasePriority.MEDIUM;

    @Column(name = "assigned_to")
    private UUID assignedTo;

    @Column(name = "assigned_to_name")
    private String assignedToName;

    @Column(name = "subject_type")
    @Enumerated(EnumType.STRING)
    private SubjectType subjectType;

    @Column(name = "subject_id")
    private UUID subjectId;

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "institution_id")
    private UUID institutionId;

    @Column(name = "campus_id")
    private UUID campusId;

    @Column(name = "due_date")
    private Instant dueDate;

    @Column(name = "resolved_at")
    private Instant resolvedAt;

    @Column(name = "closed_at")
    private Instant closedAt;

    @Column(name = "next_action", length = 500)
    private String nextAction;

    @Column(name = "resolution_notes", columnDefinition = "TEXT")
    private String resolutionNotes;

    @Column(name = "source")
    private String source; // SYSTEM, MANUAL, AUTOMATED

    @Column(name = "tags")
    private String tags; // comma-separated

    public enum CaseType {
        ADMISSION,
        TRANSFER,
        ATTENDANCE_RISK,
        FEE_ESCALATION,
        DOCUMENT_VERIFICATION,
        SCHOLARSHIP,
        DISCIPLINARY,
        INTERVENTION,
        ENROLLMENT,
        COMPLAINT,
        GENERAL
    }

    public enum CaseStatus {
        OPEN,
        IN_PROGRESS,
        PENDING_REVIEW,
        PENDING_APPROVAL,
        ESCALATED,
        ON_HOLD,
        RESOLVED,
        CLOSED,
        CANCELLED
    }

    public enum CasePriority {
        CRITICAL,
        HIGH,
        MEDIUM,
        LOW
    }

    public enum SubjectType {
        STUDENT,
        TEACHER,
        GUARDIAN,
        INSTITUTION,
        DOCUMENT
    }
}
