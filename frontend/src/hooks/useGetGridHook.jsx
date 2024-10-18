import React, { useEffect } from 'react'
import { MAIN_CONTROLLER_ACTIONS, useMainControllerContext } from '../controller/MainController';

export default function useGetGridHook() {
    const { state, dispatch } = useMainControllerContext();
    const fetchGrid = () => {
        dispatch({ type: MAIN_CONTROLLER_ACTIONS.FETCH_GRID })
    }
    useEffect(() => {
        fetchGrid();
    })
    return { grid: state.grid }
}
