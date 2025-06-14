"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconAlertHexagon,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
  IconVideo,
} from "@tabler/icons-react";
import { FileTextIcon, LightbulbIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CompleteContentPost,
  generateContent,
} from "../_actions/generate-content";

const formSchema = z.object({
  platform: z.enum(["linkedin", "instagram", "twitter", "youtube"], {
    required_error: "A plataforma é obrigatória",
    invalid_type_error: "Selecione uma plataforma válida",
  }),
  contentType: z.enum(["post", "article", "video", "shorts", "reel"], {
    required_error: "O tipo de conteúdo é obrigatório",
    invalid_type_error: "Selecione um tipo de conteúdo válido",
  }),
  tom: z.enum(
    ["education", "professional", "casual", "inspirational", "humorous"],
    {
      required_error: "O tom é obrigatório",
      invalid_type_error: "Selecione um tom válido",
    }
  ),
  keys: z.string(),
});

const transformSchema = formSchema.transform((values) => ({
  platform: values.platform,
  contentType: values.contentType,
  tom: values.tom,
  keys: values.keys.split(",").map((key) => key.trim()),
}));

type FormValues = z.infer<typeof formSchema>;

export default function FormContent() {
  const [result, setResult] = useState<CompleteContentPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isLoading]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "linkedin",
      contentType: "post",
      tom: "education",
      keys: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setResult(null);
    const schema = transformSchema.parse(values);

    setIsLoading(true);
    const content = await generateContent({
      platform: schema.platform,
      contentType: schema.contentType,
      tom: schema.tom,
      keys: schema.keys,
    });

    setResult(content);
    setIsLoading(false);
  }

  return (
    <div className="space-y-4">
      <Card className="bg-transparent h-fit">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LightbulbIcon className="size-8 text-muted-foreground" />
            <CardTitle className="text-xl">Configurações do Conteúdo</CardTitle>
          </div>

          <CardDescription>
            Configure os parâmetros para gerar conteúdo personalizado
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plataforma</FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="linkedin">
                              <IconBrandLinkedin className="size-5 text-white" />
                              LinkedIn
                            </SelectItem>

                            <SelectItem value="instagram">
                              <IconBrandInstagram className="size-5 text-white" />
                              Instagram
                            </SelectItem>

                            <SelectItem value="twitter">
                              <IconBrandTiktok className="size-5 text-white" />
                              TikTok
                            </SelectItem>

                            <SelectItem value="youtube">
                              <IconBrandYoutube className="size-5 text-white" />
                              YouTube
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Conteúdo</FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="post">
                              <FileTextIcon className="size-5 text-white" />
                              Post
                            </SelectItem>

                            <SelectItem value="article">
                              <FileTextIcon className="size-5 text-white" />
                              Artigo
                            </SelectItem>

                            <SelectItem value="video">
                              <IconVideo className="size-5 text-white" />
                              Video
                            </SelectItem>

                            <SelectItem value="shorts">
                              <IconVideo className="size-5 text-white" />
                              Shorts
                            </SelectItem>

                            <SelectItem value="reel">
                              <IconVideo className="size-5 text-white" />
                              Reel
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tom</FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="education">Educativo</SelectItem>
                            <SelectItem value="professional">
                              Profissional
                            </SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="inspirational">
                              Inspirador
                            </SelectItem>
                            <SelectItem value="humorous">Engraçado</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="keys"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tópico ou Palavra-chave</FormLabel>

                    <FormDescription className="flex items-center gap-2">
                      <IconAlertHexagon className="size-4 text-yellow-500" />
                      <span>
                        Digite os tópicos ou palavras-chave separados por
                        vírgula. Exemplo: tecnologia, inovação, futuro
                      </span>
                    </FormDescription>

                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Digite os tópicos ou palavras-chave aqui..."
                        className="max-h-36 min-h-36 resize-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="cursor-pointer w-full transition-colors duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <SparklesIcon className="size-4 mr-2" />
                Gerar Conteúdo
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-lg">Conteúdo Gerado</CardTitle>
                <CardDescription>
                  Aqui está o conteúdo gerado pela IA.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Título:</p>
                    <Button
                      variant="outline"
                      className=""
                      onClick={() =>
                        navigator.clipboard.writeText(result.title)
                      }
                    >
                      Copiar
                    </Button>
                  </div>

                  <p className="text-md bg-muted/50 rounded-sm text-center p-2">
                    {result.title}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Texto Principal:</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigator.clipboard.writeText(result.mainText)
                      }
                    >
                      Copiar
                    </Button>
                  </div>

                  <p className="bg-muted/50 rounded-md p-4 text-md whitespace-pre-line">
                    {result.mainText}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Hashtags:</p>

                    <Button
                      variant="outline"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          result.hashtags.join(", ")
                        )
                      }
                    >
                      Copiar
                    </Button>
                  </div>

                  <div className="gap-2 flex flex-wrap items-center">
                    {result.hashtags.map((tag) => (
                      <Badge
                        className="bg-transparent border-muted p-2"
                        key={tag}
                      >
                        <span className="text-sm text-white">{tag}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Chamada para Ação:</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigator.clipboard.writeText(result.callToAction)
                      }
                    >
                      Copiar
                    </Button>
                  </div>

                  <p className="text-md bg-muted/50 rounded-sm text-center p-2">
                    {result.callToAction}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Melhor Horário:</p>

                  <p className="text-md bg-muted/50 rounded-sm text-center p-2">
                    {result.bestTime}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1 bg-green-600/15 rounded-sm text-center p-2">
                    <p className="text-md">{result.engagementRate}</p>
                    <p className="text-white text-sm">Taxa de Engajamento:</p>
                  </div>

                  <div className="space-y-1 bg-blue-600/15 rounded-sm text-center p-2">
                    <p className="text-md">{result.trendingScore}</p>
                    <p className="text-white text-sm">
                      Pontuação de Tendência:
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-lg">Sugestão Visual</CardTitle>
                <CardDescription>
                  Sugestão de como o visual deve ser para o post.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-bold">Tipo:</p>
                  <p className="text-md bg-muted/50 rounded-sm p-2">
                    {result.visualSuggestion.type}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Descrição:</p>
                  <p className="bg-muted/50 rounded-md p-4 text-md whitespace-pre-line">
                    {result.visualSuggestion.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Estilo:</p>
                  <p className="text-md bg-muted/50 rounded-sm p-2 capitalize">
                    {result.visualSuggestion.style}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Cores Sugeridas:</p>
                  <div className="gap-2 flex flex-wrap items-center">
                    {result.visualSuggestion.suggestedColors.map((color) => (
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            key={color}
                            style={{ backgroundColor: color }}
                            className="text-white size-10 rounded-full cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(color)}
                          ></Button>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p className="text-sm text-center">
                            {color} <br />
                            <span className="text-xs">Clique para copiar</span>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Dimensões:</p>
                  <p className="text-md bg-muted/50 rounded-sm text-center p-2">
                    {result.visualSuggestion.dimensions}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg">Variações</CardTitle>
              <CardDescription>
                Sugestões de variações para o conteúdo gerado.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-bold">Versão Curta</p>
                  <p className="text-md bg-muted/50 rounded-sm p-2">
                    {result.variations.short}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold">Pergunta para Engajamento</p>
                  <p className="text-md bg-muted/50 rounded-sm p-2">
                    {result.variations.question}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 h-full">
          <div className="flex items-center space-x-2">
            <div
              className="size-3 bg-purple-600 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="size-3 bg-purple-600 rounded-full animate-bounce duration-200"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="size-3 bg-purple-600 rounded-full animate-bounce duration-400"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
