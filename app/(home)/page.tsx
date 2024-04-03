import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "../(auth)/components/SignOut";
import Hero from "./components/Hero/Hero";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Hero />
      {session && <SignOut />}
    </div>
  );
}
