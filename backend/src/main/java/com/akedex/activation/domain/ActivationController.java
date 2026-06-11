package com.akedex.activation.domain;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/activation")
@RequiredArgsConstructor
public class ActivationController {

    private final ActivationService activationService;

    @PostMapping("/activate")
    public ResponseEntity<?> activate(@RequestBody Map<String, String> request, HttpServletRequest servletRequest) {
        String licenseKey = request.get("licenseKey");
        String fingerprint = request.getOrDefault("fingerprint", "unknown_fingerprint");
        String ipAddress = servletRequest.getRemoteAddr();

        if (licenseKey == null || licenseKey.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "License key is required."));
        }

        try {
            Map<String, Object> result = activationService.activateLicense(licenseKey, ipAddress, fingerprint);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "An unexpected error occurred: " + e.getMessage()));
        }
    }
}
