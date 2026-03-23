"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addMember, TeamCategory } from "@/app/actions/teamActions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

export default function CreateMemberForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    category: "Core" as TeamCategory,
    gmail: "",
    linkedin: "",
  });
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories: TeamCategory[] = ["Core", "Heads", "Tech", "Publicity", "Design", "Management"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await addMember({ ...formData, photo });

    if (res.success) {
      router.push("/admin/team");
    } else {
      setError(res.error || "Something went wrong.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-800">
        <Link href="/admin/team" className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">Add Team Member</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Category *</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g. President, Tech Head (optional)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Photo</label>
          <ImageUpload
            value={photo}
            onChange={setPhoto}
            folder="team"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Gmail</label>
            <input
              type="email"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="member@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">LinkedIn URL</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 font-semibold py-3 px-4 rounded-lg transition-colors flex justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding Member..." : "Add Team Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
