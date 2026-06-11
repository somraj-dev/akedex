// =====================================================
// Akedex — API Integration Layer
// Communicates with Spring Boot backend at http://localhost:8080
// Falls back to mock data if backend is offline.
// =====================================================

import { 
  mockStudents, mockCases, mockAdmissions, 
  mockTeachers, recentActivity,  
} from './mock-data';

const BACKEND_URL = 'http://localhost:8080/api';

// Memory storage to simulate DB state when offline
const localStudents = [...mockStudents];
let localCases = [...mockCases];
let localAdmissions = [...mockAdmissions];
const localTeachers = [...mockTeachers];
const localActivity = [...recentActivity];

function getHeaders(tenantId?: string | null) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (tenantId) {
    headers['X-Tenant-ID'] = tenantId;
  }
  return headers;
}

async function request<T>(path: string, options: RequestInit, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...options,
      mode: 'cors',
    });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    return await res.json() as T;
  } catch (err) {
    console.warn(`[Akedex API] Backend unavailable at ${BACKEND_URL}${path}. Falling back to memory storage.`, err);
    return fallbackData;
  }
}

export const api = {
  // 1. Activation
  activate: async (licenseKey: string): Promise<{ tenantId: string; institutionName: string; plan: string }> => {
    return request('/activation/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseKey }),
    }, {
      tenantId: 'tenant-demo-001-dps',
      institutionName: 'Delhi Public School, R.K. Puram',
      plan: 'ENTERPRISE',
    });
  },

  // 2. Auth
  login: async (email: string, password: string, tenantId: string) => {
    return request<{ token: string; user: unknown }>('/auth/login', {
      method: 'POST',
      headers: getHeaders(tenantId),
      body: JSON.stringify({ email, password }),
    }, {
      token: 'mock-jwt-token-xyz',
      user: {
        id: 'usr-001',
        name: 'Dr. Meena Shah',
        email: email,
        role: 'SYSTEM_ADMIN',
        institution: 'Delhi Public School, R.K. Puram',
      }
    });
  },

  // 3. Students
  getStudents: async (tenantId: string | null) => {
    return request<typeof mockStudents>('/students', {
      method: 'GET',
      headers: getHeaders(tenantId),
    }, localStudents);
  },

  searchStudents: async (query: string, tenantId: string | null) => {
    return request<typeof mockStudents>(`/students/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: getHeaders(tenantId),
    }, localStudents.filter(s => {
      const q = query.toLowerCase();
      return `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) || s.uai.toLowerCase().includes(q);
    }));
  },

  // 4. Cases
  getCases: async (tenantId: string | null) => {
    return request<typeof mockCases>('/cases', {
      method: 'GET',
      headers: getHeaders(tenantId),
    }, localCases);
  },

  resolveCase: async (id: string, notes: string, tenantId: string | null) => {
    const updated = await request<unknown>(`/cases/${id}/resolve`, {
      method: 'PUT',
      headers: getHeaders(tenantId),
      body: JSON.stringify({ notes }),
    }, null);

    if (updated) {
      // Sync local list if backend successfully responded
      localCases = localCases.map(c => c.id === id ? { ...c, status: 'RESOLVED', resolutionNotes: notes } : c);
      return updated;
    }

    // Mock resolve
    localCases = localCases.map(c => c.id === id ? { ...c, status: 'RESOLVED', resolutionNotes: notes } : c);
    localActivity.unshift({
      time: 'Just now',
      action: `Case resolved: ${id}`,
      subject: notes,
      user: 'Operator',
      type: 'case',
    });
    return localCases.find(c => c.id === id);
  },

  reassignCase: async (id: string, assigneeName: string, tenantId: string | null) => {
    const updated = await request<unknown>(`/cases/${id}/reassign`, {
      method: 'PUT',
      headers: getHeaders(tenantId),
      body: JSON.stringify({ assigneeName }),
    }, null);

    if (updated) {
      localCases = localCases.map(c => c.id === id ? { ...c, assignedToName: assigneeName } : c);
      return updated;
    }

    // Mock reassign
    localCases = localCases.map(c => c.id === id ? { ...c, assignee: assigneeName } : c);
    return localCases.find(c => c.id === id);
  },

  // 5. Admissions
  getAdmissions: async (tenantId: string | null) => {
    return request<typeof mockAdmissions>('/admissions', {
      method: 'GET',
      headers: getHeaders(tenantId),
    }, localAdmissions);
  },

  updateAdmissionStatus: async (id: string, status: string, tenantId: string | null) => {
    const updated = await request<unknown>(`/admissions/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(tenantId),
      body: JSON.stringify({ status }),
    }, null);

    if (updated) {
      localAdmissions = localAdmissions.map(a => a.id === id ? { ...a, status } : a);
      return updated;
    }

    // Mock update
    localAdmissions = localAdmissions.map(a => a.id === id ? { ...a, status } : a);
    return localAdmissions.find(a => a.id === id);
  },

  // 6. Teachers
  getTeachers: async (tenantId: string | null) => {
    return request<typeof mockTeachers>('/teachers', {
      method: 'GET',
      headers: getHeaders(tenantId),
    }, localTeachers);
  },

  // 7. Audit events
  getAuditEvents: async (tenantId: string | null) => {
    return request<unknown>('/audit', {
      method: 'GET',
      headers: getHeaders(tenantId),
    }, localActivity.map((a, i) => ({
      time: a.time,
      action: a.action,
      subject: a.subject,
      user: a.user,
      ip: `192.168.1.${10 + i}`
    })));
  }
};
