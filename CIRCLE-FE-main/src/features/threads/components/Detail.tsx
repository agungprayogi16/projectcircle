/** @format */

import { Fragment } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDetailThread, usePostLikeDetail } from "../hooks/useThreadsData";
import { ThreadLikeType, ThreadReplyType } from "@/types";
import { useAppSelector } from "@/redux/store";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";

export default function Detail() {
  const { data: profileData } = useAppSelector((state) => state.profile);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLike,
    onOpen: onOpenLike,
    onClose: onCloseLike,
  } = useDisclosure();
  const params = useParams();

  const {
    isLoading,
    data: thread,
    isError,
    error,
  } = useDetailThread(params.threadId || "");

  const { mutate } = usePostLikeDetail();

  return (
    <Fragment>
      <Box
        flex={1}
        px={5}
        py={10}
        overflow={"auto"}
        className='hide-scroll'>
        <Flex
          gap={"3"}
          alignItems={"center"}
          mb={4}>
          <Link to={"/"}>
            <Text fontSize={"2xl"}>
              <BsArrowLeft />
            </Text>
          </Link>
          <Text fontSize={"2xl"}>Detail Thread</Text>
        </Flex>

        <Flex
          gap={"15px"}
          border={"2px solid #3a3a3a"}
          p={"20px"}
          mb={"10px"}>
          {isLoading ? (
            <Flex
              justifyContent={"center"}
              w={"100%"}>
              <Spinner size={"xl"} />
            </Flex>
          ) : (
            <>
              {isError ? (
                <Alert
                  status='error'
                  bg={"#FF6969"}
                  borderRadius={5}>
                  <AlertIcon color={"white"} />
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              ) : (
                <>
                  <Image
                    borderRadius='full'
                    boxSize='40px'
                    objectFit='cover'
                    src={`${thread?.data?.user?.profile_picture}`}
                    alt={`Profile Picture`}
                  />
                  <Box>
                    <Flex mb={"5px"}>
                      <Link to={`/profile/${thread?.data?.user?.id}`}>
                        <Text
                          fontWeight={"bold"}
                          me={"10px"}>
                          {thread?.data?.user?.fullname}
                        </Text>
                      </Link>
                      <Box
                        mt={"2px"}
                        fontSize={"sm"}
                        color={"gray.400"}>
                        <Link to={`/profile/${thread?.data?.user?.id}`}>
                          @{thread?.data?.user?.username}
                        </Link>{" "}
                        -{" "}
                        <Text
                          display={"inline-block"}
                          title={thread?.data?.created_at}>
                          {moment(
                            new Date(thread?.data?.created_at)
                          ).calendar()}
                        </Text>
                      </Box>
                    </Flex>
                    <Text
                      fontSize={"sm"}
                      mb={"10px"}
                      wordBreak={"break-word"}>
                      {thread?.data?.content}
                    </Text>
                    {thread?.data?.image && (
                      <Image
                        onClick={() => {
                          onOpen();
                        }}
                        borderRadius='5px'
                        boxSize='350px'
                        objectFit='cover'
                        src={thread.data.image}
                        alt={`${thread.data.image} Thread Image`}
                        mb={"10px"}
                        cursor={"pointer"}
                      />
                    )}
                    <Flex gap={"15px"}>
                      <Flex alignItems={"center"}>
                        <Box
                          onClick={() => mutate(thread?.data?.id)}
                          cursor={"pointer"}>
                          {thread?.data?.likes
                            .map((like: ThreadLikeType) => like.user.id)
                            .includes(
                              profileData?.id ? profileData?.id : ""
                            ) ? (
                            <AiFillHeart
                              style={{
                                fontSize: "20px",
                                marginRight: "5px",
                                marginTop: "1px",
                              }}
                            />
                          ) : (
                            <AiOutlineHeart
                              style={{
                                fontSize: "20px",
                                marginRight: "5px",
                                marginTop: "1px",
                              }}
                            />
                          )}
                        </Box>
                        <Text
                          fontSize={"sm"}
                          color={"gray.400"}
                          onClick={onOpenLike}
                          cursor={"pointer"}>
                          {thread?.data?.likes.length}
                        </Text>
                      </Flex>
                      <Flex alignItems={"center"}>
                        <BiCommentDetail
                          style={{
                            fontSize: "20px",
                            marginRight: "5px",
                            marginTop: "1px",
                          }}
                        />
                        <Text
                          fontSize={"sm"}
                          color={"gray.400"}>
                          {thread?.data?.replies?.length} Replies
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </>
              )}
            </>
          )}
        </Flex>

        <Box
          border={"2px solid #3a3a3a"}
          p={"20px"}
          mb={"10px"}>
          <ReplyForm threadId={params.threadId || ""} />
        </Box>

        {!isLoading && !isError ? (
          <>
            {thread?.data?.replies.length ? (
              <Box
                gap={"15px"}
                border={"2px solid #3a3a3a"}
                px={"20px"}
                py={"10px"}>
                {thread.data.replies.map((reply: ThreadReplyType) => (
                  <ReplyItem reply={reply} />
                ))}
              </Box>
            ) : null}
          </>
        ) : null}

        <Modal
          isCentered
          onClose={onCloseLike}
          isOpen={isOpenLike}
          motionPreset='slideInBottom'
          size={"sm"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader pb={0}>List User Who Like</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {thread?.data?.likes.length ? (
                <>
                  {thread?.data?.likes.map((like: ThreadLikeType) => (
                    <Flex
                      gap={2}
                      alignItems={"center"}
                      my={"15px"}
                      key={like.id}>
                      <Text>
                        <Image
                          borderRadius='full'
                          boxSize='45px'
                          objectFit='cover'
                          src={like.user.profile_picture}
                          alt={like.user.fullname}
                        />
                      </Text>
                      <Box>
                        <Text fontSize={"sm"}>{like.user.fullname}</Text>
                        <Text
                          fontSize={"sm"}
                          color={"gray.400"}>
                          @{like.user.username}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </>
              ) : (
                <Text>No Like Found Yet</Text>
              )}
            </ModalBody>
            <ModalFooter pt={0}>
              <Button
                colorScheme='blue'
                size={"sm"}
                onClick={onCloseLike}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset='slideInBottom'
          size={"xl"}>
          <ModalContent borderRadius={0}>
            <ModalCloseButton />
            <ModalBody
              paddingTop={"50px"}
              paddingBottom={"10px"}
              paddingRight={"10px"}
              paddingLeft={"10px"}
              shadow={"dark-lg"}>
              <Image
                onClick={onOpen}
                width={"100%"}
                objectFit='cover'
                src={thread?.data?.image}
                alt={`${thread?.data?.image} Image Thread`}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Fragment>
  );
}
