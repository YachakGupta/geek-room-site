import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>No email found on your account.</p>
      </div>
    );
  }

  const teamMember = await prisma.teamMember.findFirst({
    where: { gmail: email },
  });

  if (!teamMember) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white gap-4">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="text-zinc-400">Your email ({email}) is not associated with any Team Member card.</p>
        <p className="text-zinc-500 text-sm">Please contact an admin if you believe this is an error.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12 px-4">
      <ProfileClient member={teamMember as any} />
    </div>
  );
}
