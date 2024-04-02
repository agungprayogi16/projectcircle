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
import { useRegister } from "@/features/auth/hooks/useRegister";

export default function Register() {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    form,
    handleChange,
    handleRegister,
    isLoading,
    isError,
    error,
    isRegisterSuccess,
  } = useRegister();

  useEffect(() => {
    if (isRegisterSuccess) {
      navigate("/login");
    }
  }, [isRegisterSuccess]);

  return (
    <>
      <Box
        width={"full"}
        display={"flex"}
        flexDirection={"row"}>
        <Box flex={1}>
          <Fragment>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              height={"100vh"}>
              <Image
                maxW={"400px"}
                rounded={"full"}
                src='./LOGO.png'></Image>
            </Flex>
          </Fragment>
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
                  color={"white"}
                  mb={3}>
                  CIRCLE
                </Heading>
                <Text
                  fontSize={"xl"}
                  mb={3}>
                  Create account Circle
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
                    placeholder='Full Name *'
                    name='fullName'
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <Input
                    type='email'
                    placeholder='Email *'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <InputGroup size='md'>
                    <Input
                      placeholder='Password *'
                      name='password'
                      value={form.password}
                      type={show ? "text" : "password"}
                      onChange={handleChange}
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
                    colorScheme='green.500'
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
                    color={"white"}
                    width={"100%"}
                    mb={3}
                    onClick={handleRegister}>
                    Register
                  </Button>
                )}
                <Text>
                  Already have an account?{" "}
                  <Link
                    style={{
                      color: "green",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    to={"/login"}>
                    Login
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
