import React from 'react'
import { PLAYER_DIRECTIONS } from '../config/config';
import MapModel from './MapModel';

export default function PlayerModel() {

  const { getMetaData } = MapModel();

  /**
 * Retrieves the metadata for the player block.
 * 
 * @returns {Object} An object containing metadata for the player block.
 * @returns {string} return.block_name - The name of the block, which is "player".
 * @returns {string} return.block_type - The type of the block, which is "player".
 * @returns {string} return.class - The CSS class or classification for the player block.
 * 
 * @description
 * This function returns metadata information associated with the player block, which includes
 * the block name, type, and class. This data can be used to identify or style the player block.
 */
  function getPlayerMetaData() {
    return {
      "block_name": "player",
      "block_type": "player",
      "class": "player",
    };
  }

  function getMetaDataByYCordinate(y_level) {
    if (y_level >= 0) {
      return { "block_name": "air", "block_type": "air", "class": "air", }
    }
    return getMetaData(Math.abs(y_level))
  }


  /**
   * 
   * @param {import("../controller/MapController").MapArray} grid_map 
   * @returns {{error: boolean, grid: import("../controller/MapController").MapArray}}
   */
  const getMapWithPlayer = (grid_map) => {
    try {

      const updated_grid_map = grid_map.map((arr) => {
        return arr.map((
          /**
           * @type {import("../controller/MapController").MapBlock}
           */ row) => {

          // Check if the row has the coordinates x == 0 and y == 0
          if (row.cords.x == 0 && row.cords.y == 0) {
            // Update the row's meta_data
            row.meta_data.block_name = "player";
            row.meta_data.block_type = "player";
            row.meta_data.class = "player";
          }

          // Return the row (either updated or not)
          return row;
        });
      });

      return { error: false, grid: updated_grid_map }
    } catch (error) {
      return { error: true, grid: [] }
    }
  }

  /**
 * Moves the player to new coordinates based on the given direction.
 * 
 * @param {Object} cords - The current coordinates of the player.
 * @param {number} cords.x - The player's current x-coordinate (horizontal).
 * @param {number} cords.y - The player's current y-coordinate (vertical).
 * @param {string} direction - The direction in which the player wants to move. Should be one of the PLAYER_DIRECTIONS (UP, DOWN, LEFT, RIGHT).
 * 
 * @returns {Object} The new coordinates of the player after attempting to move.
 * 
 * @description 
 * - If the player is on the left edge (y = 0), certain movements (like left or down) are restricted.
 * - The player can move left, right, up, or down based on the current position and direction.
 * - If the player attempts to move outside allowed bounds (like left when y = 0), the coordinates will remain unchanged.
 * - The player can "jump" upwards (y increases) and be reset slowly to the ground.
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
        const max_jump = 1;
        const new_up_cord = (cords.y + 1) <= max_jump ? (cords.y + 1) : cords.y;

        return { y: new_up_cord, x: cords.x };

      case PLAYER_DIRECTIONS.DOWN:
        const n_y_cord = cords.y
        return cords;

      default:
        return cords;
    }
  }


  /**
  * @typedef {Object} cordsToUpdateType
  * @property {import("../controller/MapController").MapBlock} old_cords - The current block containing the player.
  * @property {{mineable: boolean, active: boolean}} old_cords.status - The status of the block (mineable and active).
  * @property {Object} new_cords - The new coordinates where the player will move.
  * @property {number} new_cords.x - The x-coordinate of the new position.
  * @property {number} new_cords.y - The y-coordinate of the new position.
  */


  /**
 * Retrieves the current player coordinates and the new coordinates based on the direction of movement.
 * 
 * @param {import("../controller/MapController").MapArray} map - The current of the map or grid.
 * @param {string} direction - The direction in which the player wants to move. Should be one of the PLAYER_DIRECTIONS (UP, DOWN, LEFT, RIGHT).
 * 
 * @returns {cordsToUpdateType}
 */
  function getCordsToUpdate(map, direction) {
    const grid_map = map;

    // Iterate through the grid map to find the player block
    for (let index = 0; index < grid_map.length; index++) {
      const columns = grid_map[index];

      for (let row_index = 0; row_index < columns.length; row_index++) {
        /**
         * @type {import("../controller/MapController").MapBlock}
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
         * @type {import("../controller/MapController").MapBlock}
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

      return { error: false, grid: grid_map }
    } catch (error) {
      return { error: true, grid: state.map }
    }

  }
  return { getMapWithPlayer, updateMapByPlayerMove }
}
