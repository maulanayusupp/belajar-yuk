import { storage } from '~/utils/storage'

// Profil anak (nama + avatar) disimpan di localStorage.
export interface Profile {
  name: string
  avatar: string
}

const KEY = 'belajar-yuk:profile'

// Pilihan avatar. `stars` = bintang yang dibutuhkan untuk membukanya
// (0 = gratis sejak awal). Bintang jadi "hadiah" yang memotivasi.
export interface AvatarOption {
  emoji: string
  stars: number
}

export const AVATARS: AvatarOption[] = [
  { emoji: '🦁', stars: 0 },
  { emoji: '🐯', stars: 0 },
  { emoji: '🐶', stars: 0 },
  { emoji: '🐱', stars: 0 },
  { emoji: '🦊', stars: 0 },
  { emoji: '🐼', stars: 0 },
  { emoji: '🐵', stars: 5 },
  { emoji: '🦄', stars: 10 },
  { emoji: '🐸', stars: 15 },
  { emoji: '🐧', stars: 20 },
  { emoji: '🐨', stars: 30 },
  { emoji: '🐲', stars: 40 },
]

/** Apakah avatar sudah terbuka berdasarkan total bintang. */
export function isAvatarUnlocked(avatar: AvatarOption, totalStars: number): boolean {
  return totalStars >= avatar.stars
}

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
