import { useEffect, useState } from "react";

function JokeDisplay(){
    const[joke,setJoke] = useState('');
    const[isSpeaking,setIsSpeaking] = useState(false);

    useEffect(()=>{
        fetchJoke();
    },[])
    // Fetch the joke from the API
    const fetchJoke =async ()=>{
        const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
        const data = await response.json();
        const newJoke = `${data.setup} ${data.punchline}`;
        setJoke(newJoke);
    }

    const toggleSpeech =()=>{
        setIsSpeaking(!isSpeaking);
    }

    return(
        <div>
            <p>{joke}</p>
            <button onClick={fetchJoke}>Another Joke</button>
            <button onClick={toggleSpeech}>
             {isSpeaking?'Stop Speaking':'Speak Aloud'}
            </button>
        </div>
    );

}


function SpeakText(){
    
}

export default JokeDisplay;