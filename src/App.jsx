import "./App.css"
import stevePic from "./assets/steve.png"
import { useEffect, useState } from "react"
import { getJokes, addJoke, toggleJokeTold } from "./services/jokeService.js";
export const App = () => {
  const [allJokes, setAllJokes] = useState([]);
  const [inputValue, setJokeInput] = useState("");
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  let newSubmission = false;

  useEffect(() => {
    getJokes().then(jokesArray => {
      setAllJokes(jokesArray);
      const toldJokes = jokesArray.filter(({told}) => told === true);
      const untoldJokes = jokesArray.filter(({told}) => told === false);
      setToldJokes(toldJokes);
      setUntoldJokes(untoldJokes);
    })
  }, [])

  useEffect(() => {
    getJokes().then(jokesArray => {
      // setAllJokes(jokesArray);
      const toldJokes = jokesArray.filter(({told}) => told === true);
      const untoldJokes = jokesArray.filter(({told}) => told === false);
      setToldJokes(toldJokes);
      setUntoldJokes(untoldJokes);
    })
  }, [allJokes])



const ToldJokesList = () => {
    //build HTML told joke items with toggle button
  return (
     <ul className="told-jokes-list">
       {toldJokes.map(joke => (
         <li key={joke.id} className="joke-list-item">
           <p className="joke-list-item-text">{joke.text}</p>
           <button onClick={() => toggleJokeStatus(joke.id)}>Toggle</button>
         </li>
       ))}
     </ul>
  );
 };
 
 const UntoldJokesList = () => {
  //build HTML untold joke items with toggle button
  return (
     <ul className="untold-jokes-list">
       {untoldJokes.map(joke => (
         <li key={joke.id} className="joke-list-item">
           <p className="joke-list-item-text">{joke.text}</p>
           <button onClick={() => toggleJokeStatus(joke.id)}>Toggle</button>
         </li>
       ))}
     </ul>
  );
 };
 
   

const toggleJokeStatus = (jokeId) => {
  // Find the joke in the allJokes array
  const jokeIndex = allJokes.findIndex(joke => joke.id === jokeId);
  if (jokeIndex !== -1) {
      // Create a new array with the updated joke
      const updatedJokes = allJokes.map(joke =>
        joke.id === jokeId ? { ...joke, told: !joke.told } : joke
      );
      // Update the database.json file
      toggleJokeTold(updatedJokes[jokeIndex])
      console.log(updatedJokes[jokeIndex])
      // Update the state
      setAllJokes(updatedJokes);
  }
  };
     

return (<div className="app-container">

          <div className="app-heading">
              <div className="app-heading-circle">
                <img className="app-logo" src={stevePic} alt="Good job Steve" />
              </div>
              <h1 className="app-heading-text">Chuckle Checklist</h1>
          </div>
          <h2>Add Joke</h2>
          <div className="joke-add-form">
            <input
              className="joke-input"
              name="jokeField"
              type="text"
              placeholder="New One Liner"
              value={inputValue}
              onChange={(event) => {
                setJokeInput(event.target.value)
              }}/>
              <button className="joke-input-submit" onClick={() => {
                newSubmission = true;
                let jokesState = ({allJokes})
                let jokeId = (jokesState.allJokes.length+1)
                const jokeSubmission = {
                  "id": jokeId,
                  "text": inputValue,
                  "told": false
                };
                setJokeInput("");
                addJoke(jokeSubmission)}}>Add</button> 
          </div>
          <div className="joke-lists-container">
            <div className="joke-list-container">
              <h2>Told:
                <span className="told-count">{toldJokes.length}</span>
              </h2>
              <ToldJokesList />
            </div>
            <div className="joke-list-container">
              <h2>Untold:
                <span className="untold-count">{untoldJokes.length}</span>
              </h2>
              <UntoldJokesList />
            </div>
          </div>
      </div>)
}
