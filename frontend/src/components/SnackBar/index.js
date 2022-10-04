import React, { useEffect } from "react";

const SnackBar = ({ message, setMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, []);

  return <>{message && <div className="snack-bar"> {message}</div>}</>;
};

export default SnackBar;
