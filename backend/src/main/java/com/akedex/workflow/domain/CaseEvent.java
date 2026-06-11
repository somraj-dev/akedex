package com.akedex.workflow.domain;

import com.akedex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * CaseEvent — Audit trail for every case action.
 * Each status change, note, assignment gets recorded.
 */
@Entity
@Table(name = "case_events", indexes = {
    @Index(name = "idx_case_event_case", columnList = "case_id"),
    @Index(name = "idx_case_event_tenant", columnList = "tenant_id")
})
@Getter
@Setter
@NoArgsConstructor
public class CaseEvent extends BaseEntity {

    @Column(name = "case_id", nullable = false)
    private UUID caseId;

    @Column(name = "event_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private EventType eventType;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "old_value")
    private String oldValue;

    @Column(name = "new_value")
    private String newValue;

    @Column(name = "performed_by")
    private UUID performedBy;

    @Column(name = "performed_by_name")
    private String performedByName;

    public enum EventType {
        CREATED,
        STATUS_CHANGED,
        ASSIGNED,
        REASSIGNED,
        NOTE_ADDED,
        DOCUMENT_ATTACHED,
        ESCALATED,
        PRIORITY_CHANGED,
        DUE_DATE_CHANGED,
        RESOLVED,
        CLOSED,
        REOPENED
    }
}
