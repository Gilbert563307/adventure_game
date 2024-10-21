import React from 'react'

export default function Helpers() {

    /**
  * 
  * @returns {import("../types/types").MetaData }
  */
    function getPlayerMetaData() {
        return {
            "block_name": "player",
            "block_type": "player",
            "class": "player",
        };
    }


    /**
     * 
     * @param {import("../types/types").LocatedAt} located_at 
     * @returns {import("../types/types").Player }
     */
    function initPlayerObject(located_at) {
        return {
            gamemode: 0,
            gamhealthemode: 10,
            inventory: [],
            located_at: located_at,
        }
    }
    return { getPlayerMetaData, initPlayerObject }
}
