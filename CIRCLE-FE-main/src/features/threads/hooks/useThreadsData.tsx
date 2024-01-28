/** @format */

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "@/utils/api";
import { ReplyPostType, ThreadPostType } from "@/types";
import getError from "@/utils/getError";

// fetch threads
const fetchThreads = async () => {
  const response = await API.get("/threads", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

export const useThreads = () => {
  return useQuery({
    queryKey: ["threads"],
    queryFn: fetchThreads,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
};
// fetch threads

// fetch infinite threads
const fetchInfiniteThreads = async ({ pageParam = 1 }) => {
  const response = await API.get(`/threads?page=${pageParam}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

export const useInfiniteThreads = () => {
  return useInfiniteQuery({
    queryKey: ["threads-infinite"],
    queryFn: fetchInfiniteThreads,
    // staleTime: 10000,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length) {
        return pages.length + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
  });
};
// fetch infinite threads

// post thread
const postThread = (thread: ThreadPostType) => {
  return API.post("/thread", thread, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
};

export const usePostThread = (reset: () => void) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postThread,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        // queryKey: ["threads"],
        queryKey: ["threads-infinite"],
      });
      reset();
    },
    onError: (error) => {
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
    },
  });
};
// post thread

// like thread
const postLikeThread = (threadId: string) => {
  return API.post(`/thread/${threadId}/like`, "", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
};

export const usePostLike = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postLikeThread,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["threads-infinite"],
      });
    },
    onError: (error) => {
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
    },
  });
};

export const usePostLikeDetail = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postLikeThread,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["detail-thread"],
      });
    },
    onError: (error) => {
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
    },
  });
};
// like thread

// like thread
const deleteThread = (threadId: string) => {
  return API.delete(`/thread/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
};

export const useDeleteThread = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: deleteThread,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["threads-infinite"],
      });
    },
    onError: (error) => {
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
    },
  });
};
// like thread

// detail thread
const fetchDetailThread = async (threadId: string) => {
  const response = await API.get(`/thread/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

export const useDetailThread = (threadId: string) => {
  return useQuery({
    queryKey: ["detail-thread"],
    queryFn: () => fetchDetailThread(threadId),
    refetchOnWindowFocus: false,
  });
};
// detail thread

// post reply
const postReply = (reply: ReplyPostType) => {
  const threadId = reply.threadId;
  const payload = {
    ...reply,
  };
  delete payload.threadId;
  return API.post(`/thread/${threadId}/reply`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
};

export const usePostReply = (reset: () => void) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postReply,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["detail-thread"],
      });
      reset();
    },
    onError: (error) => {
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
    },
  });
};
// post reply
