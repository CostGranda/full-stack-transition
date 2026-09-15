export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  tasks: '/tasks',
  newTask: '/tasks/new',
} as const;

export const routes = ROUTES;

export const routeConfig = {
  home: {
    path: ROUTES.home,
    label: 'Home',
  },
  login: {
    path: ROUTES.login,
    label: 'Login',
  },
  register: {
    path: ROUTES.register,
    label: 'Register',
  },
  tasks: {
    path: ROUTES.tasks,
    label: 'Tasks',
  },
  newTask: {
    path: ROUTES.newTask,
    label: 'Add task',
  },
} as const;

export const homeRoute = ROUTES.home;

export type RouteName = keyof typeof ROUTES;

export function resolveRoute(name: RouteName) {
  return ROUTES[name];
}
