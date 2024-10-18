import React from 'react'

export default function CollectRenderMap() {


  function createGrid() {
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

    for (let index = -3; index < 1; index++) {
      const arr_index = Math.abs(index)
      const meta_data = getMetaData(arr_index);

      for (let col = 0; col < grid_map_width; col++) {
        const block_obj = { "cords": { "y": index, "x": col, }, "meta_data": meta_data }
        groud_grid[arr_index].push(block_obj)
      }
    }

    const reversed_grid = grid.reverse()
    const new_grid = [...reversed_grid, ...groud_grid]
    return new_grid
  }


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
        break;
    }
  }


  function renderMap() {
    const map_grid = createGrid()
    // console.log(map_grid)

    return map_grid.map((arr, index) => {
      const rows = arr
      const id_key = `row-${index}`
      return <div key={id_key} className='grid_flex'>{
        rows.map((row, key) => {
         
          const cords = JSON.stringify(row.cords)
          const block_name = row.meta_data.block_name
          
          return <div key={key} className={`${row.meta_data.class} block`}>{cords} </div>
        })
      } </div>
    })
  }


  return (
    <section className='map-grid'>
      {renderMap()}
    </section>
  )
}
