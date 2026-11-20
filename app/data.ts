import { User, Post, Suggestion } from "./types";

export const INITIAL_USERS: User[] = [
  {
    id: "u1",
    name: "Tariqul Islam",
    username: "tariq_bamo",
    email: "admin@bamo.bd",
    role: "Admin",
    bio: "Founder of Bengali Ani-Manhwa Obsession. Reading manhwa at 3 AM since 2019.",
    joinedAt: "Jan 2024",
  },
  {
    id: "u2",
    name: "Nusrat Jahan",
    username: "nusrat_reads",
    email: "nusrat@example.com",
    role: "Member",
    bio: "Omniscient Reader's Viewpoint & Josei enthusiast from Dhaka.",
    joinedAt: "Mar 2024",
  },
  {
    id: "u3",
    name: "Arafat Rahman",
    username: "arafat_op",
    email: "arafat@example.com",
    role: "Member",
    bio: "Hunting for the One Piece. Shonen & Seinen action junkie.",
    joinedAt: "Jun 2024",
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    authorId: "u2",
    title: "Why Omniscient Reader's Viewpoint hits differently on a second read",
    content:
      "Every subtle line Kim Dokja drops in the early scenarios foreshadows the entire epilogue. For Bengali readers just getting into Korean web novels and manhwa, ORV sets a bar very few series can touch.",
    tags: ["Manhwa", "Discussion", "ORV"],
    likes: ["u1", "u3"],
    comments: [
      {
        id: "c1",
        authorId: "u1",
        content: "100% agreed. The character development in the Demon King Selection arc is unmatched.",
        createdAt: "2h ago",
      },
    ],
    createdAt: "4 hours ago",
  },
  {
    id: "p2",
    authorId: "u3",
    title: "Top 5 Underrated Manhwa You Should Read This Weekend",
    content:
      "If you've already finished Solo Leveling and Tower of God, give these a shot: 1. Legend of the Northern Blade, 2. SSS-Class Suicide Hunter, 3. Barbarian Quest, 4. Peerless Dad, 5. The Boxer.",
    tags: ["Manhwa", "Action", "Recommendation"],
    likes: ["u1", "u2"],
    comments: [],
    createdAt: "1 day ago",
  },
];

export const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: "s1",
    authorId: "u2",
    title: "Weekly Manga/Manhwa Chapter Spoiler Thread",
    category: "Site Feature",
    description: "Create a dedicated pinned thread every Sunday for new One Piece & Jujutsu Kaisen chapters.",
    votes: ["u1", "u2", "u3"],
    status: "Added",
  },
  {
    id: "s2",
    authorId: "u3",
    title: "The Greatest Estate Developer",
    category: "Manhwa",
    description: "Must be added to the Grand Line Hall of Fame. Lloyd Frontera's facial expressions are peak comedy.",
    votes: ["u2", "u3"],
    status: "Recommended",
  },
];

export const GRAND_LINE_PICKS = [
  {
    title: "One Piece",
    type: "Anime / Manga",
    genre: "Adventure • Shonen",
    rating: "9.8 / 10",
    note: "The undisputed king of world-building and emotional payoffs.",
  },
  {
    title: "Omniscient Reader's Viewpoint",
    type: "Manhwa",
    genre: "Action • Fantasy",
    rating: "9.7 / 10",
    note: "A masterclass in meta-storytelling and sacrifice.",
  },
  {
    title: "Attack on Titan",
    type: "Anime",
    genre: "Dark Fantasy • Drama",
    rating: "9.6 / 10",
    note: "Relentless pacing with unforgettable moral complexity.",
  },
  {
    title: "Solo Leveling",
    type: "Manhwa",
    genre: "Action • System",
    rating: "9.4 / 10",
    note: "The gateway manhwa that brought millions into Korean webtoons.",
  },
  {
    title: "Monster",
    type: "Anime / Manga",
    genre: "Psychological • Thriller",
    rating: "9.6 / 10",
    note: "Naoki Urasawa's slow-burn masterpiece on human nature.",
  },
  {
    title: "Legend of the Northern Blade",
    type: "Manhwa",
    genre: "Murim • Action",
    rating: "9.5 / 10",
    note: "Distinctive art style and breathtaking choreography.",
  },
];
