import React from "react";
import { Link } from "react-router-dom";
import Switch from "../Switch";

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
          <li key={project.id}>
            <p>
              {project.name} {project.enabled ? `[enabled]` : `[disabled]`}
            </p>
            <Switch
              id={project.id}
              enabled={project.enabled}
              toggle={toggleProjectEdition}
            />
          </li>
        ))}
      </ul>
    )}
    <Link to="/">Go Home</Link>
  </div>
);

export default Settings;
