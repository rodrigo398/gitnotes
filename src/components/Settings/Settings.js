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
          <li onClick={() => toggleProjectEdition(project.id)} key={project.id}>
            {project.name} {project.enabled ? `[enabled]` : `[disabled]`}
          </li>
        ))}
      </ul>
    )}

    <Link to="/">Go Home</Link>
  </div>
);

export default Settings;
