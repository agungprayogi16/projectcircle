import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Flex, Heading } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Fragment>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width={"100vw"}
        height={"100vh"}
        flexDirection={"column"}
        color={"white"}
      >
        <Heading as="h2" size="3xl" mb={"35px"} textAlign={"center"}>
          404 Page Not Found
        </Heading>
        <Link to="/">
          <Button colorScheme="green">Back To Home</Button>
        </Link>
      </Flex>
    </Fragment>
  );
}
