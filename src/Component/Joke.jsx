import { useCallback, useEffect, useState } from "react";
import './JokeDisplay.css';

function JokeDisplay(){
    const[joke,setJoke] = useState('');
    const[isSpeaking,setIsSpeaking] = useState(false);
    const[isLoading,setIsLoading] = useState();
    const[showJokeBox,setShowJokeBox] = useState(false);

    // Fetch the joke from the API
    const fetchJoke =useCallback(async()=>{
        setIsLoading(true);
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
        }finally{
            setIsLoading(false);
        }
  
    },[isSpeaking]);

    
    useEffect(()=>{
        if(showJokeBox){
            fetchJoke();
        }
    },[showJokeBox,fetchJoke])

    // Add Keyboard event Listenner
    useEffect(()=>{
        // shortcut for displaying joke text and speaking text
        const handleKeyDown = (event)=>{
            if (event.key === 'J' || event.key === 'j') {
                fetchJoke();
            }else if (event.key==='s' || event.key === 'S') {
                SpeakText(joke);
                setIsSpeaking(!isSpeaking);
            }else if(event.key==='m' || event.key === 'M') {
                setIsSpeaking(isSpeaking);
            }
        };
        

        window.addEventListener('keydown', handleKeyDown);

        //clean up the event listener
        return(()=>{
            window.removeEventListener('keydown', handleKeyDown);
        })
    },[fetchJoke,joke,isSpeaking])

    const toggleSpeech =()=>{
        setIsSpeaking(!isSpeaking);
    }

    return(
        <div className="container">
            {!showJokeBox?(
                <div className="welcome-box">
                    <h3>Welcome to this Joke Bot!</h3>
                    <div className="avatar"></div>
                    <p>press j/J to see jokes , s/S to make the bot read it or m/M for mute</p>
                    <p>press the button below to Experience Joke</p>
                    <button onClick={()=>setShowJokeBox(true)} className="btn start-btn">Start Joke</button>
                </div>
            ):(
                <div className="joke-box">
                    {isLoading?(
                        <p className="loading">Loading...</p>
                    ):(
                        <p className="joke-text">{joke}</p>
                    )}

                    <div className="button-group">
                        <button onClick={fetchJoke} className="btn" disabled={isLoading}>
                            Get Another Joke
                        </button>
                        <button onClick={toggleSpeech} className="btn">
                          {isSpeaking?'Stop Speeking':'speak Aloud'}
                        </button>
                    </div>

                </div>
                
            )}
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