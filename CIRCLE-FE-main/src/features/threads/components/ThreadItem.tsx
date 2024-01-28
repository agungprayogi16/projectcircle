import { Fragment, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { ThreadHomeType } from "@/types";
import { useDeleteThread, usePostLike } from "../hooks/useThreadsData";
import { useAppSelector } from "@/redux/store";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

interface ThreadItemPropsInterface {
  data: ThreadHomeType;
}

export default function ThreadItem(props: ThreadItemPropsInterface) {
  const { data: profileData } = useAppSelector((state) => state.profile);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLike,
    onOpen: onOpenLike,
    onClose: onCloseLike,
  } = useDisclosure();
  const [threadSelected, setThreadSelected] = useState<ThreadHomeType | null>(
    null
  );

  const { mutate } = usePostLike();
  const { mutate: mutateDelete } = useDeleteThread();

  return (
    <Fragment>
      <Flex gap={"15px"} border={"2px solid #3a3a3a"} p={"20px"} mb={"10px"}>
        <Image
          borderRadius="full"
          boxSize="40px"
          objectFit="cover"
          src={props.data.user.profile_picture}
          alt={`${props.data.user.fullname} Profile Picture`}
        />
        <Box>
          <Box display={{ base: "block", md: "flex" }} mb={"5px"}>
            <Link to={`/profile/${props.data.user.id}`}>
              <Text fontWeight={"bold"} me={"10px"}>
                {props.data.user.fullname}
              </Text>
            </Link>
            <Box mt={"2px"} fontSize={"sm"} color={"gray.400"}>
              <Link to={`/profile/${props.data.user.id}`}>
                @{props.data.user.username}
              </Link>{" "}
              -{" "}
              <Text display={"inline-block"} title={props.data.created_at}>
                {moment(new Date(props.data.created_at)).calendar()}
              </Text>
            </Box>
          </Box>
          <Text fontSize={"sm"} mb={"10px"} wordBreak={"break-word"}>
            {props.data.content}
          </Text>
          {props.data.image && (
            <Image
              onClick={() => {
                setThreadSelected(props.data);
                onOpen();
              }}
              borderRadius="5px"
              boxSize="350px"
              objectFit="cover"
              src={props.data.image}
              alt={`${props.data.image} Image Thread`}
              mb={"10px"}
              cursor={"pointer"}
            />
          )}
          <Flex gap={"15px"}>
            <Flex alignItems={"center"}>
              <Box onClick={() => mutate(props.data.id)} cursor={"pointer"}>
                {props.data.likes
                  .map((like) => like.user.id)
                  .includes(profileData?.id ? profileData?.id : "") ? (
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
                onClick={() => {
                  setThreadSelected(props.data);
                  onOpenLike();
                }}
                cursor={"pointer"}
                fontSize={"sm"}
                color={"gray.400"}
              >
                {props.data.likes.length}
              </Text>
            </Flex>
            <Link to={`/reply/${props.data.id}`}>
              <Flex alignItems={"center"}>
                <BiCommentDetail
                  style={{
                    fontSize: "20px",
                    marginRight: "5px",
                    marginTop: "1px",
                  }}
                />
                <Text fontSize={"sm"} color={"gray.400"}>
                  {props.data.replies} Replies
                </Text>
              </Flex>
            </Link>
            {props.data.user.id === profileData?.id && (
              <Flex
                alignItems={"center"}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "This Thread Will Be Deleted Permanently!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Delete This Thread!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      mutateDelete(props.data.id);
                    }
                  });
                }}
                cursor={"pointer"}
              >
                <RiDeleteBin5Line
                  style={{
                    fontSize: "20px",
                    marginRight: "5px",
                    marginTop: "1px",
                  }}
                />
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>

      <Modal
        isCentered
        onClose={onCloseLike}
        isOpen={isOpenLike}
        motionPreset="slideInBottom"
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={0}>List User Who Like</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {threadSelected?.likes.length ? (
              <>
                {threadSelected?.likes.map((like, index) => (
                  <Flex gap={2} alignItems={"center"} my={"15px"} key={index}>
                    <Text>
                      <Image
                        borderRadius="full"
                        boxSize="45px"
                        objectFit="cover"
                        src={like.user.profile_picture}
                        alt={like.user.fullname}
                      />
                    </Text>
                    <Box>
                      <Text fontSize={"sm"}>{like.user.fullname}</Text>
                      <Text fontSize={"sm"} color={"gray.400"}>
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
            <Button colorScheme="blue" size={"sm"} onClick={onCloseLike}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalContent borderRadius={0}>
          <ModalCloseButton />
          <ModalBody
            paddingTop={"50px"}
            paddingBottom={"10px"}
            paddingRight={"10px"}
            paddingLeft={"10px"}
            shadow={"dark-lg"}
          >
            <Image
              width={"100%"}
              objectFit="cover"
              src={threadSelected?.image}
              alt={`${threadSelected?.image} Image Thread`}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
