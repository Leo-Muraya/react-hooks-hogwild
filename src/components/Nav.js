import React from 'react';

const Nav = ({ toggleGreased, sortHogs }) => (
  <div className="ui menu">
    <div className="item">
      <label>
        <input type="checkbox" onChange={toggleGreased} />
        Show Greased
      </label>
    </div>
    <div className="item">
      <select onChange={(e) => sortHogs(e.target.value)} defaultValue="">
        <option value="" disabled>Sort By</option>
        <option value="name">Name</option>
        <option value="weight">Weight</option>
      </select>
    </div>
  </div>
);

export default Nav;
