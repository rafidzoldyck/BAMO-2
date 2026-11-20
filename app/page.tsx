"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageSquare,
  Plus,
  Search,
  Shield,
  User as UserIcon,
  LogOut,
  Send,
  Compass,
  Menu,
  X,
  ArrowUp,
  Trash2,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { User, Post, Suggestion } from "./types";
import {
  INITIAL_USERS,
  INITIAL_POSTS,
  INITIAL_SUGGESTIONS,
  GRAND_LINE_PICKS,
} from "./data";

type Tab =
  | "Posts"
  | "Introduction"
  | "Suggestion"
  | "Grand Line"
  | "Contact Us"
  | "Admin Panel"
  | "Profile";

export default function BamoApp() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]);
  const [activeTab, setActiveTab] = useState<Tab>("Posts");
  const [viewedProfile, setViewedProfile] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const [authName, setAuthName] = useState("");
  const [authUsername, setAuthUsername] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState("");
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const [sugTitle, setSugTitle] = useState("");
  const [sugCategory, setSugCategory] = useState<"Anime" | "Manhwa" | "Site Feature">("Manhwa");
  const [sugDesc, setSugDesc] = useState("");

  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const savedUsers = localStorage.getItem("bamo_users");
    const savedPosts = localStorage.getItem("bamo_posts");
    const savedSuggestions = localStorage.getItem("bamo_suggestions");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedSuggestions) setSuggestions(JSON.parse(savedSuggestions));
  }, []);

  useEffect(() => {
    localStorage.setItem("bamo_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("bamo_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("bamo_suggestions", JSON.stringify(suggestions));
  }, [suggestions]);

  const navTabs: Tab[] = [
    "Introduction",
    "Posts",
    "Suggestion",
    "Grand Line",
    "Contact Us",
    ...(currentUser?.role === "Admin" ? (["Admin Panel"] as Tab[]) : []),
  ];

  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

  const openProfile = (user: User) => {
    setViewedProfile(user);
    setActiveTab("Profile");
    setMobileMenuOpen(false);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "login") {
      const found = users.find(
        (u) => u.email.toLowerCase() === authEmail.toLowerCase() || u.username === authEmail
      );
      if (found) {
        if (found.banned) {
          alert("This account has been suspended by an Admin.");
          return;
        }
        setCurrentUser(found);
        setAuthModalOpen(false);
      } else {
        alert("User not found. Try admin@bamo.bd or register a new account.");
      }
    } else {
      if (!authName || !authUsername || !authEmail) return;
      const newUser: User = {
        id: `u_${Date.now()}`,
        name: authName,
        username: authUsername.toLowerCase().replace(/\s+/g, "_"),
        email: authEmail,
        role: "Member",
        bio: "New member of Bengali Ani-Manhwa Obsession.",
        joinedAt: "Nov 2026",
      };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setAuthModalOpen(false);
    }
    setAuthName("");
    setAuthUsername("");
    setAuthEmail("");
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !postTitle.trim() || !postContent.trim()) return;
    const tagsArray = postTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newPost: Post = {
      id: `p_${Date.now()}`,
      authorId: currentUser.id,
      title: postTitle,
      content: postContent,
      tags: tagsArray.length > 0 ? tagsArray : ["General"],
      likes: [],
      comments: [],
      createdAt: "Just now",
    };
    setPosts([newPost, ...posts]);
    setPostTitle("");
    setPostContent("");
    setPostTags("");
    setCreatePostOpen(false);
    setActiveTab("Posts");
  };

  const toggleLike = (postId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    setPosts(
      posts.map((post) => {
        if (post.id !== postId) return post;
        const hasLiked = post.likes.includes(currentUser.id);
        return {
          ...post,
          likes: hasLiked
            ? post.likes.filter((id) => id !== currentUser.id)
            : [...post.likes, currentUser.id],
        };
      })
    );
  };

  const handleAddComment = (postId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c_${Date.now()}`,
                  authorId: currentUser.id,
                  content: text,
                  createdAt: "Just now",
                },
              ],
            }
          : post
      )
    );
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  const handleAddSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    if (!sugTitle.trim() || !sugDesc.trim()) return;
    const newSug: Suggestion = {
      id: `s_${Date.now()}`,
      authorId: currentUser.id,
      title: sugTitle,
      category: sugCategory,
      description: sugDesc,
      votes: [currentUser.id],
      status: "Under Review",
    };
    setSuggestions([newSug, ...suggestions]);
    setSugTitle("");
    setSugDesc("");
  };

  const toggleVote = (sugId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    setSuggestions(
      suggestions.map((s) => {
        if (s.id !== sugId) return s;
        const voted = s.votes.includes(currentUser.id);
        return {
          ...s,
          votes: voted
            ? s.votes.filter((id) => id !== currentUser.id)
            : [...s.votes, currentUser.id],
        };
      })
    );
  };

  const toggleRole = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, role: u.role === "Admin" ? "Member" : "Admin" } : u
      )
    );
  };

  const toggleBan = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, banned: !u.banned } : u)));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => setActiveTab("Posts")}
            className="text-2xl font-black tracking-tighter text-neutral-900 hover:opacity-80 transition"
            title="Bengali Ani-Manhwa Obsession"
          >
            BAMO
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => setCreatePostOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-neutral-800 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Post</span>
                </button>
                <button
                  onClick={() => openProfile(currentUser)}
                  className="inline-flex items-center gap-2 border border-neutral-200 bg-white px-2.5 py-1.5 rounded-md text-sm font-medium hover:bg-neutral-50 transition"
                >
                  <UserIcon className="w-4 h-4 text-neutral-600" />
                  <span className="hidden sm:inline">{currentUser.username}</span>
                </button>
                <button
                  onClick={() => setCurrentUser(null)}
                  title="Log Out"
                  className="p-2 text-neutral-500 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setAuthModalOpen(true);
                }}
                className="bg-neutral-900 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-neutral-800 transition"
              >
                Log In
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-1">
            {navTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {activeTab === "Posts" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Community Feed</h1>
                <p className="text-sm text-neutral-500">
                  Bengali Ani-Manhwa Obsession discussions, reviews & theories.
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search posts or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-neutral-200 rounded-md focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap transition ${
                    selectedTag === tag
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {tag === "All" ? "All Genres" : `#${tag}`}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const author = users.find((u) => u.id === post.authorId) || users[0];
                const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;

                return (
                  <article
                    key={post.id}
                    className="bg-white border border-neutral-200 rounded-lg p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => openProfile(author)}
                        className="flex items-center gap-2.5 text-left group"
                      >
                        <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                          {author.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold group-hover:underline">
                              {author.name}
                            </span>
                            {author.role === "Admin" && (
                              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded font-semibold">
                                Admin
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500">
                            @{author.username} • {post.createdAt}
                          </p>
                        </div>
                      </button>

                      {(currentUser?.role === "Admin" || currentUser?.id === post.authorId) && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-neutral-400 hover:text-red-600 p-1"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-neutral-900">{post.title}</h2>
                      <p className="mt-1.5 text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="cursor-pointer text-xs px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center gap-6">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`inline-flex items-center gap-1.5 text-sm font-medium transition ${
                          isLiked ? "text-rose-600" : "text-neutral-500 hover:text-neutral-900"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-600" : ""}`} />
                        <span>{post.likes.length}</span>
                      </button>

                      <div className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments.length} Comments</span>
                      </div>
                    </div>

                    <div className="bg-neutral-50 rounded-md p-3.5 space-y-3">
                      {post.comments.map((c) => {
                        const cAuthor = users.find((u) => u.id === c.authorId) || users[0];
                        return (
                          <div key={c.id} className="text-sm flex justify-between gap-2">
                            <div>
                              <button
                                onClick={() => openProfile(cAuthor)}
                                className="font-semibold text-neutral-900 hover:underline mr-2"
                              >
                                {cAuthor.name}
                              </button>
                              <span className="text-neutral-700">{c.content}</span>
                            </div>
                            <span className="text-xs text-neutral-400 shrink-0">{c.createdAt}</span>
                          </div>
                        );
                      })}

                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          placeholder={
                            currentUser ? "Write a comment..." : "Log in to comment..."
                          }
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                          }
                          onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                          className="flex-1 text-sm bg-white border border-neutral-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-neutral-900"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-3 py-1.5 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "Introduction" && (
          <div className="bg-white border border-neutral
