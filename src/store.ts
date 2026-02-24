import { create } from 'zustand'

export type SubmenuItem = {
  name: string;
  to: string;
}

export type SubmenuNavigation = {
  navigation: SubmenuItem[];
  setNavigation: (navigation: SubmenuItem[]) => void
}

export const useSubmenuNavigation = create<SubmenuNavigation>()((set) => ({
  navigation: [],
  setNavigation: (navigation: SubmenuItem[]) => set(() => ({ navigation: navigation })),
}));

export type ThemeType = 'light' | 'dark' | 'system';

export type ThemeStore = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

export const useThemeStore = create<ThemeStore>()((set) => ({
  theme: (localStorage.getItem('deskreport-theme') as ThemeType) || 'system',
  setTheme: (theme: ThemeType) => {
    localStorage.setItem('deskreport-theme', theme);
    set({ theme });
  },
}));

export type UIStore = {
  isChatSidebarOpen: boolean;
  toggleChatSidebar: () => void;
  isChatSidebarEnabled: boolean;
  setChatSidebarEnabled: (enabled: boolean) => void;
};

export const useUIStore = create<UIStore>()((set) => ({
  isChatSidebarOpen: localStorage.getItem('deskreport-chat-open') === 'true',
  toggleChatSidebar: () => set((state) => {
    const newState = !state.isChatSidebarOpen;
    localStorage.setItem('deskreport-chat-open', String(newState));
    return { isChatSidebarOpen: newState };
  }),
  isChatSidebarEnabled: localStorage.getItem('deskreport-chat-enabled') !== 'false',
  setChatSidebarEnabled: (enabled: boolean) => {
    localStorage.setItem('deskreport-chat-enabled', String(enabled));
    set({ isChatSidebarEnabled: enabled });
  },
}));