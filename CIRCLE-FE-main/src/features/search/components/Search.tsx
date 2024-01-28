import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { useSearch } from "../hooks/useSearch";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SearchUserType } from "@/types";
import { BiBlock } from "react-icons/bi";

export default function Search() {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const [pageNumber, setPageNumber] = useState<number>(
    parseInt(queryParams.get("page") || "0", 10)
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    queryParams.get("search") || ""
  );
  const [goRefetch, setGoRefetch] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    error,
    data: users,
    refetch,
  } = useSearch(pageNumber, searchQuery);

  useEffect(() => {
    setPageNumber(parseInt(queryParams.get("page") || "1", 10));
    setSearchQuery(queryParams.get("search") || "");

    const timeout = setTimeout(() => {
      setGoRefetch(!goRefetch);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [queryParams]);

  useEffect(() => {
    refetch();
  }, [goRefetch]);

  const applyFilter = (page: number) => {
    let url = "/search?";
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    if (page) {
      url += `&page=${page}`;
    }

    navigate(url);
  };

  return (
    <Fragment>
      <Box flex={1} px={5} py={10} overflow={"auto"} className="hide-scroll">
        <Text fontSize={"2xl"} mb={"10px"}>
          Search User
        </Text>

        <Flex gap={2} mb={"20px"}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"20px"}>
              <RiUserSearchLine />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Username or Fullname"
              borderRadius={"full"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Button
            colorScheme="green"
            borderRadius={"full"}
            onClick={() => applyFilter(1)}
          >
            <ImSearch />
          </Button>
        </Flex>

        <Card bg={"#3a3a3a"} color={"white"} mb={"15px"}>
          <CardBody py={2} px={5}>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {isError ? (
                  <Alert status="error" bg={"#FF6969"} borderRadius={5}>
                    <AlertIcon color={"white"} />
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                ) : (
                  <>
                    {!users.data.length ? (
                      <Text fontSize={"lmd"}>No Data Dound</Text>
                    ) : (
                      <>
                        {users.data.map(
                          (user: SearchUserType, index: number) => (
                            <Flex
                              display={{ base: "block", sm: "flex" }}
                              key={index}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              my={5}
                            >
                              <Flex
                                gap={2}
                                alignItems={"center"}
                                mb={{ base: 3, sm: 0 }}
                              >
                                <Text>
                                  <Image
                                    borderRadius="full"
                                    boxSize="45px"
                                    objectFit="cover"
                                    src={user.profile_picture}
                                    alt={user.fullname}
                                  />
                                </Text>
                                <Box>
                                  <Text fontSize={"sm"}>{user.fullname}</Text>
                                  <Text fontSize={"sm"} color={"gray.400"}>
                                    @{user.username}
                                  </Text>
                                </Box>
                              </Flex>
                              <Text>
                                <Link to={`/profile/${user.id}`}>
                                  <Button
                                    color={"white"}
                                    _hover={{
                                      bg: "#38a169",
                                      borderColor: "#38a169",
                                    }}
                                    size="sm"
                                    borderRadius={"full"}
                                    variant="outline"
                                  >
                                    Visit Profile
                                  </Button>
                                </Link>
                              </Text>
                            </Flex>
                          )
                        )}
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          gap={3}
                          mb={3}
                        >
                          {pageNumber <= 1 ? (
                            <Button colorScheme="green" size="sm">
                              <BiBlock
                                style={{ marginRight: "5px", fontSize: "16px" }}
                              />
                              Prev
                            </Button>
                          ) : (
                            <Button
                              colorScheme="green"
                              size="sm"
                              onClick={() => applyFilter(pageNumber - 1)}
                            >
                              Prev
                            </Button>
                          )}

                          {pageNumber >= users.totalPage ? (
                            <Button colorScheme="green" size="sm">
                              <BiBlock
                                style={{ marginRight: "5px", fontSize: "16px" }}
                              />
                              Next
                            </Button>
                          ) : (
                            <Button
                              colorScheme="green"
                              size="sm"
                              onClick={() => applyFilter(pageNumber + 1)}
                            >
                              Next
                            </Button>
                          )}
                        </Box>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </Box>
    </Fragment>
  );
}
