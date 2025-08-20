
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
  PartyPopper,
  Cake,
  HeartHandshake,
  User,
  Star,
  Upload,
  Search,
  ArrowLeft,
  Lightbulb,
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "./ui/scroll-area";

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
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasVisited = localStorage.getItem('hasVisitedMorningMuse');
    if (!hasVisited) {
      setShowWelcomeDialog(true);
    }
  }, []);

  const handleCloseWelcomeDialog = () => {
    localStorage.setItem('hasVisitedMorningMuse', 'true');
    setShowWelcomeDialog(false);
  }

  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("greeting");
  const [greetingImageSubCategory, setGreetingImageSubCategory] = useState("simple");
  const [customPrompt, setCustomPrompt] = useState("");
  
  const [personName, setPersonName] = useState("");
  const [personCharacteristics, setPersonCharacteristics] = useState("");
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [isConvertingImage, setIsConvertingImage] = useState(false);

  const { currentMessage, getNewMessage, isLoading } = useMessageGenerator(
    language,
    category,
    { name: personName, characteristics: personCharacteristics }
  );

  const { toast } = useToast();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
    { value: "anniversary", label: t.anniversary, icon: HeartHandshake },
  ];
  
  useEffect(() => {
    if (navigator.share && navigator.canShare) {
        setCanShare(true);
    }
  }, []);

  const handleNewMessage = () => {
    setIsFlipped(true);
    setTimeout(() => {
      getNewMessage();
      setIsFlipped(false);
    }, 350);
  };

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
    if(category === newCategory && !['festival', 'birthday', 'anniversary'].includes(newCategory)) return;
    
    setIsFlipped(true);
    setTimeout(() => {
      setCategory(newCategory);
      setIsFlipped(false);
    }, 350)
  }

  const handleGenerateImage = async (prompt?: string, imageCategory?: string) => {
    const textToGenerate = prompt || currentMessage.text;
    if (!textToGenerate) return;

    setIsImageGenerating(true);
    setShowImageDialog(true);
    setGeneratedImages(null);
    setSelectedImage(null);
    try {
      const result = await generateImage({ 
        prompt: textToGenerate,
        language: language,
        category: imageCategory || category,
        subCategory: category === 'greeting' ? greetingImageSubCategory : undefined,
        name: personName,
        photoDataUri: personImage || undefined,
      });
      setGeneratedImages(result.imageDataUris);
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast({
        title: "Image Generation Failed",
        description: error.message || "Could not generate an image. Please try again later.",
        variant: "destructive",
      });
      setShowImageDialog(false);
    } finally {
      setIsImageGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (!selectedImage) return;
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = "morning-muse-art.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
        setIsConvertingImage(true);
        toast({ title: "Converting HEIC file...", description: "Please wait while we convert your image." });
        try {
          const heic2any = (await import('heic2any')).default;
          const conversionResult = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.8,
          });

          const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
          
          const reader = new FileReader();
          reader.onloadend = () => {
            setPersonImage(reader.result as string);
            toast({ title: "Conversion Successful!", description: "Your image is ready." });
          };
          reader.readAsDataURL(convertedBlob);

        } catch (error) {
          console.error("Error converting HEIC file:", error);
          toast({
            title: "HEIC Conversion Failed",
            description: "Could not convert the HEIC file. Please try a different image.",
            variant: "destructive",
          });
          setPersonImage(null);
        } finally {
          setIsConvertingImage(false);
        }
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPersonImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  const handleShareImage = async () => {
    if (!selectedImage) return;

    const shareData = {
      title: 'MorningMuse3D Art',
      text: `${t.shareImageText} https://morningmuse.netlify.app/`,
    };

    try {
      const response = await fetch(selectedImage);
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
    if (!selectedImage) return;
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
    const isPersonalizedCategory = ['birthday', 'anniversary'].includes(category);
    const effectiveIsLoading = isLoading && (!currentMessage.text || currentMessage.text.startsWith('Select a category'));
    
    if (effectiveIsLoading) {
       return (
        <div className="flex items-center justify-center gap-2 text-lg text-foreground/80">
          <Loader className="animate-spin" />
          <span>{t.generatingMessage}...</span>
        </div>
      );
    }
    
    if (isPersonalizedCategory && !personName) {
         return (
             <div className="flex items-center justify-center gap-2 text-lg text-foreground/80">
                <span>{t.enterNamePrompt}</span>
             </div>
         );
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

        <div className="w-full space-y-4">
            <Card className="w-full p-4 bg-card/30 backdrop-blur-md border-border/50">
              <Label htmlFor="customPrompt" className="text-sm font-medium text-foreground/80 mb-2 block">{t.searchPrompt}</Label>
              <div className="flex gap-2">
                  <Input
                      id="customPrompt"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder={t.searchPlaceholder}
                  />
                  <Button onClick={() => handleGenerateImage(customPrompt, 'custom')} disabled={!customPrompt || isImageGenerating}>
                      <Search className="mr-2 h-4 w-4" />
                      {t.generateImage}
                  </Button>
              </div>
            </Card>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={category === cat.value ? "default" : "secondary"}
              onClick={() => handleCategoryChange(cat.value)}
              className="transition-all hover:scale-105"
              size="sm"
            >
              {cat.icon ? <cat.icon className="mr-2 h-4 w-4"/> : null}
              {cat.label}
            </Button>
          ))}
        </div>
        
        {['birthday', 'anniversary'].includes(category) && (
            <Card className="w-full p-4 space-y-4 bg-card/30 backdrop-blur-md border-border/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="personName" className="flex items-center gap-2">
                            <User className="w-4 h-4" />{t.personNameLabel}
                        </Label>
                        <Input
                            id="personName"
                            value={personName}
                            onChange={(e) => setPersonName(e.target.value)}
                            placeholder={t.personNamePlaceholder}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="personPhoto" className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />{t.personPhotoLabel}
                        </Label>
                        <Input
                            id="personPhoto"
                            type="file"
                            accept="image/*,.heic,.heif"
                            onChange={handleImageUpload}
                            className="text-xs"
                            disabled={isConvertingImage}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="personCharacteristics" className="flex items-center gap-2">
                        <Star className="w-4 h-4" />{t.personCharacteristicsLabel}
                    </Label>
                    <Textarea
                        id="personCharacteristics"
                        value={personCharacteristics}
                        onChange={(e) => setPersonCharacteristics(e.target.value)}
                        placeholder={t.personCharacteristicsPlaceholder}
                        rows={2}
                    />
                </div>
                 {personName && (
                  <Button onClick={getNewMessage} className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader className="animate-spin" /> : <RefreshCw />}
                    {t.regenerateMessage}
                  </Button>
                 )}
            </Card>
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
          <Button onClick={() => handleGenerateImage()} size="lg" variant="default" className="text-xs sm:text-sm" disabled={isLoading || isImageGenerating || !currentMessage.text || isConvertingImage}>
            {isImageGenerating || isConvertingImage ? <Loader className="animate-spin" /> : <ImageIcon />}
            {isImageGenerating ? t.generatingImage : (isConvertingImage ? "Converting..." : t.generateImage)}
          </Button>
          <Button onClick={handleNewMessage} size="lg" variant="secondary" className="col-span-2 sm:col-span-1 text-xs sm:text-sm" disabled={isLoading}>
            <RefreshCw className={cn(isFlipped || isLoading && "animate-spin")} style={{animationDuration: '700ms'}}/>
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

      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Lightbulb className="text-primary w-6 h-6" />
                    Welcome to MorningMuse3D!
                </DialogTitle>
                <DialogDescription>
                    Here’s a quick guide to get you started on your journey of daily inspiration.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 text-sm text-foreground/90">
                <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">1</div>
                    <p><strong>Choose Your Language & Category:</strong> Pick a language and then select a category like 'Motivational' or 'Shayari' to match your mood.</p>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">2</div>
                    <p><strong>Receive Your Message:</strong> Get a unique, AI-generated message. Click 'Show Another' anytime for a new one!</p>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">3</div>
                    <p><strong>Create AI Art:</strong> Click 'Generate Image' to transform your message into beautiful, shareable art. You'll get multiple options to choose from!</p>
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleCloseWelcomeDialog}>Let's Go!</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{
              isImageGenerating ? t.generatingImageTitle : 
              selectedImage ? t.previewImageTitle : t.generatedImageTitle
            }</DialogTitle>
          </DialogHeader>
          <div className="flex-grow min-h-0">
            {isImageGenerating && (
                <div className="flex justify-center items-center h-full">
                    <Loader className="w-12 h-12 animate-spin text-primary" />
                </div>
            )}
            
            {!isImageGenerating && !selectedImage && generatedImages && (
              <ScrollArea className="h-full">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {generatedImages.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Generated art ${index + 1}`} 
                      className="rounded-md object-cover w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}

            {selectedImage && (
              <div className="flex justify-center items-center h-full">
                 <img src={selectedImage} alt="Selected generated art" className="rounded-md max-h-full max-w-full object-contain" />
              </div>
            )}
          </div>
          <DialogFooter className="flex-shrink-0 flex flex-row sm:justify-end gap-2 mt-4">
            {selectedImage && (
              <>
                 <Button type="button" variant="ghost" onClick={() => setSelectedImage(null)} className="mr-auto">
                    <ArrowLeft />{t.backToGrid}
                 </Button>
                 <Button type="button" onClick={handleShareImage} disabled={isImageGenerating}>
                    <Share2 />{t.shareImage}
                 </Button>
                 <Button type="button" onClick={handleDownloadImage} disabled={isImageGenerating}>
                    <Download />{t.downloadImage}
                 </Button>
              </>
            )}
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
