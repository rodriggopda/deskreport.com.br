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