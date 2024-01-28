import { Fragment } from "react";
import { Box, Image } from "@chakra-ui/react";

const ImagePreview = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Fragment>
      <Box pt={5} display={"flex"} justifyContent={"center"}>
        <Image maxW={"200px"} src={imageUrl} alt="Image Preview" />
      </Box>
    </Fragment>
  );
};

export default ImagePreview;
