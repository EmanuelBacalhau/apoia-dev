import Image from "next/image";
import { Name } from "./name";
import { Bio } from "./bio";

interface CardProfileProps {
  user: {
    id: string;
    name: string | undefined;
    username: string | undefined;
    bio: string | undefined;
    image: string | undefined;
  };
}

export function CardProfile({ user }: CardProfileProps) {
  return (
    <div className="w-full flex flex-col items-center mx-auto rounded-md p-4 gap-2">
      {user.image && (
        <Image
          src={user.image}
          alt={user.name || "User Avatar"}
          width={104}
          height={104}
          priority
          quality={100}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col">
        <Name initialName={user.name} />
        <Bio initialBio={user.bio ?? "Digite sua biografia..."} />
      </div>
    </div>
  );
}
