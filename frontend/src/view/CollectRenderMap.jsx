import React from 'react'

export default function CollectRenderMap() {

  function createGrid() {
    const grid = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]

    for (let col = 0; col < grid.length; col++) {
      for (let index = 0; index < 10; index++) {
        const object = { "cords": { "y": col, "x": index, }, "meta_data": { "block_name": "air", "block_type": "air", "class": "air" } }
        grid[col].push(object)

      }
    }
    return grid.reverse()
  }


  function renderMap() {
    const map_grid = createGrid()
    console.log(map_grid)

    return map_grid.map((arr, index) => {
      const rows = arr
      return <div key={index} className='grid_flex'>{
        rows.map((row, key) => {
          const cords = JSON.stringify(row.cords)
          const block_name = row.meta_data.block_name
          return <div key={key} className={`${row.meta_data.class} block`}>{block_name}  {cords} </div>
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
