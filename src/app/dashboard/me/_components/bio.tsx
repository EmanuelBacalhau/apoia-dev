"use client";

import { ChangeEvent, useState, useRef } from "react";
import { debounce } from "lodash";
import { toast } from "sonner";
import { changeBio } from "../_actions/change-bio";

interface BioProps {
  initialBio?: string;
}

export function Bio({ initialBio }: BioProps) {
  const [bio, setBio] = useState<string | undefined>(initialBio);
  const [originalBio] = useState<string | undefined>(initialBio);

  const debounceSafeBio = useRef(
    debounce(async (currentBio: string) => {
      if (!currentBio.trim()) {
        setBio(originalBio);
        return;
      }

      if (currentBio !== bio) {
        try {
          const response = await changeBio({ bio: currentBio });

          if (response.success) {
            setBio(response.bio);
          } else {
            setBio(originalBio);
            toast.error("Erro ao alterar a bio.");
          }

          toast.success("Bio alterada com sucesso!");
        } catch (error) {
          toast.error("Erro ao alterar a bio.");
          setBio(originalBio);
        }
      }
    }, 500)
  ).current;

  function handleChangeBio(e: ChangeEvent<HTMLTextAreaElement>) {
    const newBio = e.target.value;
    setBio(newBio);
    debounceSafeBio(newBio);
  }
  return (
    <textarea
      value={bio}
      onChange={handleChangeBio}
      className="text-base md:text-base bg-gray-50 border border-gray-100 rounded-md outline-none p-2 w-full max-w-2xl resize-none my-3 h-40"
    />
  );
}
