import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { getCookies, setCookies } from "./useCookies";
import axios from "axios";

export const defaultUser = {
  isSuccess: false,
  token: "",
  errorMessages: [],
  user: null,
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = getCookies("token");

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:6969/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setUser(defaultUser);
        setCookies("token", "", 0);
        setLoading(false);
      }
    };
    token && getUser();
  }, [token]);

  const useLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = axios.post("http://localhost:6969/api/v1/login", {
        email,
        password,
      });
      setCookies("token", response.data.token, 42);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const useRegister = async (email, password) => {
    try {
      setLoading(true);
      const response = axios.post("http://localhost:6969/api/v1/register", {
        email,
        password,
      });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const useLogout = async () => {
    try {
      setLoading(true);
      const response = axios.post("http://localhost:6969/api/v1/logout");
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return { user, loading, useLogin, useRegister, useLogout };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
