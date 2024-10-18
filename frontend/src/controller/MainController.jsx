import React, { createContext, useContext, useReducer } from 'react'
import { Outlet } from 'react-router-dom'


/**
 * @typedef {Object} MainControllerState
 * @property {Array<Chunk>} grid
 * @property {Object} player
 */


/**
 * Initial state for the MainController.
 * @type {MainControllerState}
 */
const initialState = {
  grid: [],
  player: {},
}

export const MAIN_CONTROLLER_ACTIONS = {
  MOVE_PLAYER: "MOVE_PLAYER",
  FETCH_GRID: "FETCH_GRID",
}

/**
 * @typedef {Object} ContextValue
 * @property {MainControllerState} state - Current state.
 * @property {(object: {type: string, payload?: any}) => void} dispatch - Dispatch function.
 */
const MainControllerContext = createContext({
  state: initialState,
  dispatch: () => { },
})

/**
 * 
 * @returns {ContextValue}
 */
export const useMainControllerContext = () => {
  const context = useContext(MainControllerContext);
  if (!context) {
    throw new Error(
      "useMainControllerContext must be used within a MainControllerProvider"
    );
  }
  return context
}

export default function MainController() {

  const REDUCER_ACTIONS = {
    SET_PLAYER: "SET_PLAYER",
    SET_CHUNKS: "SET_CHUNKS",
    SET_GRID: "SET_GRID",
  }

  /**
   * Reducer function for managing state changes.
   * @param {InitialState} state - Current state.
   * @param {Object} action - Action object containing type and payload.
   * @returns {Object} - Updated state.
   */
  const reducer = (state, action) => {
    switch (action.type) {
      case REDUCER_ACTIONS.SET_CHUNKS:
        return {
          ...state,
          chunks: action.payload
        }

      case REDUCER_ACTIONS.SET_GRID:
        return {
          ...state,
          grid: action.payload
        }

      case REDUCER_ACTIONS.SET_PLAYER:
        return {
          ...state,
          player: action.payload
        }

      default:
        return state
    }
  }

  // Defining the state and the dispatchAction using the useReducer hook
  const [state, dispatchAction] = useReducer(reducer, initialState);


  const collectFetchGrid = () => {
    try {
      
    } catch (error) {
      
    }
  }


  const dispatch = (/** @type {{ type: string; payload?: any; }} */action) => {
    try {
      switch (action.type) {
        case MAIN_CONTROLLER_ACTIONS.MOVE_PLAYER:
          collectMovePLayer(action?.payload);
          break;

        case MAIN_CONTROLLER_ACTIONS.FETCH_GRID:
          collectFetchGrid();
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(`Maincontroller: error ${error}`);

    }
  }
  const contextValue = { state, dispatch }
  return (
    <MainControllerContext.Provider value={contextValue}>
      <Outlet />
    </MainControllerContext.Provider>
  )
}
