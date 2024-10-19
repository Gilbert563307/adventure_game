import React, { useEffect } from 'react'
import { useMapControllerContext } from '../controller/MapController';


export default function useGetGridHook() {
    const { state, dispatch } = useMapControllerContext();
    
    return { map: state.map }
}
