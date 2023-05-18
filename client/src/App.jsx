// import logo from "./logo.svg";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routerConfig } from "./Navigation/config";
import { ProvideAuth } from "./custom/useAuth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ProvideAuth>
        <RouterProvider router={routerConfig} />
        <ToastContainer />
      </ProvideAuth>
    </div>
  );
}

export default App;
