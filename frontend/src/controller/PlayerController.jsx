import React from 'react'
import { Outlet } from 'react-router-dom'
import CollectRenderPlayer from '../view/player/CollectRenderPlayer'

export default function PlayerController() {
    return (
        <div>
            <CollectRenderPlayer/>
            <Outlet></Outlet>
        </div>
    )
}
