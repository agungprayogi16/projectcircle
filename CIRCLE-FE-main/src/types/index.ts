/** @format */

// AUTH
export type RegisterType = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginType = {
  emailOrUsername: string;
  password: string;
};
// AUTH

// THREAD
export type ThreadLikeType = {
  id: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    fullname: string;
    profile_picture: string;
  };
};

export type ThreadReplyType = {
  id: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    fullname: string;
    profile_picture: string;
  };
};

export type ThreadHomeType = {
  id: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    fullname: string;
    profile_picture: string;
  };
  likes: ThreadLikeType[];
  replies: number;
};

export type ThreadDetailType = {
  id: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
    fullname: string;
    profile_picture: string;
  };
  likes: ThreadLikeType[];
  replies: ThreadReplyType[];
};

export type ThreadPostType = {
  content: string;
  image?: string;
  uploadId?: number;
};

export type ReplyPostType = {
  content: string;
  image?: string;
  uploadId?: number;
  threadId?: string;
};
// THREAD

// USER
export type FollowType = {
  id: string;
  username: string;
  fullname: string;
  profile_picture: string;
};

export type UserProfileType = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password: null;
  profile_picture: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
  followers: FollowType[];
  followings: FollowType[];
};

export type SearchUserType = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password: null;
  profile_picture: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type EditProfileType = {
  fullName: string;
  userName: string;
  bio: string;
  profilePicture?: string;
  uploadId?: string;
};
// USER
