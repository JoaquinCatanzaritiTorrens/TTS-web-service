export const navigationRoutes: Record<string, string> = {
    'home': '/',
    'contact': '/contact',
};

export const getRouteFromNavItem = (navItem: string): string => {
    return navigationRoutes[navItem] || `/${navItem}`;
};

export const isNavItemActive = (navItem: string, currentPathname: string): boolean => {
    const route = getRouteFromNavItem(navItem);
    return currentPathname === route;
};
