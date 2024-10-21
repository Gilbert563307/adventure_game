import React from 'react'


//map = { uuid: [], uuid: [] , uuid: []  }

/**
 * @typedef {Object} ChunkBlock
 * @property {Cords} cords 
 * @property {MetaData} meta_data 
 * @property {Status} status 
 * //TODO updated
 * @property {{chunk_uuid: string, chunk_block_arr_index: number, chunk_block_row_index: number}} located_at 
 */

/**
 * @typedef {ChunkBlock[]} Chunk
 */


/**
 * @typedef {Object.<string, Chunk[]>} Map
 * @property {Array<Chunk>} uuid 
 */


/**
 * @typedef {Object} MetaData
 * @property {string} block_name
 * @property {string} block_type
 * @property {string} class
 */

/**
 * @typedef {Object} Cords
 * @property {number} x
 * @property {string} y
 */

/**
 * @typedef {string} Direction
 */

/**
 * @typedef {Object} Status
 * @property {boolean} mineable
 * @property {boolean} active
 * 
 */


/**
* @typedef {Object} CordsToUpdateType
* @property {MapBlock} old_cords - The current block containing the player.
* @property {status} old_cords.status - The status of the block (mineable and active).
* @property {Cords} new_cords - The new coordinates where the player will move.
*/

export default function types() {
    return null;
}
