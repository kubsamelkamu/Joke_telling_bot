import { useState } from "react";

function JokeDisplay(){
    const[joke,setJoke] = useState('');
    const[isSpeaking,setIsSpeaking] = useState(false);

    return(
        <div>
            <p>Joke displayed here.</p>
            <button>Another Joke</button>
            <button>Speak Aloud</button>
        </div>
    );

}