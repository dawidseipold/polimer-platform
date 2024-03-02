import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				foreground: {
					DEFAULT: 'hsl(var(--foreground) / <alpha-value>)'
				},

				background: {
					DEFAULT: 'hsl(var(--background) / <alpha-value>)',
					border: 'hsl(var(--background-border) / <alpha-value>)'
				},

				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},

				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					hover: 'hsl(var(--popover-hover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},

				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},

				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},

				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},

				info: {
					DEFAULT: 'hsl(var(--info) / <alpha-value>)',
					foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
					border: 'hsl(var(--info-border) / <alpha-value>)',
					hover: 'hsl(var(--info-hover) / <alpha-value>)'
				},

				success: {
					DEFAULT: 'hsl(var(--success) / <alpha-value>)',
					foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
					border: 'hsl(var(--success-border) / <alpha-value>)',
					hover: 'hsl(var(--success-hover) / <alpha-value>)'
				},

				warning: {
					DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
					foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
					border: 'hsl(var(--warning-border) / <alpha-value>)',
					hover: 'hsl(var(--warning-hover) / <alpha-value>)'
				},

				error: {
					DEFAULT: 'hsl(var(--error) / <alpha-value>)',
					foreground: 'hsl(var(--error-foreground) / <alpha-value>)',
					border: 'hsl(var(--error-border) / <alpha-value>)',
					hover: 'hsl(var(--error-hover) / <alpha-value>)'
				},

				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},

				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	}
};

export default config;
