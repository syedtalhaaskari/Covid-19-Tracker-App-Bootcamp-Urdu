import React, {useState} from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import InfoPanel from "./components/InfoPanel";
import FootNav from "./components/FootNav";
import ContextAPI from "./ContextAPI";

function App() {
  const screenConfig = useState(0);
  let country = useState("");

  return (
    <ContextAPI.Provider value={country}>
    <div className="App">
      <NavBar changeScreen={screenConfig}/>
      <InfoPanel currentScreen={screenConfig[0]}/>
      <FootNav screenConfig={screenConfig}/>
    </div>
    </ContextAPI.Provider>
  );
}

export default App;
