// Konfigurasi ESLint (flat config) berbasis aturan resmi Nuxt.
// Formatting diserahkan ke Prettier — ESLint fokus ke kualitas kode.
import withNuxt from './.nuxt/eslint.config.mjs'

// Polyfill: `Object.groupBy` baru ada di Node 21+. Sebagian util config
// ESLint memakainya, jadi kita sediakan agar tetap jalan di Node 20.
// (Dijalankan saat modul dievaluasi, sebelum ESLint memproses config.)
if (typeof Object.groupBy !== 'function') {
  Object.groupBy = (items, callback) => {
    const result = {}
    let i = 0
    for (const item of items) {
      const key = callback(item, i++)
      ;(result[key] ??= []).push(item)
    }
    return result
  }
}

export default withNuxt({
  rules: {
    // Izinkan komponen 1 kata bila memang disengaja (mis. halaman).
    'vue/multi-word-component-names': 'off',
    // Props opsional TS wajar bernilai undefined — tak perlu default eksplisit.
    'vue/require-default-prop': 'off',
    // Format self-closing diserahkan ke Prettier (hindari konflik void element).
    'vue/html-self-closing': 'off',
  },
})
