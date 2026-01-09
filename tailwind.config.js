/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cleanow: ['Cleanow', 'sans-serif'],
      },
      colors: {
        'blue-primary': 'var(--blue-primary)',
        'blue-dark': 'var(--blue-dark)',
        'blue-medium': 'var(--blue-medium)',
        'blue-light': 'var(--blue-light)',
        'blue-deep': 'var(--blue-deep)',
        'blue-sky': 'var(--blue-sky)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-blue-primary': 'linear-gradient(135deg, var(--blue-primary), var(--blue-medium))',
        'gradient-blue-dark': 'linear-gradient(135deg, var(--blue-dark), var(--blue-deep))',
        'gradient-blue-sky': 'linear-gradient(135deg, var(--blue-sky), var(--blue-primary))',
        'gradient-blue-diagonal': 'linear-gradient(to bottom right, var(--blue-primary), var(--blue-medium), var(--blue-dark))',
      },
    },
  },
  plugins: [],
} 