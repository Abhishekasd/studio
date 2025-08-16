
"use client";

import { useState, type FC, useEffect, useRef } from "react";
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
  Mail,
  Sparkles,
  Palette,
  Heart,
  Handshake,
  Gift,
  Cake,
  PartyPopper,
  Upload,
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
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { SunIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { uiText } from "@/lib/ui-text";
import { generateImage } from "@/ai/flows/image-generation-flow";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "sa", label: "संस्कृतम्" },
  { value: "ur", label: "اردو" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
];

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2z" />
        </svg>
    )
}
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.4 16.86L2.05 22L7.31 20.65C8.75 21.41 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM17.44 15.13C17.22 15.66 16.33 16.14 15.86 16.29C15.39 16.44 14.78 16.5 14.12 16.3C13.53 16.11 12.55 15.78 11.53 14.82C10.28 13.64 9.49 12.22 9.24 11.75C8.99 11.28 8.24 10.14 8.24 9.07C8.24 8 8.44 7.42 8.63 7.23C8.82 7.04 9.11 6.95 9.35 6.95C9.53 6.95 9.69 6.95 9.83 6.95C10.01 6.95 10.18 6.91 10.36 7.37C10.55 7.83 11.01 9.03 11.1 9.17C11.18 9.31 11.23 9.47 11.14 9.64C11.05 9.81 10.99 9.89 10.85 10.05C10.72 10.21 10.58 10.35 10.45 10.47C10.33 10.58 10.19 10.71 10.36 10.99C10.53 11.27 11.03 12.01 11.73 12.65C12.62 13.48 13.29 13.78 13.57 13.92C13.85 14.06 14.02 14.03 14.19 13.86C14.41 13.64 14.65 13.31 14.93 12.96C15.15 12.68 15.42 12.62 15.69 12.72C15.96 12.82 16.94 13.34 17.16 13.43C17.38 13.52 17.53 13.58 17.59 13.67C17.65 13.76 17.65 14.6 17.44 15.13Z" />
        </svg>
    );
}

export const MorningMuseClient: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("greeting");
  const [personName, setPersonName] = useState("");
  const [personCharacteristics, setPersonCharacteristics] = useState("");
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [greetingImageSubCategory, setGreetingImageSubCategory] = useState("simple");
  const { currentMessage, getNewMessage, isLoading, isPersonalizedCategory } = useMessageGenerator(language, category);
  const { toast } = useToast();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showShareOptionsDialog, setShowShareOptionsDialog] = useState(false);
  const [canShare, setCanShare] = useState(false);
  
  const t = uiText[language] || uiText.en;

  const categories = [
    { value: "greeting", label: t.greeting, icon: Sparkles },
    { value: "festival", label: t.festival, icon: PartyPopper },
    { value: "motivational", label: t.motivational },
    { value: "spiritual", label: t.spiritual },
    { value: "shayari", label: t.shayari },
    { value: "joke", label: t.joke },
    { value: "thankyou", label: t.thankyou, icon: Gift },
    { value: "welcome", label: t.welcome, icon: Handshake },
    { value: "birthday", label: t.birthday, icon: Cake },
    { value: "anniversary", label: t.anniversary, icon: Heart },
  ];
  
  useEffect(() => {
    if (navigator.share && navigator.canShare) {
        setCanShare(true);
    }
  }, []);

  const handleNewMessage = (name?: string, characteristics?: string) => {
    setIsFlipped(true);
    setTimeout(() => {
      getNewMessage(name, characteristics);
      setIsFlipped(false);
    }, 350);
  };

  const handlePersonalizedMessage = () => {
    if (!personName.trim()) {
      toast({
        title: t.nameRequiredTitle,
        description: t.nameRequiredDesc,
        variant: "destructive",
      });
      return;
    }
    handleNewMessage(personName, personCharacteristics);
  }

  const handleCopy = () => {
    if (currentMessage.text) {
      const siteUrl = "https://morningmuse.netlify.app/";
      let shareText = `${currentMessage.text}\n\n${t.shareMessage} ${siteUrl}`;
      if (category === 'greeting') {
        shareText = `${t.goodMorning}\n${currentMessage.text}\n${t.haveANiceDay}\n\n${t.shareMessage} ${siteUrl}`;
      }
      navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      toast({ title: t.copiedToClipboard, description: t.shareInspiration });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  
  const handleCategoryChange = (newCategory: string) => {
    if(category === newCategory && newCategory !== 'festival') return;
    
    setIsFlipped(true);
    setTimeout(() => {
      setCategory(newCategory);
      setPersonName("");
      setPersonCharacteristics("");
      setPersonImage(null);
      setIsFlipped(false);
    }, 350)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
    if (!currentMessage.text) return;
    setIsImageGenerating(true);
    setShowImageDialog(true);
    setGeneratedImage(null);
    try {
      const result = await generateImage({ 
        prompt: currentMessage.text,
        language: language,
        category: category,
        subCategory: category === 'greeting' ? greetingImageSubCategory : undefined,
        name: isPersonalizedCategory ? personName : undefined,
        photoDataUri: isPersonalizedCategory ? personImage : undefined,
      });
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
    if (!generatedImage) return;

    const shareData = {
      title: 'MorningMuse3D Art',
      text: `${t.shareImageText} https://morningmuse.netlify.app/`,
    };

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], 'morning-muse-art.png', { type: blob.type });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          ...shareData,
          files: [file],
        });
      } else {
        setShowShareOptionsDialog(true);
      }
    } catch (error) {
      console.error('Error sharing image:', error);
      toast({
        title: "Sharing Failed",
        description: "Could not share the image. Please try our fallback options.",
        variant: "destructive",
      });
      setShowShareOptionsDialog(true);
    }
  };

  const handleFallbackShare = (platform: 'whatsapp' | 'telegram' | 'email') => {
    if (!generatedImage) return;
    const text = encodeURIComponent(`${t.shareImageText} https://morningmuse.netlify.app/`);
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://web.whatsapp.com/send?text=${text}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent('https://morningmuse.netlify.app/')}&text=${text}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(t.shareImageSubject)}&body=${text}`;
        break;
    }
    window.open(url, '_blank');
  };
  
  const cardContent = () => {
    if (isLoading && !isPersonalizedCategory) {
       return (
        <div className="flex items-center justify-center gap-2 text-lg text-foreground/80">
          <Loader className="animate-spin" />
          <span>{category === 'festival' ? t.generatingFestivalMessage : t.generatingMessage}...</span>
        </div>
      );
    }

    if (isPersonalizedCategory && !currentMessage.text) {
      return (
        <p className="text-lg text-center text-foreground/80">{t.enterNamePrompt}</p>
      )
    }

    if (isPersonalizedCategory && isLoading) {
      return (
        <div className="flex items-center justify-center gap-2 text-lg text-foreground/80">
          <Loader className="animate-spin" />
          <span>{t.generatingPersonalizedMessage}...</span>
        </div>
      )
    }
    
    if (category === 'greeting') {
      return (
        <>
          <p className="text-lg md:text-xl text-foreground/80">{t.goodMorning}</p>
          <p className="my-4 text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
            {currentMessage.text}
          </p>
          <p className="text-lg md:text-xl text-foreground/80">{t.haveANiceDay}</p>
        </>
      );
    }
    
    return (
      <p className="my-4 text-xl md:text-2xl font-medium leading-relaxed text-foreground/90">
        {currentMessage.text}
      </p>
    );
  }

  if (!isMounted) {
    return (
      <div className="fixed inset-0 -z-20 h-full w-full bg-gradient-to-b from-[hsl(220,40%,10%)] to-[hsl(220,40%,4%)]" />
    );
  }

  return (
    <>
      <div className="flex w-full max-w-2xl flex-col items-center gap-6 md:gap-8 px-4">
        <header className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            <SunIcon className="h-7 w-7 sm:h-8 sm:w-8 animate-spin [animation-duration:15s]" />
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
              size="sm"
            >
              {cat.icon && isLoading && category === 'festival' ? <Loader className="animate-spin mr-2 h-4 w-4"/> : cat.icon ? <cat.icon className="mr-2 h-4 w-4"/> : null}
              {cat.label}
            </Button>
          ))}
        </div>
        
        {isPersonalizedCategory && (
            <div className="w-full max-w-md space-y-4 flex flex-col items-center">
              <div className="w-full space-y-2">
                <Label htmlFor="personName" className="text-foreground/80">{t.enterNameLabel}</Label>
                <Input 
                  id="personName"
                  type="text" 
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="bg-card/50 backdrop-blur-sm"
                />
              </div>

              {(category === 'birthday' || category === 'anniversary') && (
                <div className="w-full space-y-2">
                    <Label htmlFor="personCharacteristics" className="text-foreground/80">{t.characteristicsLabel}</Label>
                    <Textarea 
                        id="personCharacteristics"
                        value={personCharacteristics}
                        onChange={(e) => setPersonCharacteristics(e.target.value)}
                        placeholder={t.characteristicsPlaceholder}
                        className="bg-card/50 backdrop-blur-sm"
                    />
                </div>
              )}

              <div className="w-full space-y-2">
                <Label htmlFor="personImage" className="text-foreground/80">{t.uploadImageLabel}</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="personImage"
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-card/50 backdrop-blur-sm flex-grow file:text-xs"
                  />
                  {personImage && (
                    <Button variant="ghost" size="icon" onClick={() => setPersonImage(null)} aria-label="Remove image">
                      <X className="h-5 w-5 text-destructive"/>
                    </Button>
                  )}
                </div>
                {personImage && (
                  <div className="mt-2 relative w-24 h-24 rounded-md overflow-hidden border border-border">
                    <img src={personImage} alt="Preview" className="w-full h-full object-cover"/>
                  </div>
                )}
              </div>

              <Button onClick={handlePersonalizedMessage} disabled={isLoading || !personName.trim()} className="w-full">
                {isLoading ? <Loader className="animate-spin" /> : <Sparkles />}
                {t.generateButton}
              </Button>
            </div>
        )}

        {category === 'greeting' && (
          <div className="w-full space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg bg-card/30 backdrop-blur-md p-2 border-border/50">
               <span className="text-sm font-medium text-foreground/80 mr-2">{t.imageTypePrompt}</span>
                <Button
                    variant={greetingImageSubCategory === 'simple' ? 'default' : 'outline'}
                    onClick={() => setGreetingImageSubCategory('simple')}
                    size="sm"
                    className="transition-all text-xs"
                >
                    <Palette className="mr-2 h-4 w-4" />
                    {t.subCategorySimple}
                </Button>
                <Button
                    variant={greetingImageSubCategory === 'spiritual' ? 'default' : 'outline'}
                    onClick={() => setGreetingImageSubCategory('spiritual')}
                    size="sm"
                    className="transition-all text-xs"
                >
                    <Heart className="mr-2 h-4 w-4" />
                    {t.subCategorySpiritual}
                </Button>
            </div>
          </div>
        )}

        <div className="w-full perspective-1000">
          <div
            className="relative w-full transform-style-preserve-3d transition-transform duration-700"
            style={{ transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'}}
          >
            <Card className="min-h-[200px] w-full backface-hidden flex items-center justify-center bg-card/30 backdrop-blur-md border-border/50 shadow-2xl shadow-primary/10">
              <CardContent className="p-6 text-center">
                  {cardContent()}
              </CardContent>
            </Card>
            <Card className="absolute top-0 min-h-[200px] w-full rotate-y-180 backface-hidden flex items-center justify-center bg-card/30 backdrop-blur-md border-border/50 shadow-2xl shadow-primary/10">
               <CardContent className="p-6 text-center">
                  {cardContent()}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 w-full max-w-2xl">
          <Button onClick={handleCopy} size="lg" variant="outline" className="bg-card/50 backdrop-blur-sm text-xs sm:text-sm" disabled={isLoading || !currentMessage.text}>
            {isCopied ? <Check /> : <Copy />}
            {isCopied ? t.copied : t.copyText}
          </Button>
          <Button onClick={handleGenerateImage} size="lg" variant="default" className="text-xs sm:text-sm" disabled={isLoading || isImageGenerating || !currentMessage.text}>
            {isImageGenerating ? <Loader className="animate-spin" /> : <ImageIcon />}
            {isImageGenerating ? t.generatingImage : t.generateImage}
          </Button>
          <Button onClick={() => handleNewMessage(isPersonalizedCategory ? personName : undefined, isPersonalizedCategory ? personCharacteristics : undefined)} size="lg" variant="secondary" className="col-span-2 sm:col-span-1 text-xs sm:text-sm" disabled={isLoading || (isPersonalizedCategory && !personName.trim())}>
            <RefreshCw className={cn(isFlipped || (isLoading && !isPersonalizedCategory) && "animate-spin")} style={{animationDuration: '700ms'}}/>
            {t.showAnother}
          </Button>
        </div>
      </div>
      <div className="w-full max-w-4xl p-4 sm:p-8 text-foreground/80 space-y-12 mt-12">
        <Separator className="my-8 bg-border/50" />
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">{t.welcomeTitle}</h2>
          <p className="text-base sm:text-lg leading-relaxed text-center">
            {t.welcomePara1}
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-center mt-4">
            {t.welcomePara2} <span className="font-semibold text-primary/90">{t.languageNames}</span>, {t.welcomePara3}
          </p>
        </section>

        <Separator className="my-8 bg-border/50" />
        
          <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">{t.whyTitle}</h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify">
            {t.whyPara1}
          </p>
            <p className="text-base sm:text-lg leading-relaxed text-justify mt-4">
            {t.whyPara2}
          </p>
        </section>

        <Separator className="my-8 bg-border/50" />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">{t.howTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-card/30 p-6 rounded-lg border border-border/50">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">{t.howStep1Title}</h3>
              <p className="text-sm sm:text-base">{t.howStep1Desc}</p>
            </div>
            <div className="bg-card/30 p-6 rounded-lg border border-border/50">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">{t.howStep2Title}</h3>
              <p className="text-sm sm:text-base">{t.howStep2Desc}</p>
            </div>
            <div className="bg-card/30 p-6 rounded-lg border border-border/50">
              <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">{t.howStep3Title}</h3>
              <p className="text-sm sm:text-base">{t.howStep3Desc}</p>
            </div>
          </div>
        </section>
        
        <Separator className="my-8 bg-border/50" />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">{t.categoriesTitle}</h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p><strong className="text-secondary">{t.catGreetingTitle}</strong> {t.catGreetingDesc}</p>
            <p><strong className="text-secondary">{t.catFestivalTitle}</strong> {t.catFestivalDesc}</p>
            <p><strong className="text-secondary">{t.catMotivationalTitle}</strong> {t.catMotivationalDesc}</p>
            <p><strong className="text-secondary">{t.catSpiritualTitle}</strong> {t.catSpiritualDesc}</p>
            <p><strong className="text-secondary">{t.catShayariTitle}</strong> {t.catShayariDesc}</p>
            <p><strong className="text-secondary">{t.catJokeTitle}</strong> {t.catJokeDesc}</p>
            <p><strong className="text-secondary">{t.catThankyouTitle}</strong> {t.catThankyouDesc}</p>
            <p><strong className="text-secondary">{t.catWelcomeTitle}</strong> {t.catWelcomeDesc}</p>
            <p><strong className="text-secondary">{t.catBirthdayTitle}</strong> {t.catBirthdayDesc}</p>
            <p><strong className="text-secondary">{t.catAnniversaryTitle}</strong> {t.catAnniversaryDesc}</p>
          </div>
        </section>

        <Separator className="my-8 bg-border/50" />
          <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">{t.uniqueTitle}</h2>
          <p className="text-base sm:text-lg leading-relaxed text-center">
            {t.uniquePara}
          </p>
        </section>
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-md sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{t.generatedImageTitle}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center min-h-[300px] bg-muted/50 rounded-md">
            {isImageGenerating && <Loader className="w-12 h-12 animate-spin text-primary" />}
            {generatedImage && (
              <img src={generatedImage} alt="Generated art" className="rounded-md max-h-[70vh] object-contain" />
            )}
          </div>
          <DialogFooter className="flex flex-row sm:justify-end gap-2">
            
              <Button type="button" onClick={handleShareImage} disabled={!generatedImage || isImageGenerating}>
                  <Share2 />{t.shareImage}
              </Button>
            
            <Button type="button" onClick={handleDownloadImage} disabled={!generatedImage || isImageGenerating}>
                <Download />{t.downloadImage}
            </Button>
             <Button type="button" variant="secondary" onClick={() => setShowImageDialog(false)}>
                <X />{t.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showShareOptionsDialog} onOpenChange={setShowShareOptionsDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.shareTitle}</DialogTitle>
            <DialogDescription>{t.shareDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
              <Button onClick={() => handleFallbackShare('whatsapp')} variant="outline" size="lg">
                  <WhatsAppIcon className="mr-2 h-6 w-6"/>
                  {t.shareOnWhatsApp}
              </Button>
              <Button onClick={() => handleFallbackShare('telegram')} variant="outline" size="lg">
                  <TelegramIcon className="mr-2 h-6 w-6" />
                  {t.shareOnTelegram}
              </Button>
              <Button onClick={() => handleFallbackShare('email')} variant="outline" size="lg">
                  <Mail className="mr-2 h-6 w-6" />
                  {t.shareOnEmail}
              </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

    