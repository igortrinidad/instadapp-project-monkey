const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {

  darkMode: 'class',
  
  content: [
    "./pages/**/*.{html,js,vue}",
    "./components/**/*.{html,js,vue}",
    "./views/**/*.{html,js,vue}",
    "./data/**/*.{html,js,vue}",
    "./src/**/**/**/*.{html,js,vue}",
    "./src/**/**/**/**/*.{html,js,vue}",
    "./src/**/**/**/**/**/*.{html,js,vue}",
    "./src/**/**/**/**/**/**/*.{html,js,vue}",
    "./src/**/**/**/**/**/**/**/*.{html,js,vue}",
  ],

  theme: {
  },

  safelist: [
    'bg-indigo-500',
    'bg-amber-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'focus:ring-indigo-500',
    'focus:ring-amber-500',
    'focus:ring-lime-500',
    'focus:ring-green-500',
    'focus:ring-teal-500',
    'focus:ring-cyan-500',
    'focus:ring-sky-500',
    'focus:ring-blue-500',
    'focus:ring-violet-500',
    'focus:ring-purple-500',
    'focus:ring-fuchsia-500',
    'focus:ring-pink-500',
    'rounded-md',
    'px-2',
    'py-1'
  ]
  
}
