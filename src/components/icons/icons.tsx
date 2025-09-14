import { component$ } from '@builder.io/qwik';

interface IconProps {
  size?: number;
  class?: string;
}

const Icon = component$<IconProps & { paths: string[]; viewBox?: string }>(
  ({ size = 24, class: className, paths, viewBox = "0 0 24 24" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={className}
    >
      {paths.map((path, i) => (
        <path key={i} d={path} />
      ))}
    </svg>
  )
);

// Export common icons used in the app
export const ArrowRight = component$<IconProps>((props) => (
  <Icon {...props} paths={["m9 18 6-6-6-6"]} />
));

export const BarChart3 = component$<IconProps>((props) => (
  <Icon {...props} paths={["M3 3v18h18", "M7 16V9", "M11 16V6", "M15 16V4", "M19 16v-7"]} />
));

export const Globe = component$<IconProps>((props) => (
  <Icon {...props} paths={["M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z", "M8 12h8", "M12 2a15.3 15.3 0 0 1 4 10", "M12 2a15.3 15.3 0 0 0-4 10", "M12 22a15.3 15.3 0 0 0 4-10", "M12 22a15.3 15.3 0 0 1-4-10"]} />
));

export const Zap = component$<IconProps>((props) => (
  <Icon {...props} paths={["M13 2 3 14h9l-1 8 10-12h-9l1-8z"]} />
));

export const Shield = component$<IconProps>((props) => (
  <Icon {...props} paths={["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"]} />
));

export const TrendingUp = component$<IconProps>((props) => (
  <Icon {...props} paths={["m22 7-8.5 8.5-5-5L2 17", "m16 7 6 0 0 6"]} />
));

export const Users = component$<IconProps>((props) => (
  <Icon {...props} paths={["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M14 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0z", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]} />
));

export const DollarSign = component$<IconProps>((props) => (
  <Icon {...props} paths={["M12 1v22", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"]} />
));

export const CheckCircle = component$<IconProps>((props) => (
  <Icon {...props} paths={["M22 11.08V12a10 10 0 1 1-5.93-9.14", "m9 11 3 3L22 4"]} />
));

export const Star = component$<IconProps>((props) => (
  <Icon {...props} paths={["m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"]} />
));

export const Building = component$<IconProps>((props) => (
  <Icon {...props} paths={["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", "M6 12h12", "M6 8h12"]} />
));

export const Target = component$<IconProps>((props) => (
  <Icon {...props} paths={["M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z", "M16 12A4 4 0 1 1 12 8a4 4 0 0 1 4 4z", "M14 12A2 2 0 1 1 12 10a2 2 0 0 1 2 2z"]} />
));

export const Rocket = component$<IconProps>((props) => (
  <Icon {...props} paths={["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z", "M12.76 7.42a10 10 0 0 1 .47 10.5L21 21l-3.26-3.26a10 10 0 0 1-10.5-.47z", "M8.52 7.42L9.26 3.16 3.16 9.26l4.76 4.76L12 9.26z"]} />
));