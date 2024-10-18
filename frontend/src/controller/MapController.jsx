import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MapController() {
    return (
        <div>
            <h1>map controller</h1>
            <Outlet></Outlet>

        </div>
    )
}
