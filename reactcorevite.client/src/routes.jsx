import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';


// Redirect components
const RedirectToLogin = () => <Navigate to="/auth/signin" replace />;
const RedirectToDashboard = () => <Navigate to="/app/dashboard/default" replace />;

// Render route tree
export const renderRoutes = (routes = []) => (
    <Suspense fallback={<Loader />}>
        <Routes>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Element = route.element;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        element={
                            <Guard>
                                <Layout>
                                    {route.routes ? renderRoutes(route.routes) : <Element />}
                                </Layout>
                            </Guard>
                        }
                    />
                );
            })}
        </Routes>
    </Suspense>
);

// Route definitions
const routes = [
    {
        path: '/',
        element: RedirectToLogin
    },
    {
        path: '/auth/signin',
        element: lazy(() => import('./views/auth/signin/SignIn1'))
    },
    {
        path: '/auth/signup',
        element: lazy(() => import('./views/auth/signup/SignUp1'))
    },
    {
        path: '*',
        layout: AdminLayout,
        routes: [
            {
                path: '/app/dashboard/default',
                element: lazy(() => import('./views/dashboard'))
            },
            {
                path: '/Inventory/productspage',
                element: lazy(() => import('./views/Inventory/Products'))
            },
            {
                path: '/Inventory/ProductChildMenu/addupdateproduct',
                element: lazy(() => import('./views/Inventory/ProductChildMenu/AddUpdateProduct'))
            },
            {
                path: '/Inventory/ProductChildMenu/ProductDetails',
                element: lazy(() => import('./views/Inventory/ProductChildMenu/ProductDetails'))
            },
            {
                path: '/Admin/AddNewUser',
                element: lazy(() => import('./views/Admin/AddNewUser'))
            },
            {
                path: '/Admin/UserDetails',
                element: lazy(() => import('./views/Admin/UserDetails'))
            },
            {
                path: '*',
                element: RedirectToDashboard
            }
        ]
    }
];

export default routes;
