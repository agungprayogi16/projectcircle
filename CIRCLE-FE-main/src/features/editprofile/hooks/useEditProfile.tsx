/** @format */

import { useState, ChangeEvent, useEffect } from "react";
import { EditProfileType } from "@/types";
import { API } from "@/utils/api";
import { toast } from "react-toastify";
import getError from "@/utils/getError";
import { useAppSelector } from "@/redux/store";

export function useEditProfile() {
  const profile = useAppSelector((state) => state.profile);
  const [form, setForm] = useState<EditProfileType>({
    fullName: "",
    userName: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isEditProfileSuccess, setIsEditProfileSuccess] =
    useState<boolean>(false);

  useEffect(() => {
    setForm({
      fullName: profile.data?.fullname || "",
      userName: profile.data?.username || "",
      bio: profile.data?.bio || "",
    });
  }, [profile]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleEditProfile(image: string, uplaodId: string) {
    try {
      setIsLoading(true);

      if (image) {
        form.profilePicture = image;
        form.uploadId = uplaodId;
      }

      const response = await API.put("/user/profile", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
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
      setIsError(false);
      setError("");
      setIsEditProfileSuccess(true);
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
    handleEditProfile,
    isLoading,
    isError,
    error,
    isEditProfileSuccess,
  };
}
