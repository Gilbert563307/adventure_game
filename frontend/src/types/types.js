import React from 'react'

/**
 * @typedef {Object} MetaData
 * @property {string} block_name
 * @property {string} block_type
 * @property {string} class
 */

/**
 * @typedef {Object} cords
 * @property {number} x
 * @property {string} y
 */


/**
 * @typedef {Object} cords
 * @property {number} x
 * @property {string} y
 */

/**
 * @typedef {string} direction
 */

/**
 * @typedef {Object} Chunk
 * //TODO 
 */

/**
 * @typedef {Object} status
 * @property {boolean} mineable
 * @property {boolean} active
 * 
 */

/**
* @typedef {Object} cordsToUpdateType
* @property {import("../controller/MapController").MapBlock} old_cords - The current block containing the player.
* @property {status} old_cords.status - The status of the block (mineable and active).
* @property {cords} new_cords - The new coordinates where the player will move.
*/

export default function types() {
    return null;
}
