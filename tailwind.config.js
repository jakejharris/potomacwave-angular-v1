/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            textShadow: {
                'sm': '1px 1px 2px rgba(0, 0, 0, 0.25)',
                'md': '2px 2px 4px rgba(0, 0, 0, 0.4)',
                'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
                'lg': '4px 4px 8px rgba(0, 0, 0, 0.5)',
                'xl': '6px 6px 12px rgba(0, 0, 0, 0.5)',
            }
        },
    },
    plugins: [
        require('daisyui'),
        function ({ addUtilities, theme, e }) {
            const newUtilities = {}
            Object.entries(theme('textShadow')).forEach(([key, value]) => {
                newUtilities[`.text-shadow${key === 'default' ? '' : `-${key}`}`] = {
                    textShadow: value,
                }
            })
            addUtilities(newUtilities)
        }
    ],
}