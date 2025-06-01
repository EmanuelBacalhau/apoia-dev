import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutSectionProps {
  bio: string;
  name: string;
}

export function AboutSection({ bio, name }: AboutSectionProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-bold text-shadow-gray-900 flex items-center gap-2">
          <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          Sobre {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">{bio}</p>
        </div>
      </CardContent>
    </Card>
  );
}
