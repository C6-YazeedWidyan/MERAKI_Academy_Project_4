import "./App.css";
import Router from "./router";
import { AuthContext } from "./contexts/AuthContext";
import { useContext,  } from "react";
import SnackBar from "./components/SnackBar";

function App() {
  const { loading, errorMessage, setErrorMessage } = useContext(AuthContext);
  return (
    <>
      <div className="App">
        {loading && (
          <div className="overlay">
            <div className="overlay-inner">
              <div className="overlay-content">
                <span className="spinner"></span>
              </div>
            </div>
          </div>
        )}
        <Router />
      </div>
      {errorMessage && (
        <SnackBar message={errorMessage} setMessage={setErrorMessage} />
      )}
    </>
  );
}

export default App;
