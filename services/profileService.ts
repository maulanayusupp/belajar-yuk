import { storage } from '~/utils/storage'

// Profil anak (nama + avatar) disimpan di localStorage.
export interface Profile {
  name: string
  avatar: string
}

const KEY = 'belajar-yuk:profile'

// Pilihan avatar (emoji hewan lucu).
export const AVATARS = ['🦁', '🐯', '🐶', '🐱', '🦊', '🐼', '🐵', '🦄', '🐸', '🐧', '🐨', '🐰']

export const profileService = {
  get(): Profile | null {
    return storage.get<Profile | null>(KEY, null)
  },
  save(profile: Profile): Profile {
    storage.set(KEY, profile)
    return profile
  },
  clear(): void {
    storage.remove(KEY)
  },
}
