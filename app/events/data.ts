export type EventType = "upcoming" | "past";

export interface TeamMember {
  name: string;
  role?: string;
}

export interface WinnerTeam {
  teamName?: string;
  leader: string;
  members: TeamMember[];
}

export interface EventDetails {
  slug: string;
  title: string;
  date: string;
  type: EventType;
  description: string;
  image?: string;
  // For upcoming
  registrationLink?: string;
  location?: string;
  time?: string;
  // For past
  winners?: WinnerTeam[];
  gallery?: string[];
}

export const eventsData: EventDetails[] = [
  {
    slug: "hackathon-2025",
    title: "Hackathon 2025",
    date: "2025-04-15",
    type: "upcoming",
    description: "A 24-hour hackathon bringing together developers, designers, and innovators. Join us to build the future!",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
    registrationLink: "https://example.com/register",
    location: "JEMTEC Campus, Greater Noida",
    time: "10:00 AM",
  },
  {
    slug: "workshop-react",
    title: "React Workshop",
    date: "2025-03-20",
    type: "upcoming",
    description: "Learn React from basics to advanced patterns. Perfect for beginners and intermediate developers looking to level up their frontend skills.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
    registrationLink: "https://example.com/register-react",
    location: "Lab 3, JEMTEC",
    time: "2:00 PM",
  },
  {
    slug: "tech-talk-ai",
    title: "Tech Talk: AI & ML",
    date: "2025-02-10",
    type: "past",
    description: "Exploring the fundamentals of artificial intelligence and machine learning with industry experts. We discussed neural networks, transformers, and the future of AI.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    location: "Auditorium",
    time: "11:00 AM",
    winners: [
      {
        teamName: "Neural Ninjas",
        leader: "Alice Sharma",
        members: [{ name: "Alice Sharma", role: "Model Engineer" }, { name: "Rajesh Kumar", role: "Data Scientist" }, { name: "Priya Patel", role: "Frontend" }]
      },
      {
        teamName: "Deep Thinkers",
        leader: "Bob Singh",
        members: [{ name: "Bob Singh", role: "Lead" }, { name: "Neha Gupta" }]
      },
      {
        leader: "Charlie Kumar",
        members: [{ name: "Charlie Kumar" }, { name: "Devansh Jain" }]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1475721025592-7105cb8f972b?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=500",
    ]
  },
  {
    slug: "code-sprint-2024",
    title: "Code Sprint 2024",
    date: "2024-11-05",
    type: "past",
    description: "Fast-paced competitive programming contest. Students battled it out to solve complex algorithmic challenges within a tight timeline.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
    location: "Main Computer Lab",
    time: "9:00 AM",
    winners: [
      { leader: "David Gupta", members: [{ name: "David Gupta" }, { name: "Suresh Menon" }] },
      { leader: "Eva Patel", members: [{ name: "Eva Patel" }, { name: "Ananya Desai" }] },
      { leader: "Franky Sharma", members: [{ name: "Franky Sharma" }, { name: "Rohan Kapoor" }] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=500"
    ]
  }
];
