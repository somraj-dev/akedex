import { create } from 'zustand';

export type AppView = 
  | 'activation' 
  | 'login' 
  | 'dashboard' 
  | 'students' 
  | 'teachers'
  | 'admissions' 
  | 'transfers' 
  | 'cases' 
  | 'documents'
  | 'attendance'
  | 'institution'
  | 'search'
  | 'settings'
  | 'audit'
  | 'courses'
  | 'classes'
  | 'assignments'
  | 'exams'
  | 'timetable'
  | 'gradebook'
  | 'library'
  | 'communication'
  | 'finance'
  | 'facilities'
  | 'reports'
  | 'system-logs'
  | 'profile'
  | 'notifications'
  | 'student-profile'
  | 'teacher-profile'
  | 'manage-widgets'
  | 'academic-calendar'
  | 'student-report-card'
  | 'new-admission-flow'
  | 'fresh-admission'
  | 'applicant-profile'
  | 'transfer-admission-wizard';

export type WorkspaceTab = {
  id: string;
  label: string;
  view: AppView;
  icon?: string;
  closable?: boolean;
};

interface AppState {
  // Auth & Activation
  isActivated: boolean;
  isAuthenticated: boolean;
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: string;
    institution: string;
    avatar?: string;
  } | null;
  tenantId: string | null;

  // Navigation
  currentView: AppView;
  sidebarCollapsed: boolean;
  commandBarOpen: boolean;

  // Workspace tabs
  tabs: WorkspaceTab[];
  activeTabId: string;

  // Detail panels
  selectedEntityId: string | null;
  detailPanelOpen: boolean;

  // Installed widgets
  installedWidgetIds: string[];
  installWidget: (id: string) => void;
  uninstallWidget: (id: string) => void;

  // Actions
  setView: (view: AppView) => void;
  activate: (tenantId: string) => void;
  login: (user: AppState['currentUser']) => void;
  logout: () => void;
  toggleSidebar: () => void;
  toggleCommandBar: () => void;
  openTab: (tab: WorkspaceTab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  selectEntity: (id: string | null) => void;
  toggleDetailPanel: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isActivated: false,
  isAuthenticated: false,
  currentUser: null,
  tenantId: null,

  currentView: 'activation',
  sidebarCollapsed: false,
  commandBarOpen: false,

  tabs: [
    { id: 'dashboard', label: 'Operations Dashboard', view: 'dashboard', closable: false },
  ],
  activeTabId: 'dashboard',

  selectedEntityId: null,
  detailPanelOpen: false,

  installedWidgetIds: [
    'total-students', 
    'active-courses', 
    'classes-today', 
    'attendance-rate', 
    'assignments-submitted', 
    'exam-pass-rate'
  ],
  installWidget: (id) => set(s => ({
    installedWidgetIds: s.installedWidgetIds.includes(id) ? s.installedWidgetIds : [...s.installedWidgetIds, id]
  })),
  uninstallWidget: (id) => set(s => ({
    installedWidgetIds: s.installedWidgetIds.filter(x => x !== id)
  })),

  setView: (view) => set({ currentView: view }),

  activate: (tenantId) => set({ 
    isActivated: true, 
    tenantId, 
    currentView: 'login' 
  }),

  login: (user) => set({ 
    isAuthenticated: true, 
    currentUser: user, 
    currentView: 'dashboard' 
  }),

  logout: () => set({ 
    isAuthenticated: false, 
    currentUser: null, 
    currentView: 'login',
    tabs: [{ id: 'dashboard', label: 'Operations Dashboard', view: 'dashboard', closable: false }],
    activeTabId: 'dashboard',
  }),

  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  toggleCommandBar: () => set(s => ({ commandBarOpen: !s.commandBarOpen })),

  openTab: (tab) => {
    const state = get();
    const exists = state.tabs.find(t => t.id === tab.id);
    if (exists) {
      set({ activeTabId: tab.id, currentView: tab.view });
    } else {
      set({ 
        tabs: [...state.tabs, tab], 
        activeTabId: tab.id, 
        currentView: tab.view 
      });
    }
  },

  closeTab: (tabId) => {
    const state = get();
    const filtered = state.tabs.filter(t => t.id !== tabId);
    if (state.activeTabId === tabId && filtered.length > 0) {
      const lastTab = filtered[filtered.length - 1];
      set({ tabs: filtered, activeTabId: lastTab.id, currentView: lastTab.view });
    } else {
      set({ tabs: filtered });
    }
  },

  setActiveTab: (tabId) => {
    const state = get();
    const tab = state.tabs.find(t => t.id === tabId);
    if (tab) {
      set({ activeTabId: tabId, currentView: tab.view });
    }
  },

  selectEntity: (id) => set({ selectedEntityId: id, detailPanelOpen: id !== null }),

  toggleDetailPanel: () => set(s => ({ detailPanelOpen: !s.detailPanelOpen })),
}));
