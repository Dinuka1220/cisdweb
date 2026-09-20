/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            'xs': '374px',
            'sm': '424px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            '3xl': '1920px',
            '4k': '2560px'
        },
    },
    plugins: [],
};
