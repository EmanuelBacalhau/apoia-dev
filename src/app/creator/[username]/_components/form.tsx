"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { createPayment } from "../_actions/create-payment";
import { toast } from "sonner";
import { getStripeJs } from "@/lib/stripe-js";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  message: z.string().min(1, {
    message: "Mensagem é obrigatória",
  }),
  price: z.enum(["15", "25", "35"], {
    required_error: "Valor é obrigatório",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FormDonateProps {
  slug: string;
  creatorId: string;
}

export function FormDonate({ slug, creatorId }: FormDonateProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      price: "15",
    },
  });

  async function onSubmit(data: FormSchema) {
    const priceInCents = Number(data.price) * 100;
    const checkout = await createPayment({
      name: data.name,
      message: data.message,
      price: priceInCents,
      slug: slug,
      creatorId: creatorId,
    });

    await handlePaymentResponse(checkout);
  }

  async function handlePaymentResponse(checkout: {
    success: boolean;
    sessionId?: string;
    error: string | null;
  }) {
    if (!checkout.success) {
      toast.error(checkout.error);
      return;
    }

    if (!checkout.sessionId) {
      toast.error("Sessão de pagamento não encontrada.");
      return;
    }

    const stripe = await getStripeJs();

    await stripe?.redirectToCheckout({
      sessionId: checkout.sessionId,
    });
  }

  return (
    <Card className="shadow-lg border-0 bg-white/95 h-fit backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-bold text-shadow-gray-900 flex items-center gap-2">
          <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          Apoiar
        </CardTitle>
        <CardDescription>
          Sua contribuição ajuda a manter o conteúdo!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite sua mensagem"
                      {...field}
                      className="bg-white h-32 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor doação</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="flex items-center gap-3"
                    >
                      {["15", "25", "35"].map((value) => (
                        <div
                          key={value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={value} id={`price-${value}`} />
                          <Label htmlFor={`price-${value}`}>R$ {value}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Processando..." : "Doar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
