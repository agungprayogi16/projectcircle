/** @format */

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useEditProfile } from "../hooks/useEditProfile";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProfile } from "@/redux/user/profileSlice";
import Upload from "@/components/Upload";

export default function EditProfile() {
  const profile = useAppSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    form,
    handleChange,
    handleEditProfile,
    isLoading,
    isError,
    error,
    isEditProfileSuccess,
  } = useEditProfile();

  const [image, setImage] = useState<string>("");
  const [uploadId, setUploadId] = useState<string>("");

  const [imageStatus, setImageStatus] = useState<{
    name: string;
    size: number;
  }>({
    name: "",
    size: 0,
  });
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEditProfileSuccess) {
      dispatch(getProfile());
      navigate("/my-profile/" + profile.data?.id);
    }
  }, [isEditProfileSuccess]);

  return (
    <Fragment>
      <Box
        flex={1}
        px={5}
        py={10}
        overflow={"auto"}
        className='hide-scroll'>
        <Card
          bg={"#3a3a3a"}
          color={"white"}
          mb={"15px"}
          px={"25px"}
          py={"30px"}>
          <CardBody
            py={4}
            px={5}>
            <Text
              fontSize={"2xl"}
              mb={"18px"}>
              Edit Profile Data
            </Text>
            {isError && (
              <Alert
                status='error'
                bg={"#FF6969"}
                mb={3}
                borderRadius={5}>
                <AlertIcon color={"white"} />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <FormControl mb={"20px"}>
              <Input
                type='fullName'
                placeholder='Type Full Name'
                bg={"#f8f9fb"}
                color={"black"}
                border={"none"}
                name='fullName'
                onChange={handleChange}
                value={form.fullName}
              />
            </FormControl>
            <FormControl mb={"20px"}>
              <Input
                type='userName'
                placeholder='Type User Name'
                bg={"#f8f9fb"}
                color={"black"}
                border={"none"}
                name='userName'
                onChange={handleChange}
                value={form.userName}
              />
            </FormControl>
            <FormControl mb={"20px"}>
              <Input
                type='bio'
                placeholder='Type Bio'
                bg={"#f8f9fb"}
                color={"black"}
                border={"none"}
                name='bio'
                onChange={handleChange}
                value={form.bio}
              />
            </FormControl>
            <FormControl mb={"20px"}>
              <Upload
                maxSize={2000000}
                isLoading={isUploadLoading}
                setIsLoading={setIsUploadLoading}
                fileUpload={image}
                setFileUpload={setImage}
                imageStatus={imageStatus}
                setImageStatus={setImageStatus}
                disabled={isUploadLoading}
                setUploadId={setUploadId}
              />
            </FormControl>
            <Flex justifyContent={"end"}>
              {isLoading || isUploadLoading ? (
                <Button
                  isLoading
                  colorScheme='green'
                  variant='solid'
                  borderRadius={"full"}
                  mb={3}>
                  Loading
                </Button>
              ) : (
                <Button
                  type='submit'
                  borderRadius={"full"}
                  colorScheme='green'
                  mb={3}
                  onClick={() => handleEditProfile(image, uploadId)}>
                  Edit Profile
                </Button>
              )}
            </Flex>
          </CardBody>
        </Card>
      </Box>
    </Fragment>
  );
}
