/** @format */

import { useState, ChangeEvent } from "react";
import { LoginType } from "@/types";
import { API } from "@/utils/api";
import { toast } from "react-toastify";
import getError from "@/utils/getError";

export function useLogin() {
  const [form, setForm] = useState<LoginType>({
    emailOrUsername: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      setIsLoading(true);

      const response = await API.post("/login", form);
      console.log(response);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("jwtToken", response.data.token);

      setIsError(false);
      setError("");
      setIsLoginSuccess(true);
    } catch (error) {
      setIsError(true);
      setError(getError(error));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    handleChange,
    handleLogin,
    isLoading,
    isError,
    error,
    isLoginSuccess,
  };
}
