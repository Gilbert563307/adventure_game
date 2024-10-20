import React, { useEffect } from 'react'
import { MAP_CONTROLLER_ACTIONS, useMapControllerContext } from '../controller/MapController';
import { PLAYER_DIRECTIONS } from '../config/config';

export default function usePlayerMoveHook() {
    const { dispatch } = useMapControllerContext();


    const movePlayer = (direction) => {
        if (direction == null) return;
        dispatch({ type: MAP_CONTROLLER_ACTIONS.MOVE_PLAYER, payload: direction });
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            let direction = null;
            switch (event.key) {
                case 'w':
                    direction = PLAYER_DIRECTIONS.UP
                    break;
                case 'a':
                    direction = PLAYER_DIRECTIONS.LEFT

                    break;
                case 's':
                    direction = PLAYER_DIRECTIONS.DOWN

                    break;
                case 'd':
                    direction = PLAYER_DIRECTIONS.RIGHT

                    break;
                default:
                    break;
            }
            movePlayer(direction);
        };
        document.body.addEventListener('keydown', handleKeyDown)
        // Add event listener

        // Clean up the event listener on component unmount
        return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null;
}
