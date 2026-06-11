package com.akedex.shared.security;

import java.util.UUID;

/**
 * Thread-local holder for the current tenant context.
 * Used by all domain services to enforce tenant isolation.
 */
public final class TenantContext {

    private static final ThreadLocal<UUID> CURRENT_TENANT = new ThreadLocal<>();

    private TenantContext() {}

    public static UUID getCurrentTenant() {
        return CURRENT_TENANT.get();
    }

    public static void setCurrentTenant(UUID tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    public static void clear() {
        CURRENT_TENANT.remove();
    }
}
