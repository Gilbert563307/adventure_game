import React from 'react'
import { PLAYER_DIRECTIONS } from '../config/config';
import MapModel from './MapModel';
import Helpers from '../helpers/Helpers';

export default function PlayerModel() {

  const { getMetaData } = MapModel();
  const { getPlayerMetaData } = Helpers();


  /**
   * 
   * @param {import()} cords 
   * @returns {number}
   */
  function calculateUpMoveMent(cords) {
    const max_jump = 1;
    return (cords.y + 1) <= max_jump ? (cords.y + 1) : cords.y;
  }

  /**
   * 
   * @param {number} y_level 
   * @returns {import("../types/types").MetaData }
   */
  function getMetaDataByYCordinate(y_level) {
    if (y_level >= 0) {
      return { "block_name": "air", "block_type": "air", "class": "air", }
    }
    return getMetaData(Math.abs(y_level))
  }



  /**
   * 
   * @param {import("../types/types").cords} cords 
   * @param {import("../types/types").direction} direction 
   * @returns {import("../types/types").cords}
   */
  function movePlayerToNewCord(cords, direction) {
    const r_chunk_one_edge = [9];
    const left_x_starting_point = 0;

    switch (direction) {
      case PLAYER_DIRECTIONS.LEFT:
        // Check if the player is on the left edge
        if (cords.x === left_x_starting_point) return cords;
        return { y: cords.y, x: cords.x - 1 };

      case PLAYER_DIRECTIONS.RIGHT:
        if (r_chunk_one_edge.includes(cords.x)) return cords;
        return { y: cords.y, x: cords.x + 1 };

      case PLAYER_DIRECTIONS.UP:
        //user can fly 
        // const new_up_cord = cords.y + 1 <= 14 ? cords.y + 1 : cords.y;
        //user can just jump;
        {
          const y = calculateUpMoveMent(cords);
          return { y: y, x: cords.x };
        }

      case PLAYER_DIRECTIONS.DOWN:
        // const n_y_cord = cords.y
        return cords;

      default:
        return cords;
    }
  }


  /**
 * Retrieves the current player coordinates and the new coordinates based on the direction of movement.
 * 
 * @param {import("../controller/MapController").MapArray} map - The current of the map or grid.
 * @param {string} direction - The direction in which the player wants to move. Should be one of the PLAYER_DIRECTIONS (UP, DOWN, LEFT, RIGHT).
 * 
 * @returns {import("../types/types").cordsToUpdateType}
 */
  function getCordsToUpdate(map, direction) {
    const grid_map = map;

    // Iterate through the grid map to find the player block
    for (let index = 0; index < grid_map.length; index++) {
      const columns = grid_map[index];

      for (let row_index = 0; row_index < columns.length; row_index++) {
        /**
         * @type {import("../types/types").MapBlock}
         */
        const row = columns[row_index];

        // Check if the current block is the player block
        if (row.meta_data.block_name === "player") {
          const curr_player_row = row;
          const curr_player_cords = curr_player_row.cords;

          // Get the new coordinates based on the player's direction
          const new_cords = movePlayerToNewCord(curr_player_cords, direction);
          console.log(`curr_player_cords ${JSON.stringify(curr_player_cords)}`)
          console.log(`new_cords ${JSON.stringify(new_cords)}`)

          // Return the old and new coordinates for updating
          return { "old_cords": curr_player_row, "new_cords": new_cords };
        };
      }
    }

    // Return null coordinates if no player block is found
    return { "old_cords": null, "new_cords": null };
  }


  /**
   * 
   * @param {import("../controller/MapController").MapArray} map 
   * @param {*} direction 
   * @returns 
   */
  function updateMapByPlayerMove(map, direction) {
    try {
      console.log(`updateMapByPlayerMove ${direction}`)
      const grid_map = map;

      //when we get the new cordiantes
      const cordiantions = getCordsToUpdate(map, direction);

      //loop through the map and find the new cords;
      for (let i = 0; i < grid_map.length; i++) {
        const columns = grid_map[i];

        for (let row_i = 0; row_i < columns.length; row_i++) {

          /**
         * @type {import("../types/types").MapBlock}
         */
          const row = columns[row_i];

          // check what block is supossed to be on the old cords x level;
          if (row.cords === cordiantions.old_cords.cords) {
            const old_cords_y_lvl = cordiantions.old_cords.cords.y;

            //then replace the old cords of the player with that y level block
            row.meta_data = getMetaDataByYCordinate(old_cords_y_lvl);
          }

          //get the free row, and check if it macthes with where the player wants to go
          if (row.cords.y === cordiantions.new_cords.y && row.cords.x === cordiantions.new_cords.x) {
            //set the player to the new cords;
            row.meta_data = getPlayerMetaData();
          }
        }

      }

      //then return the new map grid

      return { message: "", grid: grid_map }
    } catch (error) {
      return { message: error.message, grid: [], type: 0 }
    }

  }
  return { updateMapByPlayerMove }
}
