import type { Profile } from '~/services/profileService'
import { profileService } from '~/services/profileService'

// Reactive & global child profile (name + avatar).
export function useProfile() {
  const profile = useState<Profile | null>('profile', () => null)

  onMounted(() => {
    if (!profile.value) profile.value = profileService.get()
  })

  function save(name: string, avatar: string) {
    profile.value = profileService.save({ name: name.trim(), avatar })
  }

  function clear() {
    profileService.clear()
    profile.value = null
  }

  const hasProfile = computed(() => !!profile.value?.name)
  const greetingName = computed(() => profile.value?.name || 'Teman')

  return { profile, save, clear, hasProfile, greetingName }
}
