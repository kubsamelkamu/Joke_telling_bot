import { useCallback, useEffect, useState } from "react";

function JokeDisplay(){
    const[joke,setJoke] = useState('');
    const[isSpeaking,setIsSpeaking] = useState(false);
    const[isLoading,setIsLoading] = useState();
    const[showBox,setShowBox] = useState(false);

    // Fetch the joke from the API
    const fetchJoke =useCallback(async()=>{

        try {
            const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
            const data = await response.json();
            const newJoke = `${data.setup} ${data.punchline}`;
            setJoke(newJoke);

            if (isSpeaking) {
                SpeakText(newJoke);
            }
        } catch (error) {
            console.error('Error fetching' + error.message);
        }

        

       
    },[isSpeaking]);

    
    useEffect(()=>{
        fetchJoke();
    },[fetchJoke])

    // Add Keyboard event Listenner
    useEffect(()=>{
        // shortcut for displaying joke text and speaking text
        const handleKeyDown = (event)=>{
            if (event.key === 'J' || event.key === 'j') {
                fetchJoke();
            }else if (event.key==='s' || event.key === 'S') {
                SpeakText(joke);
            }
        };
        

        window.addEventListener('keydown', handleKeyDown);

        //clean up the event listener
        return(()=>{
            window.removeEventListener('keydown', handleKeyDown);
        })
    },[fetchJoke,joke])

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