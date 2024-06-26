/** @format */

import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/features/auth/hooks/useLogin";

export default function Login() {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    form,
    handleChange,
    handleLogin,
    isLoading,
    isError,
    error,
    isLoginSuccess,
  } = useLogin();

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/");
    }
  }, [isLoginSuccess]);

  return (
    <>
      <Box
        width={"full"}
        display={"flex"}
        flexDirection={"row"}>
        <Box flex={1}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            height={"100vh"}>
            <Image
              maxW={"400px"}
              rounded={"full"}
              src='./LOGO.png'></Image>
          </Flex>
        </Box>
        <Box flex={1}>
          <Fragment>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              height={"100vh"}>
              <Box
                width={"100%"}
                maxWidth={"450px"}
                p={4}
                color={"white"}>
                <Heading
                  as='h2'
                  size='3xl'
                  noOfLines={1}
                  color={"bclack"}
                  mb={3}>
                  CIRCLE
                </Heading>
                <Text
                  fontSize={"xl"}
                  mb={3}>
                  Login to Circle
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
                <FormControl mb={4}>
                  <Input
                    type='text'
                    placeholder='Email/Username *'
                    name='emailOrUsername'
                    value={form.emailOrUsername}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <InputGroup size='md'>
                    <Input
                      placeholder='Password *'
                      name='password'
                      value={form.password}
                      onChange={handleChange}
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() => setShow(!show)}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {isLoading ? (
                  <Button
                    isLoading
                    colorScheme='green'
                    variant='solid'
                    borderRadius={"full"}
                    width={"100%"}
                    mb={3}>
                    Loading
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    borderRadius={"full"}
                    backgroundColor='black'
                    width={"100%"}
                    color={"white"}
                    mb={3}
                    onClick={handleLogin}>
                    Login
                  </Button>
                )}
                <Text>
                  Have no account yet?{" "}
                  <Link
                    style={{ color: "#48bb78" }}
                    to={"/register"}>
                    Register
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Fragment>
        </Box>
      </Box>
    </>
  );
}
