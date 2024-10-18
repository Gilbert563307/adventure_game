import React from 'react'
import useGetGridHook from '../hooks/useGetGridHook'

export default function CollectRenderMap() {
  const { grid } = useGetGridHook()

  function renderMap(map_grid) {

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
      <h1>hello</h1>
      {renderMap(grid)}
    </section>
  )
}
