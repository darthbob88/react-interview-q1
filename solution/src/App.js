import './App.css';
import { getLocations, isNameValid } from "./mock-api/apis";
import React, { useEffect, useState } from "react";

// This really ought to be at least three components
// But I'm not going to that much trouble for a simple test like this.
function App() {

  // people is an array of {name, location}
  const [people, setPeople] = useState([]);

  // This might just be a datalist for freeform input, but I'm going with a select.
  // If the PM wanted otherwise, PM should have said.
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    getLocations().then(result => setLocations(result));
  }, []);

  const blankPerson = { location: "", name: "" };
  const [newPerson, setNewPerson] = useState(blankPerson);
  const [errText, setErrText] = useState("");

  // This really ought to be debounced so we don't hammer the endpoint on every keystroke
  // but :effort:
  useEffect(() => {
    isNameValid(newPerson.name)
      .then((result) => setErrText(result ? "" : "this name has already been taken"))
  }, [newPerson.name])

  const addPerson = (evt) => {
    evt.preventDefault();
    setPeople(prev => [...prev, newPerson]);
    setNewPerson(blankPerson)
  }

  const isValidPerson = newPerson.name !== '' && newPerson.location !== '';

  return (
    <div className="App">
      <form className='personForm' onSubmit={addPerson}>
        <div className='flexSection'>
          <label for="personName">Name</label>
          <div>
            <input type='text' name="personName" value={newPerson.name} onChange={evt => setNewPerson(prev => ({ ...prev, name: evt.target.value }))} />
            <br />
            <span className='validation'>{errText}</span>
          </div>
        </div>

        <br />
        <div className='flexSection'>
          <label for="personLocation">Location</label>
          <select name="personLocation" value={newPerson.location} onChange={evt => setNewPerson(prev => ({ ...prev, location: evt.target.value }))}>
            <option value={""} >Please choose a country</option>
            {locations.map(location => <option value={location} key={location}>{location}</option>)}
          </select>
        </div>
        <div className='buttons'>
          <button type='button' onClick={() => setNewPerson({ location: "", name: "" })}>Clear</button>
          <button type='submit' disabled={!isValidPerson}>Add</button>
        </div>
      </form>

      <div className='peopleList'>
        <table>
          <thead>
            <tr><th>Name</th><th>Location</th></tr>
          </thead>
          <tbody>
            {people.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.location}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
