// ESLint configuration (flat config) based on the official Nuxt rules.
// Formatting is left to Prettier — ESLint focuses on code quality.
import withNuxt from './.nuxt/eslint.config.mjs'

// Polyfill: `Object.groupBy` only exists in Node 21+. Some ESLint config
// utils use it, so we provide it to keep things working on Node 20.
// (Runs when the module is evaluated, before ESLint processes the config.)
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
    // Allow single-word components when intentional (e.g. pages).
    'vue/multi-word-component-names': 'off',
    // Optional TS props are reasonably undefined — no explicit default needed.
    'vue/require-default-prop': 'off',
    // Self-closing formatting is left to Prettier (avoids void element conflicts).
    'vue/html-self-closing': 'off',
  },
})
