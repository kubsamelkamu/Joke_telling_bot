import { useState } from "react";

function JokeDisplay(){
    const[joke,setJoke] = useState('');
    //const[isSpeaking,setIsSpeaking] = useState(false);

    useState(()=>{
        fetchJoke();
    },[]);


    // Fetch the joke from the API
    const fetchJoke =async ()=>{
        const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
        const data = await response.json();
        const newJoke = `${data.setup} ${data.punchline}`;
        setJoke(newJoke);
    }




    return(
        <div>
            <p>{joke}</p>
            <button>Another Joke</button>
            <button>Speak Aloud</button>
        </div>
    );

}

export default JokeDisplay;