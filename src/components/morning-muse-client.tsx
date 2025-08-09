
"use client";

import { useState, type FC, useEffect } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Globe,
} from "lucide-react";

import { useMessageGenerator } from "@/hooks/use-message-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SunIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { uiText } from "@/lib/ui-text";

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "es", label: "Español" },
];

export const MorningMuseClient: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("motivational");
  const { currentMessage, getNewMessage } = useMessageGenerator(language, category);
  const { toast } = useToast();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const t = uiText[language] || uiText.en;

  const categories = [
    { value: "shayari", label: t.shayari },
    { value: "joke", label: t.joke },
    { value: "motivational", label: t.motivational },
    { value: "spiritual", label: t.spiritual },
    { value: "festival", label: t.festival },
  ];

  const handleNewMessage = () => {
    setIsFlipped(true);
    setTimeout(() => {
      getNewMessage();
      setIsFlipped(false);
    }, 350);
  };

  const handleCopy = () => {
    if (currentMessage.text) {
      navigator.clipboard.writeText(`${t.goodMorning}\n${currentMessage.text}\n${t.haveANiceDay}`);
      setIsCopied(true);
      toast({ title: t.copiedToClipboard, description: t.shareInspiration });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-8">
      <header className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3 text-3xl font-bold tracking-tight text-primary">
          <SunIcon className="h-8 w-8 animate-spin [animation-duration:15s]" />
          <h1 className="bg-gradient-to-r from-primary via-amber-200 to-primary bg-clip-text text-transparent">
            MorningMuse3D
          </h1>
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px] bg-card/50 backdrop-blur-sm">
            <Globe className="mr-2 h-4 w-4" />
            <SelectValue placeholder={t.language} />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={category === cat.value ? "default" : "secondary"}
            onClick={() => setCategory(cat.value)}
            className="transition-all hover:scale-105"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="w-full perspective-1000">
        <div
          className="relative w-full transform-style-preserve-3d transition-transform duration-700"
          style={{ transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'}}
        >
          <Card className="min-h-[200px] w-full backface-hidden flex items-center justify-center bg-card/30 backdrop-blur-md border-border/50 shadow-2xl shadow-primary/10">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-foreground/80">{t.goodMorning}</p>
              <p className="my-4 text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
                {currentMessage.text}
              </p>
              <p className="text-lg text-foreground/80">{t.haveANiceDay}</p>
            </CardContent>
          </Card>
          <Card className="absolute top-0 min-h-[200px] w-full rotate-y-180 backface-hidden flex items-center justify-center bg-card/30 backdrop-blur-md border-border/50 shadow-2xl shadow-primary/10">
             <CardContent className="p-6 text-center">
                <p className="text-lg text-foreground/80">{t.goodMorning}</p>
                <p className="my-4 text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
                  {currentMessage.text}
                </p>
                <p className="text-lg text-foreground/80">{t.haveANiceDay}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <Button onClick={handleCopy} size="lg" variant="outline" className="bg-card/50 backdrop-blur-sm">
          {isCopied ? <Check /> : <Copy />}
          {isCopied ? t.copied : t.copyText}
        </Button>
        <Button onClick={handleNewMessage} size="lg" variant="secondary">
          <RefreshCw className={cn(isFlipped && "animate-spin")} style={{animationDuration: '700ms'}}/>
          {t.showAnother}
        </Button>
      </div>
    </div>
  );
};
