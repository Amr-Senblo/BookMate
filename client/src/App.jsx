// import logo from "./logo.svg";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routerConfig } from "./Navigation/config";

function App() {
  return (
    <div>
      <RouterProvider router={routerConfig} />
    </div>
  );
}

export default App;
