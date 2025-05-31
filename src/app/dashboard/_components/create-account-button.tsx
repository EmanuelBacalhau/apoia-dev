"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";

export function CreateAccountButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateAccount() {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/stripe/create-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao criar conta Stripe:", errorData);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.error) {
        console.error("Erro ao criar conta Stripe:", data.error);
        setIsLoading(false);
        return;
      }

      location.href = data.url;
    } catch (error) {
      console.error("Erro ao criar conta Stripe:", error);
      setIsLoading(false);
      return;
    }
  }

  return (
    <Button onClick={handleCreateAccount} disabled={isLoading}>
      {isLoading ? "Criando conta..." : "Criar conta Stripe"}
    </Button>
  );
}
