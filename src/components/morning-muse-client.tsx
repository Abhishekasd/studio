"use client";

import { useState, useTransition, type FC } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Image as ImageIcon,
  Loader,
  Globe,
} from "lucide-react";
import Image from "next/image";

import { useMessageGenerator } from "@/hooks/use-message-generator";
import { generateImageAction } from "@/app/actions.ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "es", label: "Español" },
];

const categories = [
  { value: "shayari", label: "📜 Shayari" },
  { value: "joke", label: "😂 Joke" },
  { value: "motivational", label: "💪 Motivational" },
  { value: "spiritual", label: "🧘 Spiritual" },
];

export const MorningMuseClient: FC = () => {
  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("motivational");
  const { currentMessage, getNewMessage } = useMessageGenerator(language, category);
  const { toast } = useToast();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, startGenerating] = useTransition();
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleNewMessage = () => {
    setIsFlipped(true);
    setTimeout(() => {
      getNewMessage();
      setIsFlipped(false);
    }, 350);
  };

  const handleCopy = () => {
    if (currentMessage.text) {
      navigator.clipboard.writeText(currentMessage.text);
      setIsCopied(true);
      toast({ title: "Copied to clipboard!", description: "Share the inspiration." });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleGenerateImage = () => {
    if (!currentMessage.text) return;
    setGeneratedImage(null); // Clear previous image
    startGenerating(async () => {
      try {
        const result = await generateImageAction({
          message: currentMessage.text,
          category,
        });
        setGeneratedImage(result.imageDataUri);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Image Generation Failed",
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      }
    });
  };

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
            <SelectValue placeholder="Language" />
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
          data-flipped={isFlipped}
          style={{ transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'}}
        >
          <Card className="min-h-[200px] w-full backface-hidden flex items-center justify-center bg-card/30 backdrop-blur-md border-border/50 shadow-2xl shadow-primary/10">
            <CardContent className="p-6">
              <p className="text-center text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
                {currentMessage.text}
              </p>
            </CardContent>
          </Card>
          <Card className="absolute top-0 min-h-[200px] w-full rotate-y-180 backface-hidden flex items-center justify-center bg-card/30 backdrop-blur-md border-border/50 shadow-2xl shadow-primary/10">
             <CardContent className="p-6">
              <p className="text-center text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
                {currentMessage.text}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
        <Button onClick={handleCopy} size="lg" variant="outline" className="bg-card/50 backdrop-blur-sm">
          {isCopied ? <Check /> : <Copy />}
          {isCopied ? "Copied!" : "Copy Text"}
        </Button>
        <Button onClick={handleGenerateImage} size="lg" disabled={isGenerating}>
          {isGenerating ? <Loader className="animate-spin" /> : <ImageIcon />}
          {isGenerating ? "Creating..." : "Generate Image"}
        </Button>
        <Button onClick={handleNewMessage} size="lg" variant="secondary">
          <RefreshCw className={cn(isFlipped && "animate-spin")} style={{animationDuration: '700ms'}}/>
          Show Another
        </Button>
      </div>

      <Dialog open={!!generatedImage || isGenerating} onOpenChange={(open) => !open && setGeneratedImage(null)}>
        <DialogContent className="max-w-xl bg-card/80 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Your Morning Muse Image</DialogTitle>
            <DialogDescription>
              Here is your generated image. Feel free to download and share it!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-border bg-background/50 min-h-[300px]">
            {isGenerating && !generatedImage && (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p>Generating your masterpiece...</p>
              </div>
            )}
            {generatedImage && (
              <Image
                src={generatedImage}
                alt="Generated inspirational message"
                width={512}
                height={512}
                className="rounded-md"
                data-ai-hint="inspiration quote"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
