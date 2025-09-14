import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite()],
    build: {
      ssr: true,
      rollupOptions: {
        input: ['src/entry.preview.tsx'],
      },
    },
  };
});