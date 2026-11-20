export type Role = "Admin" | "Member";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  bio: string;
  joinedAt: string;
  banned?: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  tags: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Suggestion {
  id: string;
  authorId: string;
  title: string;
  category: "Anime" | "Manhwa" | "Site Feature";
  description: string;
  votes: string[];
  status: "Under Review" | "Recommended" | "Added";
}
