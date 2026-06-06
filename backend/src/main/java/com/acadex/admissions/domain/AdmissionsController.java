package com.acadex.admissions.domain;

import com.acadex.shared.security.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admissions")
@RequiredArgsConstructor
public class AdmissionsController {

    private final AdmissionApplicationRepository admissionApplicationRepository;

    private UUID getTenantId() {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (tenantId == null) {
            throw new IllegalStateException("Tenant context not found.");
        }
        return tenantId;
    }

    @GetMapping
    public ResponseEntity<List<AdmissionApplication>> getApplications() {
        return ResponseEntity.ok(admissionApplicationRepository.findByTenantId(getTenantId()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<AdmissionApplication>> searchApplications(@RequestParam("q") String query) {
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.ok(admissionApplicationRepository.findByTenantId(getTenantId()));
        }
        return ResponseEntity.ok(admissionApplicationRepository.searchApplications(getTenantId(), query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(@PathVariable("id") UUID id) {
        AdmissionApplication app = admissionApplicationRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (app == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(app);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable("id") UUID id, @RequestBody Map<String, String> request) {
        AdmissionApplication app = admissionApplicationRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (app == null) {
            return ResponseEntity.notFound().build();
        }

        String statusStr = request.get("status");
        if (statusStr == null || statusStr.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Status is required."));
        }

        try {
            AdmissionApplication.ApplicationStatus status = AdmissionApplication.ApplicationStatus.valueOf(statusStr);
            app.setStatus(status);
            if (status == AdmissionApplication.ApplicationStatus.ACCEPTED || status == AdmissionApplication.ApplicationStatus.REJECTED) {
                app.setDecisionDate(LocalDate.now());
            }
            admissionApplicationRepository.save(app);
            return ResponseEntity.ok(app);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid status value: " + statusStr));
        }
    }

    @PutMapping("/{id}/notes")
    public ResponseEntity<?> updateNotes(@PathVariable("id") UUID id, @RequestBody Map<String, String> request) {
        AdmissionApplication app = admissionApplicationRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (app == null) {
            return ResponseEntity.notFound().build();
        }

        String notes = request.get("notes");
        app.setReviewNotes(notes);
        admissionApplicationRepository.save(app);
        return ResponseEntity.ok(app);
    }
}
