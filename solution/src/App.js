import './App.css';
import { getLocations, isNameValid } from "./mock-api/apis";
import React, { useEffect, useState } from "react";

// This really ought to be at least three components
// But I'm not going to that much trouble for a simple test like this.
function App() {

  // people is an array of {name, location}
  const [people, setPeople] = useState([]);

  // This might just be a datalist for freeform input, but I'm going with a select.
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    getLocations().then(result => setLocations(result));
  }, []);

  const blankPerson = { location: "", name: "" };
  const [newPerson, setNewPerson] = useState(blankPerson);
  const [errText, setErrText] = useState("");
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
      <form onSubmit={addPerson}>
        <label>Name
          <input type='text' value={newPerson.name} onChange={evt => setNewPerson(prev => ({ ...prev, name: evt.target.value }))} />
          <br />
          <span className='validation'>{errText}</span>
        </label>
        <br />
        <label>Location
          <select value={newPerson.location} onChange={evt => setNewPerson(prev => ({ ...prev, location: evt.target.value }))}>
            <option value={""} >Please choose a country</option>
            {locations.map(location => <option value={location} key={location}>{location}</option>)}
          </select>
        </label>
        <br />
        <button type='button' onClick={() => setNewPerson({ location: "", name: "" })}>Clear</button>
        <button type='submit' disabled={!isValidPerson}>Add</button>
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
