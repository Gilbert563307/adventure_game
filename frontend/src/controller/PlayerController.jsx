import React from 'react'
import { Outlet } from 'react-router-dom'
import usePlayerMoveHook from '../hooks/usePlayerMoveHook'



export default function PlayerController() {

    usePlayerMoveHook();
    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}
