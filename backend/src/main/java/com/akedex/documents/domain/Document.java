package com.akedex.documents.domain;

import com.akedex.shared.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "documents", indexes = {
    @Index(name = "idx_document_tenant", columnList = "tenant_id"),
    @Index(name = "idx_document_subject", columnList = "subject_type, subject_id")
})
@Getter
@Setter
@NoArgsConstructor
public class Document extends BaseEntity {

    @Column(name = "document_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "mime_type")
    private String mimeType;

    @Column(name = "subject_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private SubjectType subjectType;

    @Column(name = "subject_id", nullable = false)
    private UUID subjectId;

    @Column(name = "verification_status")
    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @Column(name = "verified_by")
    private UUID verifiedBy;

    @Column(name = "verification_notes")
    private String verificationNotes;

    @Column(name = "is_confidential")
    private boolean confidential;

    public enum DocumentType {
        BIRTH_CERTIFICATE, TRANSFER_CERTIFICATE, MARK_SHEET, ID_PROOF,
        ADDRESS_PROOF, PHOTO, MEDICAL_RECORD, CHARACTER_CERTIFICATE,
        MIGRATION_CERTIFICATE, CASTE_CERTIFICATE, INCOME_CERTIFICATE,
        SCHOLARSHIP_LETTER, CONSENT_FORM, OTHER
    }

    public enum SubjectType {
        STUDENT, TEACHER, GUARDIAN, INSTITUTION, ADMISSION, TRANSFER
    }

    public enum VerificationStatus {
        PENDING, VERIFIED, REJECTED, EXPIRED
    }
}
