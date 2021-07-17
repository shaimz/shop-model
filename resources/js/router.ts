import {createWebHistory, createRouter, RouteRecordRaw} from "vue-router";

function viewPublic(component: string) {
    return () => import(/* webpackChunkName: "frontend-chunk-" */ /* webpackPreload: true */`./views/public/${component}.vue`)
}
function viewAdmin(component: string) {
    return () => import(/* webpackChunkName: "admin-chunk-" */ /* webpackPreload: true */`./views/admin/${component}.vue`)
}
function load(component: string) {
    return () => import(/* webpackChunkName: "frontend-chunk-" */ /* webpackPreload: true */`./components/${component}.vue`)
}

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: viewPublic('Home'),
        children:[
            {
                path: "/category/:slug",
                name: "category",
                component: load('Category'),
            },
        ]
    },
    {
        path: "/admin",
        name: "admin",
        component: viewAdmin('Dashboard'),
    },
    {
        path: "/sign",
        name: "login",
        component: load('Login'),
    },
    {
        path: "/signup",
        name: "signup",
        component: load('Register'),
    },
    {
        path: "/cart",
        name: "cart",
        component: load('Cart'),
    },
    {
        path: "/product/:slug",
        name: "product",
        component: load('Product'),
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(() => {

})

export default router;
