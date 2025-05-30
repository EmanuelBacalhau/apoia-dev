import { auth } from "@/lib/auth";
import { UrlPreview } from "./_components/url";
import { CardProfile } from "./_components/card-profile";

export default async function Me() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const userData = {
    id: session?.user.id,
    name: session?.user?.name,
    username: session?.user?.username,
    bio: session?.user?.bio,
    image: session?.user?.image,
  };

  return (
    <main className="w-full h-full flex gap-4 flex-col items-center p-4">
      <section className="w-full flex lg:flex-row flex-col lg:items-center mx-auto bg-zinc-900 rounded-md p-4 gap-2">
        <UrlPreview username={userData.username} />
      </section>
      <CardProfile user={userData} />
    </main>
  );
}
