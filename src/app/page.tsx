import { FeatureCard } from "@/components/FeatureCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth";
import {
  ArrowRight,
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
  CrownIcon,
  DollarSignIcon,
  HandCoins,
  Heart,
  RocketIcon,
  Shield,
  SparkleIcon,
  Wand2Icon,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  async function handleRegister() {
    "use server";
    await signIn("github", { redirectTo: "/dashboard" });
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b py-6 px-4 sticky top-0 z-50 bg-background/30 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
            <HandCoins className="h-6 w-6 mr-2 text-pink-600" />
            <span>DonArt</span>
          </div>

          <nav className="flex items-center space-x-6">
            <Button asChild variant="link">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-white"
                href="#features"
              >
                Recursos
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-white"
                href="#pricing"
              >
                Planos
              </Link>
            </Button>
            <Button
              className="text-sm font-medium hover:underline underline-offset-4 text-white"
              onClick={handleRegister}
              variant="link"
            >
              Entrar
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-500/20 via-purple-600/20 to-pink-500/20 px-4 py-12 md:py-32 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Badge
                variant="secondary"
                className="w-fit bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 text-md"
              >
                🚀 Powered by RevoCode
              </Badge>

              <div className="text-center max-w-3xl mx-auto space-y-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Crie Conteúdo
                  </span>
                  <br />
                  <span className="text-white">que Viraliza</span>
                </h1>
                <p className="max-w-4xl text-muted-foreground md:text-xl">
                  Transforme suas ideias em conteúdo viral com IA, monetize
                  globalmente e construa uma audiência engajada em todas as
                  plataformas.{" "}
                  <span className="font-semibold text-purple-400">
                    Tudo em um só lugar.
                  </span>
                </p>
              </div>

              <Button
                className="text-white flex items-center gap-2 mt-6"
                variant="outline"
                onClick={handleRegister}
              >
                <span>Começar Gratuitamente</span>
                <ArrowRightIcon className="size-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-950/20">
          <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center gap-8">
            <Badge className="px-4 py-2 bg-purple-900/50 text-purple-300 border-purple-800">
              Recursos Poderosos
            </Badge>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                <span>Tudo que você precisa para</span>
                <br />
                <span className="bg-gradient-to-b from-purple-4oo via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  dominar as redes sociais
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[900px] mx-auto">
                Uma plataforma completa que combina criação de conteúdo com IA,
                monetização.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Card 1 */}
              <Card className="shadow-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group border-0">
                <CardHeader>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg size-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Wand2Icon className="size-8" />
                  </div>
                  <CardTitle className="mt-4 text-lg font-semibold">
                    Content Studio IA
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Gere posts profissionais em segundos com IA do Gemini.
                    Adapte automaticamente para cada plataforma com precisão.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div>
                    <CheckIcon className="h-5 w-5 text-purple-500 inline-block mr-2" />
                    <span>Ideias ilimitadas personalizadas</span>
                  </div>
                  <div>
                    <CheckIcon className="h-5 w-5 text-purple-500 inline-block mr-2" />
                    <span>Formatação multi-plataforma</span>
                  </div>
                  <div>
                    <CheckIcon className="h-5 w-5 text-purple-500 inline-block mr-2" />
                    <span>Hashtags trending automáticas</span>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="shadow-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group border-0">
                <CardHeader>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg size-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <DollarSignIcon className="size-8" />
                  </div>
                  <CardTitle className="mt-4 text-lg font-semibold">
                    Monetização
                  </CardTitle>
                  <CardDescription className="text-base text-gray-300 leading-relaxed">
                    Construa uma audiência global e monetize seu conteúdo com
                    facilidade usando ferramentas poderosas e intuitivas.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div>
                    <CheckIcon className="h-5 w-5 text-purple-500 inline-block mr-2" />
                    <span>Pagamentos instantâneos</span>
                  </div>
                  <div>
                    <CheckIcon className="h-5 w-5 text-purple-500 inline-block mr-2" />
                    <span>Perfil personalizado</span>
                  </div>
                  <div>
                    <CheckIcon className="h-5 w-5 text-purple-500 inline-block mr-2" />
                    <span>Comissões baixas (10%)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-950">
          <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center gap-8">
            <Badge className="px-4 py-2 bg-green-600/30 text-white border-green-600">
              Preços Acessíveis
            </Badge>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                <span>Planos que</span>
                <br />
                <span className="bg-gradient-to-b from-purple-4oo via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  crescem com você
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[900px] mx-auto">
                Escolha o plano ideal para suas necessidades, com recursos
                avançados e preços acessíveis. Comece gratuitamente e evolua
                conforme seu sucesso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {/* Starter Pricing */}
              <Card className="p-10 bg-gray-900 flex flex-col justify-between">
                <CardHeader>
                  <div className="size-20 border-2 mx-auto rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center">
                    <RocketIcon className="size-8 text-white" />
                  </div>

                  <div className="text-center">
                    <CardTitle className="text-3xl">Starter</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Perfeito para começar
                    </CardDescription>
                  </div>
                </CardHeader>

                <div>
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-purple-500">
                      Gratuito
                    </span>
                  </div>
                </div>

                <CardContent className="space-y-5">
                  <div className="flex items-center">
                    <CheckIcon className="size-6 text-purple-500 mr-4" />
                    <span className="text-base">5 posts IA por mês</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="size-6 text-purple-500 mr-4" />
                    <span className="text-base">1 plataforma</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="size-6 text-purple-500 mr-4" />
                    <span className="text-base">Perfil básico de doações</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="size-6 text-purple-500 mr-4" />
                    <span className="text-base">Suporte por email</span>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      10% comissão sobre doações
                    </p>
                  </div>
                </CardContent>

                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleRegister}
                  >
                    Começar Agora
                  </Button>
                </div>
              </Card>

              {/* Creator Pricing */}
              <Card className="p-10 border-purple-600 bg-gray-950 shadow-2xl shadow-purple-600/30">
                <CardHeader>
                  <div className="flex items-center justify-center mb-3">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-base font-semibold">
                      Mais Popular
                    </Badge>
                  </div>

                  <div className="size-20 border-2 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                    <SparkleIcon className="size-8 text-white" />
                  </div>

                  <div className="text-center">
                    <CardTitle className="text-3xl">Creator</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Para criadores sérios
                    </CardDescription>
                  </div>
                </CardHeader>

                <div>
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-purple-500">
                      R$ 29/mês
                    </span>
                  </div>
                </div>

                <CardContent className="space-y-5">
                  <div className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="text-base">100 posts IA por mês</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="text-base">Todas as plataformas</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="text-base">Assistente IA completo</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="text-base">Suporte prioritário</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      10% comissão sobre doações
                    </p>
                  </div>
                </CardContent>

                <div>
                  <Button
                    variant="outline"
                    className="w-full bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
                    onClick={handleRegister}
                  >
                    Começar Agora
                  </Button>
                </div>
              </Card>

              {/* Pro Pricing */}
              <Card className="p-10 bg-gray-900 flex flex-col justify-between">
                <CardHeader>
                  <div className="size-20 border-2 mx-auto rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center">
                    <CrownIcon className="size-8 text-white" />
                  </div>

                  <div className="text-center">
                    <CardTitle className="text-3xl">Pro</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Para profissionais
                    </CardDescription>
                  </div>
                </CardHeader>

                <div>
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-purple-500">
                      R$ 79/mês
                    </span>
                  </div>
                </div>

                <CardContent className="space-y-5">
                  <div className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="text-base">Posts IA ilimitados</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="text-base">Todas as plataformas</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="text-base">Assistente IA completo</span>
                  </div>

                  <div className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="text-base">Suporte 24/7</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      8% comissão sobre doações
                    </p>
                  </div>
                </CardContent>

                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleRegister}
                  >
                    Começar Agora
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
