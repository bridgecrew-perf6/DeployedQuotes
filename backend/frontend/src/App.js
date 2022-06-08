import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
const App = () => {
  const MyRoutes = useRoutes(routes);
  return (
    <>
      <ToastContainer />
      <Navbar />
      {MyRoutes}
    </>
  );
};

export default App;
