import { storage } from '~/utils/storage'

// The child's profile (name + avatar) stored in localStorage.
export interface Profile {
  name: string
  avatar: string
}

const KEY = 'belajar-yuk:profile'

// Avatar options. `stars` = stars required to unlock it
// (0 = free from the start). Stars become a motivating "reward".
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

/** Whether an avatar is unlocked based on the total stars. */
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
