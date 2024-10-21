import React from 'react'
import { PLAYER_DIRECTIONS } from '../config/config';
import MapModel from './MapModel';
import Helpers from '../helpers/Helpers';
import { ALERT_TYPES } from '../view/components/BS5Alert';

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
   * 
   * @param {{player: import("../types/types").Player, direction: string}} payload 
   * @returns {{message: string, type: number, old_cords: import("../types/types").Cords, new_cords: import("../types/types").Cords}}
   */
  function getCordsToUpdate(payload) {
    try {
      //get the cordinations of where the player started from
      const old_y = payload.player.located_at.chunk_block_arr_index;
      const old_x = payload.player.located_at.chunk_block_row_index;

      const old_cords = { y: old_y, x: old_x };

      // Get the new coordinates based on the player's direction
      const new_cords = movePlayerToNewCord(old_cords, direction);

      return { "message": "", "type": ALERT_TYPES.SUCCESS, "old_cords": old_cords, "new_cords": new_cords };

    } catch (error) {
      return { "message": error.message, "type": ALERT_TYPES.DANGER, "old_cords": {}, "new_cords": {} };
    }

  }


  /**
   * 
   * @param {import("../controller/MapController").MapArray} map 
   * @param {{player: import("../types/types").Player, direction: string}} payload 
   * @returns 
   */
  function updateMapByPlayerMove(map, payload) {
    try {
      //when we get the new cordiantes

      console.log(`payload `);
      console.log(payload);

      const results = getCordsToUpdate(payload);



      // //loop through the map and find the new cords;
      // for (let i = 0; i < grid_map.length; i++) {
      //   const columns = grid_map[i];

      //   for (let row_i = 0; row_i < columns.length; row_i++) {

      //     /**
      //    * @type {import("../types/types").MapBlock}
      //    */
      //     const row = columns[row_i];

      //     // check what block is supossed to be on the old cords x level;
      //     if (row.cords === cordiantions.old_cords.cords) {
      //       const old_cords_y_lvl = cordiantions.old_cords.cords.y;

      //       //then replace the old cords of the player with that y level block
      //       row.meta_data = getMetaDataByYCordinate(old_cords_y_lvl);
      //     }

      //     //get the free row, and check if it macthes with where the player wants to go
      //     if (row.cords.y === cordiantions.new_cords.y && row.cords.x === cordiantions.new_cords.x) {
      //       //set the player to the new cords;
      //       row.meta_data = getPlayerMetaData();
      //     }
      //   }

      // }

      //then return the new map grid

      return { message: "", grid: map }
    } catch (error) {
      return { message: error.message, grid: [], type: 0 }
    }

  }
  return { updateMapByPlayerMove }
}
