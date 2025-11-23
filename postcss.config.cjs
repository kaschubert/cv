// postcss.config.cjs
module.exports = {
  syntax: 'postcss-styled-syntax',   // ← this fixes @apply

  plugins: {
    '@tailwindcss/postcss': {},
  },
};