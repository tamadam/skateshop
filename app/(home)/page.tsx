import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "../(auth)/components/SignOut";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      Home page
      {session && <SignOut />}
    </div>
  );
}
