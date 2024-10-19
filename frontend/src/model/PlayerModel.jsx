import React from 'react'

export default function PlayerModel() {
  
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
  return { getMapWithPlayer }
}
