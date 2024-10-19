import React from 'react'

export default function MapModel() {

  /**
   * 
   * @param {number} arr_index 
   * @returns {{block_name: string, block_type: string, class: string}}
   */
  function getMetaData(arr_index) {
    switch (arr_index) {
      case 0:
        return { "block_name": "grass", "block_type": "grass", "class": "grass" }
      case 1:
        return { "block_name": "dirt", "block_type": "dirt", "class": "dirt" }
      case 2:
        return { "block_name": "stone", "block_type": "stone", "class": "stone" }
      case 3:
        return { "block_name": "stone", "block_type": "stone", "class": "stone" }

      default:
        return { "block_name": "null", "block_type": "null", "class": "null" }
    }
  }

  /**
   * 
   * @returns {{error: boolean, grid:Array<Chunk>}}
   */
  function createMapGrid() {
    try {
      const grid = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
      const grid_map_width = 10;

      // creating the air blocks
      const max_air_blocks = grid.length
      for (let index = 0; index < max_air_blocks; index++) {
        for (let col = 0; col < grid_map_width; col++) {
          const object = { "cords": { "y": index, "x": col, }, "meta_data": { "block_name": "air", "block_type": "air", "class": "air" } }
          grid[index].push(object)

        }
      }

      //adding the grass,water,stone blocks
      const groud_grid = [[], [], [], []]

      for (let y_arr_index = -3; y_arr_index < 1; y_arr_index++) {
        const arr_index = Math.abs(y_arr_index)
        const meta_data = getMetaData(arr_index);

        
        for (let col = 0; col < grid_map_width; col++) {
          //this is for the visual bevause arrays count from 0 other wise we would have two zero points in the grid
          const y_level_to_show =  (y_arr_index + -1)
          
          const block_obj = { "cords": { "y": y_level_to_show, "x": col, }, "meta_data": meta_data }
          groud_grid[arr_index].push(block_obj)
        }
      }

      const reversed_grid = grid.reverse()
      const new_grid = [...reversed_grid, ...groud_grid]
      return { error: false, grid: new_grid }

    } catch (error) {
      return { error: true, grid: [] }
    }
  }
  return { createMapGrid }
}
