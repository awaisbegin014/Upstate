// Tailwind CSS v4 runs as a PostCSS plugin so the styles compile under both
// bundlers: Turbopack (`next dev`) and webpack (`next build --webpack`, which
// Hostinger's Node.js hosting requires for Next.js 16.3.3 and newer).
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
