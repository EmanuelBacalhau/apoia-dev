"use client";

import { ChangeEvent, useState, useRef } from "react";
import { debounce } from "lodash";
import { changeName } from "../_actions/change-name";
import { toast } from "sonner";

interface NameProps {
  initialName?: string;
}

export function Name({ initialName }: NameProps) {
  const [name, setName] = useState<string | undefined>(initialName);
  const [originalName] = useState<string | undefined>(initialName);

  const debounceSafeName = useRef(
    debounce(async (currentName: string) => {
      if (!currentName.trim()) {
        setName(originalName);
        return;
      }

      if (currentName !== name) {
        try {
          const response = await changeName({ name: currentName });

          if (response.success) {
            setName(response.name);
          } else {
            setName(originalName);
            toast.error("Erro ao alterar o nome.");
          }

          toast.success("Nome alterado com sucesso!");
        } catch (error) {
          toast.error("Erro ao alterar o nome.");
          setName(originalName);
        }
      }
    }, 500)
  ).current;

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    setName(newName);
    debounceSafeName(newName);
  }
  return (
    <input
      type="text"
      value={name}
      onChange={handleChangeName}
      className="text-xl md:text-2xl font-bold bg-gray-50 border border-gray-100 rounded-md outline-none p-2 w-full max-w-2xl text-center my-3"
    />
  );
}
