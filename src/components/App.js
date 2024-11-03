import React, { useState } from 'react';
import hogsData from '../porkers_data';
import Nav from './Nav';

const App = () => {
  const [hogs, setHogs] = useState(hogsData);
  const [showGreased, setShowGreased] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('');
  const [newHog, setNewHog] = useState({ name: '', specialty: '', greased: false, weight: 0, 'highest medal achieved': '', image: '' });
  const [selectedHog, setSelectedHog] = useState(null);

  const filteredHogs = hogs
    .filter(hog => !showGreased || hog.greased)
    .sort((a, b) => sortCriteria === 'name' ? a.name.localeCompare(b.name) : sortCriteria === 'weight' ? a.weight - b.weight : 0);

  const handleToggleGreased = () => setShowGreased(prev => !prev);
  const handleSortChange = criteria => setSortCriteria(criteria);
  const handleInputChange = ({ target: { name, value, type, checked } }) => setNewHog(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  const handleAddHog = e => {
    e.preventDefault();
    setHogs(prev => [...prev, newHog]);
    setNewHog({ name: '', specialty: '', greased: false, weight: 0, 'highest medal achieved': '', image: '' });
  };
  const handleHogClick = hog => setSelectedHog(selectedHog === hog ? null : hog);

  return (
    <div className="ui container">
      <h1>Hogs</h1>
      <Nav toggleGreased={handleToggleGreased} sortHogs={handleSortChange} />
      <div className="ui grid container">
        {filteredHogs.map(hog => (
          <div key={hog.name} className="ui eight wide column" onClick={() => handleHogClick(hog)}>
            <div className="ui card">
              <div className="image">
                <img src={hog.image} alt={hog.name} />
              </div>
              <div className="content">
                <h3>{hog.name}</h3>
                {selectedHog === hog && (
                  <div>
                    <p>Specialty: {hog.specialty}</p>
                    <p>Weight: {hog.weight} kg</p>
                    <p>Greased: {hog.greased ? 'Yes' : 'No'}</p>
                    <p>Medal: {hog['highest medal achieved']}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleAddHog}>
        <h2>Add a New Hog</h2>
        {['name', 'specialty', 'weight', 'image', 'highest medal achieved'].map(field => (
          <input key={field} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={newHog[field]} onChange={handleInputChange} required />
        ))}
        <label>
          Greased:
          <input type="checkbox" name="greased" checked={newHog.greased} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Hog</button>
      </form>
    </div>
  );
};

export default App;
