"use client";

import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState } from "react";

type CreateUsernameResponse = {
  success: boolean;
  error: string | null;
  username?: string;
};

export function UrlPreview() {
  const [resultAction, setResultAction] = useState<CreateUsernameResponse>({
    success: false,
    error: "",
  });

  async function submitAction(formData: FormData) {
    const username = formData.get("username") as string;

    const response = await createUsername({
      username,
    });

    if (!response.success) {
      setResultAction(response);
      return;
    }

    setResultAction({
      success: true,
      error: null,
      username: response.username,
    });
  }

  return (
    <div className="flex justify-center p-2 text-gray-100 flex-1 flex-col gap-2">
      <form
        action={submitAction}
        className="flex flex-1 flex-col gap-4 items-start md:items-center md:flex-row"
      >
        <div className="w-full items-center flex justify-center flex-1">
          <p className="w-fit h-9 rounded-md flex items-center font-semibold text-white">
            {process.env.NEXT_PUBLIC_HOST_URL}/creator/
          </p>
          {/* TODO: Mudar isso aqui para ficar de forma dinâmica */}
          <input
            type="text"
            className="flex-1 outline-none h-9 border border-gray-50 rounded-md px-1 w-full"
            placeholder="Digite seu username..."
            name="username"
          />
        </div>

        <Button
          type="submit"
          className="bg-blue-500 h-9 w-full md:w-fit text-white px-4 rounded-md cursor-pointer hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar
        </Button>
      </form>
      {resultAction && (
        <p className="text-red-500 text-sm">{resultAction.error}</p>
      )}
    </div>
  );
}
