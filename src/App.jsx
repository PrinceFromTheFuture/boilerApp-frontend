import "./App.css";
import { useEffect, useState } from "react";

import Switch from "./components/Switch";

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://boiler-app-api.onrender.com/users",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setState(json);
    };
    fetchData();
  }, []);
  async function handleChange(index, name, newState) {
    const newObject = [...state];
    newObject[index] = {
      ...newObject[index],
      isActive: newState,
    };
    setState(newObject);
    const response = await fetch(
      "https://boiler-app-api.onrender.com/update-user-state",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          isActive: newState,
        }),
        headers: {
          "Content-Type": "application/json", // Make sure to set the content type
        },
      }
    );
    const json = await response.json();
    console.log(json);
  }
  return (
    <div className="main-body">
      <div className="header">
        <div className="header-content">
          <div className="head-title">?!מי הדליק את הבוילר</div>
          <div>
            כאן תוכלו לדעת בוודאות מי הדליק את הבוילר בבית משפחת וויסבלאי היקרה
          </div>
        </div>
      </div>
      <div className="content">
        <div className="switches-wraper">
          {state &&
            state.map((item, index) => {
              return (
                <div className="single-switch">
                  <Switch
                    key={item._id}
                    handleChange={handleChange}
                    isActive={item.isActive}
                    index={index}
                    name={item.name}
                  />
                  <div className="name-tag">{item.name}</div>
                </div>
              );
            })}
        </div>
        <img className="img" src="/public/img.png" alt="" />
      </div>
    </div>
  );
}

export default App;
