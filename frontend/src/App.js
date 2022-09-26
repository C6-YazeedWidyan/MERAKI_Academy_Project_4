import "./App.css";
import Router from "./router";
import { createContext, useState } from "react";
export const appContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <appContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Router />
      </div>
    </appContext.Provider>
  );
}

export default App;
