/** @format */

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getDetailUser } from "@/redux/user/detailUserSlice";
import { getProfile } from "@/redux/user/profileSlice";
import { API } from "@/utils/api";
import getError from "@/utils/getError";
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
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const {
    data: detailUser,
    isLoading,
    isError,
    error,
  } = useAppSelector((state) => state.detailUser);
  const { data: profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getDetailUser(params.userId || ""));
  }, [params]);

  console.log(params.userId);

  const followAndUnfollow = async () => {
    try {
      await API.post("/follow/" + params.userId, "", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      dispatch(getDetailUser(params.userId || ""));
      dispatch(getProfile());
    } catch (error) {
      toast.error(getError(error), {
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

  console.log(detailUser);

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
          mb={"15px"}>
          <CardBody
            py={4}
            px={5}>
            <Text
              fontSize={"2xl"}
              mb={"10px"}>
              Profile Feature 
            </Text>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {isError ? (
                  <Alert
                    status='error'
                    bg={"#FF6969"}
                    mb={3}
                    borderRadius={5}>
                    <AlertIcon color={"white"} />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <Box position={"relative"}>
                      <Image
                        src='https://assets-global.website-files.com/5a9ee6416e90d20001b20038/635ab99b5920d1d2c6e04397_horizontal%20(66).svg'
                        alt='Green Gradient'
                        borderRadius={"10px"}
                        width={"100%"}
                        height={"80px"}
                        objectFit={"cover"}
                      />
                      <Image
                        borderRadius='full'
                        bgColor={"#3a3a3a"}
                        border={"5px solid #3a3a3a"}
                        boxSize='75px'
                        objectFit='cover'
                        src={detailUser?.profile_picture}
                        alt={detailUser?.fullname}
                        position={"absolute"}
                        top={"40px"}
                        left={"20px"}
                      />
                      {profile?.id === detailUser?.id && (
                        <Link to={`/edit-profile`}>
                          <Button
                            color={"white"}
                            _hover={{ bg: "#38a169", borderColor: "#38a169" }}
                            size='sm'
                            borderRadius={"full"}
                            variant='outline'
                            position={"absolute"}
                            bottom={"-50px"}
                            right={"0px"}>
                            <Text fontSize={"lg"}>
                              <FiEdit3 />
                            </Text>
                          </Button>
                        </Link>
                      )}

                      {profile?.id !== detailUser?.id && (
                        <>
                          <Button
                            color={"white"}
                            _hover={{ bg: "#38a169", borderColor: "#38a169" }}
                            size='sm'
                            borderRadius={"full"}
                            variant='outline'
                            position={"absolute"}
                            bottom={"-50px"}
                            right={"0px"}
                            onClick={followAndUnfollow}>
                            {detailUser?.followers
                              .map((follower) => follower.id)
                              .includes(profile?.id || "")
                              ? "Unfollow"
                              : "Follow"}
                          </Button>
                        </>
                      )}
                    </Box>
                    <Text
                      fontSize={"2xl"}
                      mt={"40px"}
                      fontWeight={"bold"}>
                      {detailUser?.fullname}
                    </Text>
                    <Text
                      fontSize={"sm"}
                      color={"gray.400"}>
                      @{detailUser?.username}
                    </Text>
                    <Text
                      fontSize={"md"}
                      mt={1}>
                      {detailUser?.bio}
                    </Text>
                    <Flex
                      mt={"10px"}
                      gap={3}
                      mb={5}>
                      <Box fontSize={"md"}>
                        {detailUser?.followers.length}{" "}
                        <Text
                          display={"inline"}
                          color={"gray.400"}>
                          Followers
                        </Text>
                      </Box>
                      <Box fontSize={"md"}>
                        {detailUser?.followings.length}{" "}
                        <Text
                          display={"inline"}
                          color={"gray.400"}>
                          Following
                        </Text>
                      </Box>
                    </Flex>

                    <Tabs
                      variant='solid-rounded'
                      colorScheme='green'>
                      <TabList>
                        <Tab color={"white"}>Follower</Tab>
                        <Tab color={"white"}>Following</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Box
                            bg={"#2b2b2b"}
                            px={5}
                            py={3}>
                            {!detailUser?.followers.length ? (
                              <Text fontSize={"md"}>No Follower Found</Text>
                            ) : (
                              <>
                                {detailUser?.followers.map(
                                  (follower, index) => (
                                    <Flex
                                      key={index}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      my={4}
                                      display={{ base: "block", sm: "flex" }}>
                                      <Flex
                                        gap={2}
                                        alignItems={"center"}
                                        mb={{ base: 3, sm: 0 }}>
                                        <Text>
                                          <Image
                                            borderRadius='full'
                                            boxSize='45px'
                                            objectFit='cover'
                                            src={follower.profile_picture}
                                            alt={follower.fullname}
                                          />
                                        </Text>
                                        <Box>
                                          <Text fontSize={"sm"}>
                                            {follower.fullname}
                                          </Text>
                                          <Text
                                            fontSize={"sm"}
                                            color={"gray.400"}>
                                            @{follower.username}
                                          </Text>
                                        </Box>
                                      </Flex>
                                      <Text>
                                        <Link to={`/profile/${follower.id}`}>
                                          <Button
                                            color={"white"}
                                            _hover={{
                                              bg: "#38a169",
                                              borderColor: "#38a169",
                                            }}
                                            size='sm'
                                            borderRadius={"full"}
                                            variant='outline'>
                                            Visit Profile
                                          </Button>
                                        </Link>
                                      </Text>
                                    </Flex>
                                  )
                                )}
                              </>
                            )}
                          </Box>
                        </TabPanel>
                        <TabPanel>
                          <Box
                            bg={"#2b2b2b"}
                            px={5}
                            py={3}>
                            {!detailUser?.followings.length ? (
                              <Text fontSize={"md"}>No Following Found</Text>
                            ) : (
                              <>
                                {detailUser?.followings.map(
                                  (following, index) => (
                                    <Flex
                                      key={index}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      my={4}
                                      display={{ base: "block", sm: "flex" }}>
                                      <Flex
                                        gap={2}
                                        alignItems={"center"}
                                        mb={{ base: 3, sm: 0 }}>
                                        <Text>
                                          <Image
                                            borderRadius='full'
                                            boxSize='45px'
                                            objectFit='cover'
                                            src={following.profile_picture}
                                            alt={following.fullname}
                                          />
                                        </Text>
                                        <Box>
                                          <Text fontSize={"sm"}>
                                            {following.fullname}
                                          </Text>
                                          <Text
                                            fontSize={"sm"}
                                            color={"gray.400"}>
                                            @{following.username}
                                          </Text>
                                        </Box>
                                      </Flex>
                                      <Text>
                                        <Link to={`/profile/${following.id}`}>
                                          <Button
                                            color={"white"}
                                            _hover={{
                                              bg: "#38a169",
                                              borderColor: "#38a169",
                                            }}
                                            size='sm'
                                            borderRadius={"full"}
                                            variant='outline'>
                                            Visit Profile
                                          </Button>
                                        </Link>
                                      </Text>
                                    </Flex>
                                  )
                                )}
                              </>
                            )}
                          </Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
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
