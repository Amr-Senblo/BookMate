// import logo from "./logo.svg";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routerConfig } from "./Navigation/config";
import { MainSpaceProvider } from "./contexts/MainSpaceContext";

function App() {
  return (
    <div>
      <MainSpaceProvider>
        <RouterProvider router={routerConfig} />
      </MainSpaceProvider>
    </div>
  );
}

export default App;
