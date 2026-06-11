package com.akedex.documents.domain;

import com.akedex.shared.security.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentRepository documentRepository;

    private UUID getTenantId() {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (tenantId == null) {
            throw new IllegalStateException("Tenant context not found.");
        }
        return tenantId;
    }

    @GetMapping
    public ResponseEntity<List<Document>> getDocuments() {
        return ResponseEntity.ok(documentRepository.findByTenantId(getTenantId()));
    }

    @GetMapping("/subject/{type}/{id}")
    public ResponseEntity<List<Document>> getSubjectDocuments(
            @PathVariable("type") String subjectTypeStr,
            @PathVariable("id") UUID subjectId) {
        
        try {
            Document.SubjectType subjectType = Document.SubjectType.valueOf(subjectTypeStr.toUpperCase());
            return ResponseEntity.ok(documentRepository.findBySubjectTypeAndSubjectIdAndTenantId(
                    subjectType, subjectId, getTenantId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<?> verifyDocument(@PathVariable("id") UUID id, @RequestBody Map<String, String> request) {
        Document doc = documentRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (doc == null) {
            return ResponseEntity.notFound().build();
        }

        String notes = request.getOrDefault("notes", "Verified by operator");
        String statusStr = request.getOrDefault("status", "VERIFIED");

        try {
            Document.VerificationStatus status = Document.VerificationStatus.valueOf(statusStr.toUpperCase());
            doc.setVerificationStatus(status);
            doc.setVerificationNotes(notes);
            // In a real flow, we would set the operator user UUID here
            doc.setVerifiedBy(UUID.fromString("00000000-0000-0000-0000-000000000000"));
            documentRepository.save(doc);
            return ResponseEntity.ok(doc);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid verification status: " + statusStr));
        }
    }
}
