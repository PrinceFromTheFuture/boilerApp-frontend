import "./Switch.css";
import { useState } from "react";

function Switch({ handleChange, isActive, index, name }) {
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(event) => handleChange(index, name, event.target.checked)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Switch;
