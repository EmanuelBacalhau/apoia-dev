"use client";

import { createContext, useContext, useState } from "react";

export enum ContentType {
  Post = "post",
  Article = "article",
  Video = "video",
  Shorts = "shorts",
  Reel = "reel",
}

export enum Platform {
  Instagram = "instagram",
  TikTok = "tiktok",
  YouTube = "youtube",
  LinkedIn = "linkedin",
}

export enum Tom {
  Education = "education",
  Professional = "professional",
  Casual = "casual",
  Inspirational = "inspirational",
  Humorous = "humorous",
}

interface FormData {
  platform: Platform;
  contentType: ContentType;
  tom: Tom;
  keys: string;
}

interface CustomFormContextProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const CustomFormContext = createContext<CustomFormContextProps>({
  formData: {
    platform: Platform.Instagram,
    contentType: ContentType.Post,
    tom: Tom.Education,
    keys: "",
  },
  setFormData: () => {},
});

export function CustomFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<FormData>({
    platform: Platform.Instagram,
    contentType: ContentType.Post,
    tom: Tom.Education,
    keys: "",
  });

  return (
    <CustomFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </CustomFormContext.Provider>
  );
}

export function useCustomForm() {
  const context = useContext(CustomFormContext);
  return context;
}
