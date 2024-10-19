import React, { createContext, useContext, useReducer } from 'react'

import { Outlet } from 'react-router-dom'
import MapModel from '../model/MapModel'
import PlayerController from './PlayerController'
import PlayerModel from '../model/PlayerModel'

/**
 * @typedef {Object} BlockMetaData
 * @property {string} block_name - The name of the block.
 * @property {string} block_type - The type of the block.
 * @property {string} class - The class of the block.
 */

/**
 * @typedef {Object} BlockCoordinates
 * @property {number} y - The y-coordinate of the block.
 * @property {number} x - The x-coordinate of the block.
 */

/**
 * @typedef {Object} MapBlock
 * @property {BlockCoordinates} cords - The coordinates of the block.
 * @property {BlockMetaData} meta_data - Meta data about the block.
 */

/**
 * @typedef {Array<MapBlock>} MapArray - Array of map blocks.
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

    const { createMapGrid } = MapModel();
    const { getMapWithPlayer } = PlayerModel();

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
            const map = createMapGrid();
            const updated_map = getMapWithPlayer(map.grid)
            return {
                map: updated_map.grid
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

    const dispatch = (/** @type {{ type: string; payload?: any; }} */action) => {
        try {
            switch (action.type) {
                case MAP_CONTROLLER_ACTIONS.FETCH_MAP:

                    break;

                case MAP_CONTROLLER_ACTIONS.UPDATE_MAP:

                    break;

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
