import React from 'react'
import {
    createBrowserRouter,

} from "react-router-dom";
import MainController from './MainController';
import CollectRenderMap from '../view/CollectRenderMap';
import ErrorPage from '../view/error/ErrorPage';
import MapController from './MapController';
import LandingPage from '../view/pages/LandingPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainController></MainController>
        ),
        children: [
            {
                index: true,
                path: "",
                element: (
                    <LandingPage></LandingPage>
                ),
            },
            {
                path: "/main",
                element: <MapController />,
                children: [
                    {
                        index: true,
                        path: "",
                        element: <CollectRenderMap/>
                    }
                ]
            }
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;