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

interface SuggestionProps {
  title: string;
  searchGrowth: number;
  competition: number;
  platforms: string;
  badgeColor: string;
  borderColor: string;
  trendLabel: string;
}

export function Suggestion(props: SuggestionProps) {
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
          {props.platforms.includes("linkedin") && (
            <IconBrandLinkedin className="size-5 text-muted-foreground mt-2" />
          )}
          {props.platforms.includes("instagram") && (
            <IconBrandInstagram className="size-5 text-muted-foreground mt-2 ml-2" />
          )}
          {props.platforms.includes("tiktok") && (
            <IconBrandTiktok className="size-5 text-muted-foreground mt-2 ml-2" />
          )}
          {props.platforms.includes("youtube") && (
            <IconBrandYoutube className="size-5 text-muted-foreground mt-2 ml-2" />
          )}
        </div>

        <Button variant="outline" className="mt-4 w-full">
          <ZapIcon className="size-4 mr-2" />
          Usar ideia
        </Button>
      </CardContent>
    </Card>
  );
}
