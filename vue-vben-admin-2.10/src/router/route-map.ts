// import { LAYOUT, EXCEPTION_COMPONENT } from './constant';
import { asyncRoutes } from './routes';

// export const ROUTE_MAP = {
//   NOT_FOUND: EXCEPTION_COMPONENT,
//   Dashboard: LAYOUT,
//   About: LAYOUT,
//   Aboutpage: () => import('/@/views/sys/about/index.vue'),
//   Analysis: () => import('/@/views/dashboard/analysis/index.vue'),
//   Workbench: () => import('/@/views/dashboard/workbench/index.vue'),
//   Charts: LAYOUT,
// };

const newRoutes = {};
function generateRouteMap(routes) {
  return routes.map((item) => {
    if (item.children && item.children.length > 0) {
      generateRouteMap(item.children);
    }
    newRoutes[item.name] = item.component;
  });
}

generateRouteMap(asyncRoutes);

// console.log(newRoutes);
export const ROUTE_MAP = newRoutes;
