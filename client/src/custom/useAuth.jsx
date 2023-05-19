import { useEffect } from "react";
import { useContext, useState } from "react";
import { authContext } from "../contexts/authContext";
import { getCookies, setCookies } from "./useCookies";
import axios from "axios";

const baseUrl = "http://localhost:6969/api/v1/user/";

export const useAuth = () => {
  return useContext(authContext);
};

export const defaultUser = {
  status: "failed",
  token: "",
  user: null,
};

function useProvideAuth(params) {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(false);
  const token = getCookies("token");

  const useLogin = async (payload) => {
    // console.log("payload", payload);
    const loginUrl = "login";
    try {
      setLoading(true);
      const response = await axios.post(baseUrl + loginUrl, payload);
      // console.log("response", response);
      setCookies("token", response.data.token, 42);
      console.log("user data: ", response.data);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setUser(error.response.data);
      setLoading(false);
    }
  };

  const useSignup = async (payload) => {
    console.log("payload", payload);
    const signupUrl = "signup";
    try {
      setLoading(true);
      const response = await axios.post(baseUrl + signupUrl, payload);
      // console.log("medhat", response.data.data.newUser);
      console.log("response.data", response.data);
      setUser(response.data);
      // console.log(user);

      // console.log(response.data);
      setCookies("token", response.data.token, 42);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setUser(error.response.data);
      setLoading(false);
    }
  };

  const useForgetPassword = async (payload) => {
    // console.log("payload", payload);
    try {
      setLoading(true);
      setCookies("token", "", 42);
      const forgetPasswordUrl = "forgetPassword";
      const response = await axios.get(baseUrl + forgetPasswordUrl, payload);
      setUser({ ...response.data, isConfirmedReset: true });
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setUser({ ...error.response.data, isConfirmedReset: false });
      setLoading(false);
    }
  };

  function useLogout() {
    setLoading(true);
    setCookies("token", "", 1);
    setUser(defaultUser);
    setLoading(false);
  }

  useEffect(() => {
    const getUser = () => {
      // const getUserUrl = "GetUser";
      axios
        .get(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser({ ...response.data, token });
          // console.log(response.data);
        })
        .catch((error) => {
          setCookies("token", "", 42);
          console.log(defaultUser);
          setUser(defaultUser);
        });
    };
    token && getUser();
  }, []);

  return {
    useSignup,
    useLogin,
    useForgetPassword,
    useLogout,
    user,
    setUser,
    loading,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
