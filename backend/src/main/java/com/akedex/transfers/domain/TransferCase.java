package com.akedex.transfers.domain;

import com.akedex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "transfer_cases", indexes = {
    @Index(name = "idx_transfer_tenant", columnList = "tenant_id"),
    @Index(name = "idx_transfer_student", columnList = "student_id"),
    @Index(name = "idx_transfer_ref", columnList = "transfer_reference", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
public class TransferCase extends BaseEntity {

    @Column(name = "transfer_reference", nullable = false, unique = true, length = 30)
    private String transferReference;

    @Column(name = "case_id")
    private UUID caseId;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(name = "sending_institution_id", nullable = false)
    private UUID sendingInstitutionId;

    @Column(name = "receiving_institution_id")
    private UUID receivingInstitutionId;

    @Column(name = "transfer_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TransferType transferType;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private TransferStatus status = TransferStatus.REQUESTED;

    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason;

    @Column(name = "requested_date")
    private LocalDate requestedDate;

    @Column(name = "approved_date")
    private LocalDate approvedDate;

    @Column(name = "completed_date")
    private LocalDate completedDate;

    @Column(name = "documents_verified")
    private boolean documentsVerified;

    public enum TransferType {
        SCHOOL_TRANSFER,
        COLLEGE_MIGRATION,
        PROGRAM_CHANGE,
        CAMPUS_CHANGE,
        RE_ENROLLMENT
    }

    public enum TransferStatus {
        REQUESTED,
        SENDING_REVIEW,
        DOCUMENTS_VERIFICATION,
        RECEIVING_REVIEW,
        ACCEPTED,
        ENROLLMENT_CREATED,
        COMPLETED,
        REJECTED,
        CANCELLED
    }
}
