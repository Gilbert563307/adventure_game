import React, { createContext, useContext, useReducer } from 'react'
import CollectRenderMap from '../view/CollectRenderMap'
import { Outlet } from 'react-router-dom'


/**
 * @typedef {Object} MainControllerState
 * @property {Array<Chunk>} chunks
 * @property {Object} player
 */


/**
 * Initial state for the MainController.
 * @type {MainControllerState}
 */
const initialState = {
  chunks: [],
  player: {},
}

export const MAIN_CONTROLLER_ACTIONS = {
  MOVE_PLAYER: "MOVE_PLAYER"
}

/**
 * @typedef {Object} ContextValue
 * @property {InitialState} state - Current state.
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


  const dispatch = (/** @type {{ type: string; payload?: any; }} */action) => {
    try {
      switch (action.type) {
        case MAIN_CONTROLLER_ACTIONS.MOVE_PLAYER:
          collectMovePLayer(action?.payload);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(`Maincontroller: error ${error}`);

    }
  }

  return (
    <MainControllerContext.Provider>
      <Outlet/>
    </MainControllerContext.Provider>
  )
}
