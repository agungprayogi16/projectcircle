/** @format */

import { Dispatch, SetStateAction } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "react-toastify";
import ImagePreview from "./ImagePreview";
import { API } from "@/utils/api";
import { Box, Button, Flex, Spinner } from "@chakra-ui/react";

interface UploadPropsInterface {
  maxSize: number;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fileUpload: string;
  setFileUpload: Dispatch<SetStateAction<string>>;
  setUploadId: Dispatch<SetStateAction<string>>;
  imageStatus: {
    name: string;
    size: number;
  };
  setImageStatus: Dispatch<
    SetStateAction<{
      name: string;
      size: number;
    }>
  >;
  disabled: boolean;
}

export default function Upload({
  maxSize,
  isLoading,
  setIsLoading,
  fileUpload,
  setFileUpload,
  setUploadId,
  imageStatus,
  setImageStatus,
  disabled,
}: UploadPropsInterface) {
  const handleDrop = async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    const fileAccept = acceptedFiles[0];
    const fileReject = rejectedFiles[0];

    if (fileAccept) {
      setImageStatus({
        name: fileAccept.name,
        size: fileAccept.size,
      });

      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", fileAccept, fileAccept.name);

      API.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
        .then((response) => {
          setFileUpload(response.data.data.url);
          setUploadId(response.data.data.uploadId);
        })
        .catch((error) => {
          setFileUpload("");
          setImageStatus({
            name: "",
            size: 0,
          });

          if (error.response) {
            toast.error(error.response.data.error, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast.error(error.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error(fileReject?.errors[0]?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Dropzone
        maxSize={maxSize}
        onDrop={handleDrop}
        multiple={false}
        disabled={disabled}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drop file di sini atau klik untuk memilih file</p>
          </div>
        )}
      </Dropzone>
      <p>
        {imageStatus.name && imageStatus.size && (
          <>
            {imageStatus.name} - {imageStatus.size} bytes
          </>
        )}
      </p>
      {isLoading ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          mt={"35px"}>
          <Spinner size={"xl"} />
        </Box>
      ) : (
        <>
          {fileUpload && (
            <>
              <ImagePreview imageUrl={fileUpload} />
              <Flex
                justifyContent={"center"}
                mt={2}>
                <Button
                  size={"sm"}
                  colorScheme='red'
                  onClick={() => {
                    setFileUpload("");
                    setImageStatus({
                      name: "",
                      size: 0,
                    });
                  }}>
                  Remove
                </Button>
              </Flex>
            </>
          )}
        </>
      )}
    </>
  );
}
