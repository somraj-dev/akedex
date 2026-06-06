package com.acadex.shared.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

/**
 * Sets the current tenant context from the authenticated user's JWT claims.
 * This tenant_id is then used by RLS policies at the database level.
 */
@Component
public class TenantContextFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        try {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            String tenantHeader = httpRequest.getHeader("X-Tenant-ID");
            if (tenantHeader != null) {
                TenantContext.setCurrentTenant(UUID.fromString(tenantHeader));
            }
            chain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }
}
