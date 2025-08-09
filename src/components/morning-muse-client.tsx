
"use client";

import { useState, type FC, useEffect } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Globe,
  Loader,
  Image as ImageIcon,
  Download,
  X,
  Share2,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { SunIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { uiText } from "@/lib/ui-text";
import { generateImage } from "@/ai/flows/image-generation-flow";

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
  const { currentMessage, getNewMessage, isLoading } = useMessageGenerator(language, category);
  const { toast } = useToast();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  
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
  
  const handleCategoryChange = (newCategory: string) => {
    if(category === newCategory && newCategory !== 'festival') return;
    
    if (newCategory !== 'festival') {
      setIsFlipped(true);
      setTimeout(() => {
        setCategory(newCategory);
        setIsFlipped(false);
      }, 350)
    } else {
      setCategory(newCategory);
    }
  }

  const handleGenerateImage = async () => {
    if (!currentMessage.text) return;
    setIsImageGenerating(true);
    setShowImageDialog(true);
    setGeneratedImage(null);
    try {
      const result = await generateImage({ prompt: currentMessage.text });
      setGeneratedImage(result.imageDataUri);
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Image Generation Failed",
        description: "Could not generate an image. Please try again.",
        variant: "destructive",
      });
      setShowImageDialog(false);
    } finally {
      setIsImageGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "morning-muse-art.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleShareImage = async () => {
    if (!generatedImage || !currentMessage.text) return;

    if (!navigator.share) {
      toast({
        title: "Sharing Not Supported",
        description: "Your browser doesn't support this feature.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], "morning-muse-art.png", { type: blob.type });

      await navigator.share({
        title: t.generatedImageTitle,
        text: currentMessage.text,
        files: [file],
      });
       toast({ title: t.imageShared });
    } catch (error) {
      if (error instanceof Error && (error.name === 'AbortError' || error.name === 'NotAllowedError')) {
        // Silently ignore the error if the user cancels the share dialog
        return;
      }
      
      console.error("Error sharing image:", error);
      toast({
        title: t.shareFailed,
        description: "An error occurred while trying to share.",
        variant: "destructive",
      });
    }
  };


  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
    <>
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
              onClick={() => handleCategoryChange(cat.value)}
              className="transition-all hover:scale-105"
            >
              {cat.value === 'festival' && isLoading ? <Loader className="animate-spin"/> : cat.label}
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
                  {isLoading && category === 'festival' ? (
                      <div className="flex items-center justify-center gap-2 text-lg text-foreground/80">
                          <Loader className="animate-spin" />
                          <span>{t.generatingMessage}...</span>
                      </div>
                  ) : (
                      <>
                          <p className="text-lg text-foreground/80">{t.goodMorning}</p>
                          <p className="my-4 text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
                              {currentMessage.text}
                          </p>
                          <p className="text-lg text-foreground/80">{t.haveANiceDay}</p>
                      </>
                  )}
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
          <Button onClick={handleCopy} size="lg" variant="outline" className="bg-card/50 backdrop-blur-sm" disabled={isLoading}>
            {isCopied ? <Check /> : <Copy />}
            {isCopied ? t.copied : t.copyText}
          </Button>
          <Button onClick={handleGenerateImage} size="lg" variant="default" disabled={isLoading || isImageGenerating}>
            {isImageGenerating ? <Loader className="animate-spin" /> : <ImageIcon />}
            {isImageGenerating ? t.generatingImage : t.generateImage}
          </Button>
          <Button onClick={handleNewMessage} size="lg" variant="secondary" disabled={isLoading}>
            <RefreshCw className={cn((isFlipped || (isLoading && category === 'festival')) && "animate-spin")} style={{animationDuration: '700ms'}}/>
            {t.showAnother}
          </Button>
        </div>
      </div>
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{t.generatedImageTitle}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center min-h-[300px] bg-muted/50 rounded-md">
            {isImageGenerating && <Loader className="w-12 h-12 animate-spin text-primary" />}
            {generatedImage && (
              <img src={generatedImage} alt="Generated art" className="rounded-md max-h-[70vh] object-contain" />
            )}
          </div>
          <DialogFooter className="sm:justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setShowImageDialog(false)}>
                <X />{t.close}
            </Button>
            <Button type="button" onClick={handleShareImage} disabled={!generatedImage || isImageGenerating}>
                <Share2 />{t.shareImage}
            </Button>
            <Button type="button" onClick={handleDownloadImage} disabled={!generatedImage || isImageGenerating}>
                <Download />{t.downloadImage}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

    