import logo from './logo.svg';
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

  const [newPerson, setNewPerson] = useState({ location: "", name: "" });
  const [errText, setErrText] = useState("");
  useEffect(() => {
    isNameValid(newPerson.name)
      .then((result) => setErrText(result ? "" : "this name has already been taken"))
  }, [newPerson.name])

  return (
    <div className="App">
      <form>
        <label>Name
          <input type='text' value={newPerson.name} onChange={evt => setNewPerson(prev => ({ ...prev, name: evt.target.value }))} />
          <br />
          <span className='validation'>{errText}</span>
        </label>
        <br />
        <label>Location
          <select value={newPerson.location} onChange={evt => setNewPerson(prev => ({ ...prev, location: evt.target.value }))}>
            {locations.map(location => <option value={location} key={location}>{location}</option>)}
          </select>
        </label>
      </form>
    </div>
  );
}

export default App;
