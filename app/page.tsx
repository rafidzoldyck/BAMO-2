"use client";

import React, { useState } from "react";
import { Heart, MessageSquare, Plus, Search, Shield, Compass, Mail, User } from "lucide-react";

type Tab = "Introduction" | "Posts" | "Suggestion" | "Grand Line" | "Contact Us" | "Admin Panel";

export default function BamoApp() {
  const [tab, setTab] = useState<Tab>("Posts");
  const [user, setUser] = useState<{ name: string; role: "Admin" | "Member" } | null>({
    name: "Tariq (Admin)",
    role: "Admin",
  });
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("All");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsText, setTagsText] = useState("Manhwa, Shonen");
  const [commentText, setCommentText] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Nusrat",
      role: "Member",
      title: "Omniscient Reader's Viewpoint — Why it hooks you early",
      body: "Kim Dokja reading a web novel that becomes reality is peak concept execution.",
      tags: ["Manhwa", "Discussion"],
      likes: 12,
      comments: ["So true! Can't wait for the next arc."],
    },
    {
      id: 2,
      author: "Arafat",
      role: "Member",
      title: "One Piece Weekly Theory & Favorite Arcs",
      body: "Share your favorite One Piece moments and anime/manhwa picks here.",
      tags: ["Anime", "Shonen"],
      likes: 19,
      comments: [],
    },
  ]);

  const tabs: Tab[] = [
    "Introduction",
    "Posts",
    "Suggestion",
    "Grand Line",
    "Contact Us",
    ...(user?.role === "Admin" ? (["Admin Panel"] as Tab[]) : []),
  ];

  const addPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: user ? user.name : "Guest",
        role: user?.role || "Member",
        title,
        body,
        tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
        likes: 0,
        comments: [],
      },
      ...posts,
    ]);
    setTitle("");
    setBody("");
  };

  const visiblePosts = posts.filter(
    (p) =>
      (tag === "All" || p.tags.includes(tag)) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.body.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111827]">
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setTab("Posts")} className="text-2xl font-black tracking-tighter">
            BAMO
          </button>

          <nav className="flex flex-wrap items-center gap-1">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium ${
                  tab === item ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() =>
                setUser(
                  user?.role === "Admin"
                    ? { name: "Rafid (Member)", role: "Member" }
                    : { name: "Tariq (Admin)", role: "Admin" }
                )
              }
              className="px-2.5 py-1.5 border border-neutral-200 rounded-md bg-white flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>{user ? `${user.name}` : "Guest"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 space-y-6">
        {tab === "Posts" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h1 className="text-2xl font-bold">Bengali Ani-Manhwa Obsession</h1>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search posts..."
                  className="pl-9 pr-3 py-1.5 text-sm bg-white border border-neutral-200 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Manhwa", "Anime", "Shonen", "Discussion"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1 rounded-full text-xs border ${
                    tag === t ? "bg-neutral-900 text-white border-neutral-900" : "bg-white border-neutral-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <form onSubmit={addPost} className="bg-white border border-neutral-200 rounded-lg p-4 space-y-3">
              <div className="font-semibold text-sm flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Create a Post
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2"
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your anime or manhwa post..."
                rows={3}
                className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2"
              />
              <input
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Genres/tags (comma separated)"
                className="w-full text-sm border border-neutral-200 rounded-md px-3 py-2"
              />
              <button type="submit" className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-md">
                Publish
              </button>
            </form>

            <div className="space-y-4">
              {visiblePosts.map((p) => (
                <article key={p.id} className="bg-white border border-neutral-200 rounded-lg p-5 space-y-3">
                  <div className="text-xs text-neutral-500">
                    <strong className="text-neutral-900">{p.author}</strong> • {p.role}
                  </div>
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  <p className="text-sm text-neutral-700">{p.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tg) => (
                      <span key={tg} className="text-xs px-2 py-0.5 bg-neutral-100 rounded">
                        #{tg}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-neutral-100 flex items-center gap-5 text-sm">
                    <button
                      onClick={() =>
                        setPosts(posts.map((item) => (item.id === p.id ? { ...item, likes: item.likes + 1 } : item)))
                      }
                      className="flex items-center gap-1 text-rose-600 font-medium"
                    >
                      <Heart className="w-4 h-4 fill-rose-600" /> {p.likes}
                    </button>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <MessageSquare className="w-4 h-4" /> {p.comments.length}
                    </span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {p.comments.map((c, idx) => (
                      <p key={idx} className="text-xs bg-neutral-50 p-2 rounded">
                        {c}
                      </p>
                    ))}
                    <div className="flex gap-2">
                      <input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 text-xs border border-neutral-200 rounded-md px-2.5 py-1.5"
                      />
                      <button
                        onClick={() => {
                          if (!commentText.trim()) return;
                          setPosts(
                            posts.map((item) =>
                              item.id === p.id ? { ...item, comments: [...item.comments, commentText] } : item
                            )
                          );
                          setCommentText("");
                        }}
                        className="px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-md"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {tab === "Introduction" && (
          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3">
            <h1 className="text-2xl font-bold">Welcome to BAMO</h1>
            <p className="text-sm text-neutral-600">
              Bengali Ani-Manhwa Obsession is a minimalist space for Bengali anime, manga, and manhwa fans to share posts, discuss genres, and discover new series.
            </p>
          </div>
        )}

        {tab === "Suggestion" && (
          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-2">
            <h1 className="text-xl font-bold">Suggestions</h1>
            <p className="text-sm text-neutral-600">Suggest anime, manhwa, or site improvements for BAMO.</p>
          </div>
        )}

        {tab === "Grand Line" && (
          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-2">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Compass className="w-5 h-5" /> Grand Line
            </h1>
            <p className="text-sm text-neutral-600">Featured classics and top-rated picks in the BAMO community.</p>
          </div>
        )}

        {tab === "Contact Us" && (
          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-2">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Mail className="w-5 h-5" /> Contact Us
            </h1>
            <p className="text-sm text-neutral-600">Reach out to the BAMO team for support or moderation inquiries.</p>
          </div>
        )}

        {tab === "Admin Panel" && user?.role === "Admin" && (
          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Shield className="w-5 h-5" /> Admin Panel
            </h1>
            <p className="text-sm text-neutral-600">Check members and manage community roles.</p>
            <div className="text-sm border-t border-neutral-100 pt-2 space-y-1">
              <div>• Tariq — Admin</div>
              <div>• Nusrat — Member</div>
              <div>• Arafat — Member</div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-neutral-200 py-5 px-4 text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>BAMO — Bengali Ani-Manhwa Obsession</span>
          <div className="flex gap-4">
            <a href="#facebook">Facebook</a>
            <a href="#discord">Discord</a>
            <a href="#instagram">Instagram</a>
            <a href="#youtube">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
