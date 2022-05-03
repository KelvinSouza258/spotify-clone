const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkWhite: 'rgba(255,255,255,.7);',
                green: '#1db954',
                lightGray: '#5e5e5e',
                darkGray: '#181818',
                black: '#000000',
            },
            fontFamily: {
                poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
                nunito: ['"Nunito"', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
}
