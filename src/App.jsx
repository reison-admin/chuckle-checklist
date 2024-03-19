import "./App.css"
import stevePic from "./assets/steve.png"
import { useEffect, useState } from "react"
import { getJokes, addJoke } from "./services/jokeService.js";
let toldJokesHTML = "";
let untoldJokesHTML = "";
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
      setAllJokes(jokesArray);
      const toldJokes = jokesArray.filter(({told}) => told === true);
      const untoldJokes = jokesArray.filter(({told}) => told === false);
      setToldJokes(toldJokes);
      setUntoldJokes(untoldJokes);
    })
  }, [allJokes])



const createToldJokesHTML = () => {
  let toldJokesHTML = "";
for (const toldJoke of toldJokes) {
  toldJokesHTML += `<li className="joke-list-item" 
                        data-jokeid=${toldJoke.id}>
                          <p className="joke-list-item-text" 
                          data-jokeid=${toldJoke.id}>
                            ${toldJoke.text}
                          </p>
                    </li>`
                        
}
  return {__html: toldJokesHTML};
}

const createUntoldJokesHTML = () => {
      let untoldJokesHTML = "";
      for (const untoldJoke of untoldJokes) {
        untoldJokesHTML += `<li className="joke-list-item" data-jokeid=${untoldJoke.id}><p className="joke-list-item-text" data-jokeid=${untoldJoke.id}>${untoldJoke.text}</p></li>`
      }
      return {__html: untoldJokesHTML};
    }

// const toggleJokeStatus = (jokeId) => {
//   // Find the joke in the allJokes array
//   const jokeIndex = allJokes.findIndex(joke => joke.id === jokeId);
//   if (jokeIndex !== -1) {
//       // Create a new array with the updated joke
//       const updatedJokes = allJokes.map(joke =>
//         joke.id === jokeId ? { ...joke, told: !joke.told } : joke
//       );
//       // Update the state
//       setAllJokes(updatedJokes);
//       // TODO: Update the database.json file
//   }
//   };
     

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
                
                console.log({allJokes})
                console.log({allJokes})
                console.log(jokeSubmission);
                addJoke(jokeSubmission)}}>Add</button> 
          </div>
          <div className="joke-lists-container">
            <div className="joke-list-container">
                <h2>Told:
                  <span className="told-count">
                    {toldJokes.length}
                  </span>
                </h2>
                <ul className="told-jokes-list" dangerouslySetInnerHTML={createToldJokesHTML()}>
                    
                </ul>
            </div>
            <div className="joke-list-container">
                <h2>Untold:
                  <span className="untold-count">
                  {untoldJokes.length}
                  </span>
                </h2>
                <ul className="untold-jokes-list" dangerouslySetInnerHTML={createUntoldJokesHTML()}>
                </ul>
            </div>

          </div>
      </div>)
}
