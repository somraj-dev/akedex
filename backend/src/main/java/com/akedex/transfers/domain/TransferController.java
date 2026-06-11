package com.akedex.transfers.domain;

import com.akedex.shared.security.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
public class TransferController {

    private final TransferCaseRepository transferCaseRepository;

    private UUID getTenantId() {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (tenantId == null) {
            throw new IllegalStateException("Tenant context not found.");
        }
        return tenantId;
    }

    @GetMapping
    public ResponseEntity<List<TransferCase>> getTransfers() {
        return ResponseEntity.ok(transferCaseRepository.findByTenantId(getTenantId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTransferById(@PathVariable("id") UUID id) {
        TransferCase tc = transferCaseRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (tc == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tc);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable("id") UUID id, @RequestBody Map<String, String> request) {
        TransferCase tc = transferCaseRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (tc == null) {
            return ResponseEntity.notFound().build();
        }

        String statusStr = request.get("status");
        if (statusStr == null || statusStr.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Status is required."));
        }

        try {
            TransferCase.TransferStatus status = TransferCase.TransferStatus.valueOf(statusStr.toUpperCase());
            tc.setStatus(status);
            transferCaseRepository.save(tc);
            return ResponseEntity.ok(tc);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid transfer status: " + statusStr));
        }
    }
}
