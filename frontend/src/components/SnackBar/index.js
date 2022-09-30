import React, { useEffect } from "react";

const SnackBar = ({ message, setMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2500);
  }, []);

  return <>{message && <div className="snack-bar"> {message}</div>}</>;
};

export default SnackBar;
