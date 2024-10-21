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
    return { getPlayerMetaData }
}
