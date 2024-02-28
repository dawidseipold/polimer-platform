import Root from './logo.svelte';
import { tv, type VariantProps } from 'tailwind-variants';

const logoVariants = tv({
	base: 'flex justify-start items-center p-4 text-3xl w-max font-bold tracking-wide',
	variants: {
		variant: {
			default: 'text-foreground',
			inverse: 'text-white'
		},
		size: {
			default: 'text-2xl',
			sm: 'text-xl',
			lg: 'text-3xl'
		},
		type: {
			default: 'fill-current',
			stroke: 'stroke-current'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
		type: 'default'
	}
});

type Variant = VariantProps<typeof logoVariants>['variant'];
type Size = VariantProps<typeof logoVariants>['size'];
type Type = VariantProps<typeof logoVariants>['type'];

type Props = {
	class?: string;
	variant?: Variant;
	size?: Size;
	type?: Type;
};

type Events = {};

export {
	// Local
	Root,
	type Props,
	type Events,

	// Global
	Root as Logo,
	type Props as LogoProps,
	type Events as LogoEvents,
	logoVariants
};
