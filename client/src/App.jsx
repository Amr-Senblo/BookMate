// import logo from "./logo.svg";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routerConfig } from "./Navigation/config";
import { ProvideAuth } from "./custom/useAuth";

function App() {
  return (
    <div>
      <ProvideAuth>
        <RouterProvider router={routerConfig} />
      </ProvideAuth>
    </div>
  );
}

export default App;
