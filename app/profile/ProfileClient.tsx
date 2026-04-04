"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMember, TeamMember } from "@/app/actions/teamActions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

export default function ProfileClient({ member }: { member: TeamMember }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: member.name || "",
    linkedin: member.linkedin || "",
    instagram: member.instagram || "",
    about: member.about || "",
  });
  const [photo, setPhoto] = useState(member.photo || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await updateMember(member.id, { ...formData, photo });

    if (res.success) {
      router.push("/team");
      router.refresh(); // Refresh the team page to show new changes
    } else {
      setError(res.error || "Something went wrong.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#141418]/90 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8 text-white shadow-2xl">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
        <Link href="/team" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </Link>
        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Your Team Card</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4F9EFF] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Role</label>
            <input
              type="text"
              value={member.role}
              disabled
              className="w-full bg-[#0a0a0c] border border-white/5 rounded-lg px-4 py-2 opacity-50 cursor-not-allowed text-zinc-500"
            />
            <p className="text-[10px] text-zinc-600">Locked by admins.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-medium text-zinc-400">Email Address</label>
             <input
               type="email"
               value={member.gmail}
               disabled
               className="w-full bg-[#0a0a0c] border border-white/5 rounded-lg px-4 py-2 opacity-50 cursor-not-allowed text-zinc-500"
             />
             <p className="text-[10px] text-zinc-600">Your registered identifier. Locked.</p>
           </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Your Photo</label>
          <ImageUpload
            value={photo}
            onChange={setPhoto}
            folder="team"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">LinkedIn URL</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4F9EFF] transition-colors"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Instagram URL</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4F9EFF] transition-colors"
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-medium text-zinc-400">About You</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="A short snippet about what you do..."
            rows={3}
            className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4F9EFF] transition-colors"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#4F9EFF] hover:bg-[#3b85db] text-black font-semibold py-3 px-4 rounded-lg transition-colors flex justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating Profile..." : "Update Team Card"}
          </button>
        </div>
      </form>
    </div>
  );
}
