import { createContext, useState } from "react";
const Player = createContext()

const PlayerContext = ({children})=>{
    const [currentTrack, setcurrentTrack] = useState(null)
    return(
        <Player.Provider value={{currentTrack, setcurrentTrack}}>
        {children}
    </Player.Provider>
    )
}

export  { PlayerContext, Player}