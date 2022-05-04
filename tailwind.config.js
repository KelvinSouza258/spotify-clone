const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkWhite: 'rgba(255,255,255,.7);',
                green: '#1db954',
                lightGray: '#5e5e5e',
                hoverGray: '#404040',
                darkGray: '#242424',
                darkerGray: '#181818',
                black: '#000000',
            },
            fontFamily: {
                nunito: ['"Nunito"', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
}
