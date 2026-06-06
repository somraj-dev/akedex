package com.acadex.auth.domain;

import com.acadex.institution.domain.Institution;
import com.acadex.institution.domain.InstitutionRepository;
import com.acadex.shared.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final InstitutionRepository institutionRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestHeader(value = "X-Tenant-ID", required = false) String tenantIdHeader,
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required."));
        }

        UUID tenantId;
        if (tenantIdHeader != null && !tenantIdHeader.trim().isEmpty()) {
            try {
                tenantId = UUID.fromString(tenantIdHeader);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid X-Tenant-ID format."));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "X-Tenant-ID header is required."));
        }

        // Authenticate User in the specific tenant
        User user = userRepository.findByEmailAndTenantId(email, tenantId)
                .orElse(null);

        if (user == null || !passwordEncoder.matches(password, user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid operator email or password."));
        }

        if (user.getStatus() != User.UserStatus.ACTIVE) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Operator account is status: " + user.getStatus()));
        }

        // Update login stats
        user.setLastLoginAt(Instant.now());
        user.setLoginCount(user.getLoginCount() + 1);
        userRepository.save(user);

        // Fetch user role
        String roleName = "USER";
        if (!user.getRoles().isEmpty()) {
            Role role = user.getRoles().iterator().next();
            roleName = role.getName();
        }

        // Fetch Institution Name
        String institutionName = "Delhi Public School";
        if (user.getInstitutionId() != null) {
            Institution inst = institutionRepository.findById(user.getInstitutionId()).orElse(null);
            if (inst != null) {
                institutionName = inst.getName();
            }
        }

        // Generate JWT Token
        String token = jwtService.generateToken(user.getEmail(), tenantId, roleName, user.getFullName());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of(
                        "id", user.getId().toString(),
                        "name", user.getFullName(),
                        "email", user.getEmail(),
                        "role", roleName,
                        "institution", institutionName
                )
        ));
    }
}
