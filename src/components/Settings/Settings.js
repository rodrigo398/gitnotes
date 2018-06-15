import React from "react";

import { Link } from "react-router-dom";

const Settings = ({
  synchronizedProjects,
  lastUpdateTime,
  toggleProjectEdition
}) => (
  <div>
    <p>Settings</p>
    <p>{lastUpdateTime}</p>
    {synchronizedProjects && (
      <ul>
        {synchronizedProjects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    )}

    <Link to="/">Go Home</Link>
  </div>
);

export default Settings;
