import React, { createContext, useContext, useReducer } from 'react'

import { Outlet } from 'react-router-dom'
import MapModel from '../model/MapModel'
import PlayerController from './PlayerController'
import PlayerModel from '../model/PlayerModel'


/**
 * @typedef {Array<import("../types/types").MapBlock>} MapArray - Array of map blocks.
 */

/**
 * @typedef {Object} MapControllerState
 * @property {MapArray} map - Array of blocks with coordinates and meta data.
 */

/**
 * Initial state for the controller.
 * @type {MapControllerState}
 */
const initialState = {
    map: [],
}

export const MAP_CONTROLLER_ACTIONS = {
    FETCH_MAP: "FETCH_MAP",
    UPDATE_MAP: "UPDATE_MAP",
    MOVE_PLAYER: "MOVE_PLAYER",
}

/**
 * @typedef {Object} ContextValue
 * @property {MapControllerState} state - Current state.
 * @property {(object: {type: string, payload?: any}) => void} dispatch - Dispatch function.
 */
const MapControllerContext = createContext({
    state: initialState,
    dispatch: () => { },
})


/**
* 
* @returns {ContextValue}
*/
export const useMapControllerContext = () => {
    const context = useContext(MapControllerContext);
    if (!context) {
        throw new Error(
            "useMapControllerContext must be used within a MapControllerProvider"
        );
    }
    return context
}

export default function MapController() {

    const { createMapWithChunks } = MapModel();
    const { getMapWithPlayer, updateMapByPlayerMove } = PlayerModel();

    const REDUCER_ACTIONS = {
        SET_MAP: "SET_PLAYER",
        UPDATE_MAP: "UPDATE_MAP"
    }


    /**
   * Reducer function for managing state changes.
   * @param {InitialState} state - Current state.
   * @param {Object} action - Action object containing type and payload.
   * @returns {Object} - Updated state.
   */
    const reducer = (state, action) => {
        switch (action.type) {
            case REDUCER_ACTIONS.SET_MAP:
                return {
                    ...state,
                    map: action.payload
                }

            case REDUCER_ACTIONS.UPDATE_MAP:
                return {
                    ...state,
                    map: action.payload
                }

            default:
                return state
        }
    }

    const init = () => {
        try {
            const map = createMapWithChunks();
            console.log(JSON.stringify(map))
            return {
                map: map
            }
        } catch (error) {
            console.error("Error initializing map:", error);
            return {
                map: []
            }
        }
    }

    // Defining the state and the dispatchAction using the useReducer hook
    const [state, dispatchAction] = useReducer(reducer, initialState, init);


    const collectMovePlayer = (direction) => {
        try {
            const updatedMap = updateMapByPlayerMove(state.map, direction);
            dispatchAction({
                type: REDUCER_ACTIONS.UPDATE_MAP,
                payload: updatedMap.grid,
            });
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    };

    const dispatch = (/** @type {{ type: string; payload?: any; }} */action) => {
        try {
            switch (action.type) {
                case MAP_CONTROLLER_ACTIONS.FETCH_MAP:

                    return;

                case MAP_CONTROLLER_ACTIONS.UPDATE_MAP:

                    return;

                case MAP_CONTROLLER_ACTIONS.MOVE_PLAYER:
                    collectMovePlayer(action.payload)
                    return;

                default:
                    break;
            }
        } catch (error) {
            console.log(`MaPcontroller: error ${error}`);

        }
    }
    const contextValue = { state, dispatch }

    return (
        <MapControllerContext.Provider value={contextValue}>
            <PlayerController>
                <Outlet></Outlet>
            </PlayerController>
        </MapControllerContext.Provider>

    )
}
