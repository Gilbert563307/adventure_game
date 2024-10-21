import React from 'react'
import Helpers from '../helpers/Helpers';
import { ALERT_TYPES } from '../view/components/BS5Alert';

export default function MapModel() {

  const { getPlayerMetaData, initPlayerObject } = Helpers();


  /**
   * 
   * @param {import("../types/types").Map} map 
   * @returns {{map: import("../types/types").Map, player: import("../types/types").Player message: string, type: number}}
   */
  function getMapWithPlayer(map) {
    try {
      /**
       * @type {string}
       */
      const chunk_one_uuid = Object.keys(map)[0];

      //get the chunk
      /**
       * @type {import("../types/types").Chunk}
       */
      const chunk = map[chunk_one_uuid];

      //get the ground level and thats y 10 and x 0;
      /**
       * @type {import("../types/types").Chunk}
       */
      const arr = chunk[10];

      //get the first object of that chunk 
      /**
       *  @type {import("../types/types").ChunkBlock}
       */
      const row = arr[0];

      // Update the row's meta_data by setting there a player;
      row.meta_data = getPlayerMetaData();

      //set the player info
      const player = initPlayerObject(row.located_at);

      return { map: map, player: player, message: "", type: ALERT_TYPES.SUCCESS, };
    } catch (error) {
      return {
        map: [], player: {}, message: error.message, type: ALERT_TYPES.SUCCESS
      };
    }
  }

  /**
   * 
   * @param {number} y 
   * @param {number} x 
   * @param {string} chunk_uuid 
   * @returns {import("../types/types").ChunkBlock}
   */
  function getChunkBlock(y, x, chunk_uuid) {
    const meta_data = getMetaData(y);
    return {
      "cords": { "y": y, "x": x, },
      "meta_data": meta_data,
      "status": {
        "mineable": false,
        "active": true,
      },
      "located_at": { "chunk_uuid": chunk_uuid, "chunk_block_arr_index": y, "chunk_block_row_index": x }
    }
  }

  /**
   * 
   * @param {number} arr_index 
   * @returns {{block_name: string, block_type: string, class: string}}
   */
  function getMetaData(arr_index) {
    switch (arr_index) {
      case 11:
        return { "block_name": "grass", "block_type": "grass", "class": "grass" }
      case 12:
        return { "block_name": "dirt", "block_type": "dirt", "class": "dirt" }
      case 13:
        return { "block_name": "stone", "block_type": "stone", "class": "stone" }
      case 14:
        return { "block_name": "stone", "block_type": "stone", "class": "stone" }

      default:
        return { "block_name": "air", "block_type": "air", "class": "air" }
    }
  }

  /**
   * 
   * @param {number} y 
   * @param {number} x 
   * @param {string} chunk_uuid
   * @returns {import("../types/types").ChunkBlock}
   */
  function createChunkObjectBy(y, x, chunk_uuid) {
    return getChunkBlock(y, x, chunk_uuid);
  }


  /**
  * 
  * @returns {{map: import("../types/types").Map, player: import("../types/types").Player message: string, type: number}}
  */
  function createMapWithChunks() {
    try {
      //create 5 starting chunks in the map object each with a unique id
      /** @type {import("../types/types").Map}) */
      const map = {
        "77ed7eb1-df84-4ae7-b8fb-72a62025a37e": [[], [], [], [], [], [], [], [], [], [], [],  /** gorund */[], [], [], []],
        "bebd290d-af15-4bf9-b6b5-2901cbbf3c07": [[], [], [], [], [], [], [], [], [], [], [],  /** gorund */[], [], [], []],
        "f8ac2c2b-ef35-4636-b3a2-ff72ba95013d": [[], [], [], [], [], [], [], [], [], [], [],  /** gorund */[], [], [], []],
        "7eea79a4-9ff5-45f0-83b2-f6b67779670f": [[], [], [], [], [], [], [], [], [], [], [],  /** gorund */[], [], [], []],
        "4914657a-ae0f-470c-bffd-fb66d14008f0": [[], [], [], [], [], [], [], [], [], [], [],  /** gorund */[], [], [], []],
      };

      // const max_air_blocks = 10;
      const chunk_width = 4;

      // loop through each chunk
      for (const property in map) {
        const chunk_uuid = property;
        /**
         * @type {import("../types/types").Chunk}
         */
        //chunk grid parent arr
        const chunk_grid = map[property];

        for (let index = 0; index < chunk_grid.length; index++) {
          for (let col = 0; col < chunk_width; col++) {
            const chunk = createChunkObjectBy(index, col, chunk_uuid);
            chunk_grid[index].push(chunk);
          }
        }

      }
      const map_with_player = getMapWithPlayer(map);
      return { map: map_with_player.map, player: map_with_player.player, message: "", type: ALERT_TYPES.SUCCESS };
    } catch (error) {
      return { map: [], player: {}, message: error.message, type: ALERT_TYPES.SUCCESS };
    }

  }
  return { createMapWithChunks }
}
