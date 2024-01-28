import {
  Box,
  Button,
  ButtonSpinner,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { ReplyPostType } from "@/types";
import Upload from "@/components/Upload";
import { useAppSelector } from "@/redux/store";
import { usePostReply } from "../hooks/useThreadsData";

export default function ReplyForm({ threadId }: { threadId: string }) {
  const { data: profileData } = useAppSelector((state) => state.profile);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<string>("");
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

  const { mutate } = usePostReply(() => {
    setContent("");
    setImage("");
    setImageStatus({
      name: "",
      size: 0,
    });
  });

  const postReply = () => {
    const reply: ReplyPostType = {
      content,
      threadId,
    };
    if (image) {
      reply.image = image;
      reply.uploadId = parseInt(uploadId, 10);
    }

    mutate(reply);
  };

  return (
    <Fragment>
      <Flex alignItems={"center"} gap={"10px"}>
        <Image
          borderRadius="full"
          boxSize="40px"
          objectFit="cover"
          src={profileData?.profile_picture}
          alt={profileData?.fullname}
        />
        <FormControl>
          <Input
            type="text"
            placeholder="Let's post new reply!"
            value={content}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setContent(event.target.value)
            }
          />
        </FormControl>
        <Box
          fontSize={"3xl"}
          color={"#38a169"}
          cursor={"pointer"}
          onClick={onOpen}
        >
          <RiImageAddFill />
        </Box>
        {isUploadLoading ? (
          <Button px={"20px"} colorScheme="green" borderRadius={"full"}>
            <ButtonSpinner />
          </Button>
        ) : (
          <Button
            px={"20px"}
            colorScheme="green"
            borderRadius={"full"}
            onClick={postReply}
          >
            Post
          </Button>
        )}
      </Flex>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
