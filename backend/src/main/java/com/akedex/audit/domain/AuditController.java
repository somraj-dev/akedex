package com.akedex.audit.domain;

import com.akedex.shared.security.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditController {

    private final AuditEventRepository auditEventRepository;

    private UUID getTenantId() {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (tenantId == null) {
            throw new IllegalStateException("Tenant context not found.");
        }
        return tenantId;
    }

    @GetMapping
    public ResponseEntity<List<AuditEvent>> getAuditEvents() {
        return ResponseEntity.ok(auditEventRepository.findByTenantIdOrderByCreatedAtDesc(getTenantId()));
    }
}
