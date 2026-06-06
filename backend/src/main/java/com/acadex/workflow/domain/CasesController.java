package com.acadex.workflow.domain;

import com.acadex.shared.security.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/cases")
@RequiredArgsConstructor
public class CasesController {

    private final WorkflowCaseRepository workflowCaseRepository;
    private final CaseEventRepository caseEventRepository;

    private UUID getTenantId() {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (tenantId == null) {
            throw new IllegalStateException("Tenant context not found.");
        }
        return tenantId;
    }

    @GetMapping
    public ResponseEntity<List<WorkflowCase>> getCases() {
        return ResponseEntity.ok(workflowCaseRepository.findByTenantId(getTenantId()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<WorkflowCase>> searchCases(@RequestParam("q") String query) {
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.ok(workflowCaseRepository.findByTenantId(getTenantId()));
        }
        return ResponseEntity.ok(workflowCaseRepository.searchCases(getTenantId(), query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCaseById(@PathVariable("id") UUID id) {
        WorkflowCase wcase = workflowCaseRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (wcase == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(wcase);
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<List<CaseEvent>> getCaseEvents(@PathVariable("id") UUID caseId) {
        return ResponseEntity.ok(caseEventRepository.findByCaseIdAndTenantIdOrderByCreatedAtAsc(caseId, getTenantId()));
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<?> resolveCase(@PathVariable("id") UUID id, @RequestBody Map<String, String> request) {
        WorkflowCase wcase = workflowCaseRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (wcase == null) {
            return ResponseEntity.notFound().build();
        }

        String notes = request.getOrDefault("notes", "Resolved by system operator");
        wcase.setStatus(WorkflowCase.CaseStatus.RESOLVED);
        wcase.setResolvedAt(Instant.now());
        wcase.setResolutionNotes(notes);
        wcase.setNextAction("Case resolved, awaiting closure");
        workflowCaseRepository.save(wcase);

        // Record Case Event
        CaseEvent event = new CaseEvent();
        event.setTenantId(getTenantId());
        event.setCaseId(wcase.getId());
        event.setEventType(CaseEvent.EventType.RESOLVED);
        event.setDescription("Case resolved with notes: " + notes);
        event.setNewValue("RESOLVED");
        caseEventRepository.save(event);

        return ResponseEntity.ok(wcase);
    }

    @PutMapping("/{id}/reassign")
    public ResponseEntity<?> reassignCase(@PathVariable("id") UUID id, @RequestBody Map<String, String> request) {
        WorkflowCase wcase = workflowCaseRepository.findByIdAndTenantId(id, getTenantId()).orElse(null);
        if (wcase == null) {
            return ResponseEntity.notFound().build();
        }

        String assigneeName = request.get("assigneeName");
        String assigneeIdStr = request.get("assigneeId");

        if (assigneeName == null || assigneeName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Assignee name is required."));
        }

        wcase.setAssignedToName(assigneeName);
        if (assigneeIdStr != null && !assigneeIdStr.trim().isEmpty()) {
            wcase.setAssignedTo(UUID.fromString(assigneeIdStr));
        }
        wcase.setStatus(WorkflowCase.CaseStatus.IN_PROGRESS);
        workflowCaseRepository.save(wcase);

        // Record Case Event
        CaseEvent event = new CaseEvent();
        event.setTenantId(getTenantId());
        event.setCaseId(wcase.getId());
        event.setEventType(CaseEvent.EventType.REASSIGNED);
        event.setDescription("Case assigned to " + assigneeName);
        event.setNewValue(assigneeName);
        caseEventRepository.save(event);

        return ResponseEntity.ok(wcase);
    }

    @PostMapping("/{id}/events")
    public ResponseEntity<?> addEvent(@PathVariable("id") UUID caseId, @RequestBody Map<String, String> request) {
        WorkflowCase wcase = workflowCaseRepository.findByIdAndTenantId(caseId, getTenantId()).orElse(null);
        if (wcase == null) {
            return ResponseEntity.notFound().build();
        }

        String desc = request.get("description");
        if (desc == null || desc.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Event description is required."));
        }

        CaseEvent event = new CaseEvent();
        event.setTenantId(getTenantId());
        event.setCaseId(caseId);
        event.setEventType(CaseEvent.EventType.NOTE_ADDED);
        event.setDescription(desc);
        caseEventRepository.save(event);

        return ResponseEntity.ok(event);
    }
}
