import React from 'react'
import {
    createBrowserRouter,

} from "react-router-dom";
import MainController from './MainController';
import CollectRenderMap from '../view/CollectRenderMap';
import ErrorPage from '../view/error/ErrorPage';


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
                    <CollectRenderMap></CollectRenderMap>
                )
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default router;