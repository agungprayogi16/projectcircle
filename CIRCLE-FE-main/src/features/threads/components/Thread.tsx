import { Fragment } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import ThreadForm from "@threads/components/ThreadForm";
import ThreadItem from "@threads/components/ThreadItem";
import { useInfiniteThreads } from "@threads/hooks/useThreadsData";
import { ThreadHomeType } from "@/types";

export default function Thread() {
  const {
    isLoading,
    refetch,
    data: threads,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteThreads();

  return (
    <Fragment>
      <Box flex={1} px={5} py={10} overflow={"auto"} className="hide-scroll">
        <Text fontSize={"2xl"} mb={"10px"}>
          Home
        </Text>
        <ThreadForm />
        {isLoading ? (
          <Box textAlign={"center"}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <>
            {isError ? (
              <Alert status="error" bg={"#FF6969"} mb={3} borderRadius={5}>
                <AlertIcon color={"white"} />
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            ) : (
              <>
                <Flex justifyContent={"center"} mb={3}>
                  <Button
                    onClick={() => refetch()}
                    display={"flex"}
                    gap={"5px"}
                    colorScheme="blue"
                    size={"sm"}
                    borderRadius={"full"}
                  >
                    <Text>
                      <FiRefreshCw />
                    </Text>
                    <Text>Refresh</Text>
                  </Button>
                </Flex>
                {threads?.pages.map((group, i) => (
                  <Fragment key={i}>
                    {group.data.map((thread: ThreadHomeType) => (
                      <ThreadItem key={thread.id} data={thread} />
                    ))}
                  </Fragment>
                ))}
                <Flex justifyContent={"center"}>
                  {isFetching && isFetchingNextPage ? (
                    <Box textAlign={"center"}>
                      <Spinner size="xl" />
                    </Box>
                  ) : (
                    <>
                      {hasNextPage && (
                        <Button
                          colorScheme="green"
                          size="md"
                          onClick={() => {
                            fetchNextPage();
                          }}
                        >
                          Load More
                        </Button>
                      )}
                    </>
                  )}
                </Flex>
              </>
            )}
          </>
        )}
      </Box>
    </Fragment>
  );
}
