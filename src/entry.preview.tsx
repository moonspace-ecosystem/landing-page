import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

const { router, notFound, staticFile } = createQwikCity({
  render: (opts: any) => import('./entry.ssr').then((m) => m.default(opts)),
  qwikCityPlan,
  manifest,
});

export { router, notFound, staticFile };
export default router;