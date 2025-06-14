"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUpIcon, ZapIcon } from "lucide-react";

import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useCustomForm } from "../_contexts/custom-form";

interface SuggestionProps {
  title: string;
  searchGrowth: number;
  competition: number;
  platforms: string[];
  badgeColor: string;
  borderColor: string;
  trendLabel: string;
  tom: string;
  contentType: string;
  keys: string;
}

export function Suggestion(props: SuggestionProps) {
  const { setFormData } = useCustomForm();

  const handleUseIdea = () => {
    setFormData({
      platform: props.platforms[0] as any,
      contentType: props.contentType as any,
      tom: props.tom as any,
      keys: props.keys,
    });
  };

  return (
    <Card className="bg-transparent gap-3">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <Badge
            className={`${props.badgeColor} border-b ${props.borderColor} capitalize`}
          >
            <ZapIcon className="size-4" />
            {props.competition}
          </Badge>

          <Badge className="bg-purple-600/50 border-b border-purple-600">
            <TrendingUpIcon className="size-4" />
            {props.trendLabel}
          </Badge>
        </div>

        <CardTitle>{props.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <span className="text-muted-foreground text-sm">
          Tópico em alta com potencial viral ({props.searchGrowth} de buscas)
        </span>

        <div className="flex items-center gap-1">
          {props.platforms.map((platform) => {
            if (platform === "linkedin")
              return (
                <IconBrandLinkedin
                  className="size-5 text-muted-foreground mt-2"
                  key={platform}
                />
              );
            if (platform === "instagram")
              return (
                <IconBrandInstagram
                  className="size-5 text-muted-foreground mt-2 ml-2"
                  key={platform}
                />
              );
            if (platform === "tiktok")
              return (
                <IconBrandTiktok
                  className="size-5 text-muted-foreground mt-2 ml-2"
                  key={platform}
                />
              );
            if (platform === "youtube")
              return (
                <IconBrandYoutube
                  className="size-5 text-muted-foreground mt-2 ml-2"
                  key={platform}
                />
              );
          })}
        </div>

        <Button
          onClick={handleUseIdea}
          variant="outline"
          className="mt-4 w-full"
        >
          <ZapIcon className="size-4 mr-2" />
          Usar ideia
        </Button>
      </CardContent>
    </Card>
  );
}
