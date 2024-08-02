import { useCallback, useEffect, useState } from "react";

function JokeDisplay(){
    const[joke,setJoke] = useState('');
    const[isSpeaking,setIsSpeaking] = useState(false);

    useEffect(()=>{
        fetchJoke();
    },[])
    // Fetch the joke from the API
    const fetchJoke =useCallback(async()=>{
        const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
        const data = await response.json();
        const newJoke = `${data.setup} ${data.punchline}`;
        setJoke(newJoke);

        if (isSpeaking) {
            SpeakText(newJoke);
        }
    },[isSpeaking]);

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


function SpeakText(text){
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();  
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }else{
        alert('speechSynthesis not supported in this browser');
    }
}

export default JokeDisplay;