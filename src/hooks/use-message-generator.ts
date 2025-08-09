
"use client";

import { useState, useEffect, useCallback } from 'react';
import { messages } from '@/lib/messages';
import { getFestivalMessage } from '@/ai/flows/festival-flow';
import { useToast } from './use-toast';

interface Message {
  text: string;
  key: number;
}

const getInitialMessage = (language: string, category: string): Message => {
    const messageList = messages[language]?.[category] ?? [];
    if (messageList.length > 0) {
        return { text: messageList[0], key: 0 };
    }
    return { text: 'Select a category to start your day!', key: -1 };
};

export const useMessageGenerator = (language: string, category: string) => {
  const [currentMessage, setCurrentMessage] = useState<Message>(() => getInitialMessage(language, category));
  const [usedIndices, setUsedIndices] = useState(new Set<number>());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getNewMessage = useCallback(async () => {
    if (category === 'festival') {
      setIsLoading(true);
      try {
        const result = await getFestivalMessage({ language });
        setCurrentMessage({ text: result.message, key: Date.now() });
      } catch (error) {
        console.error("Error fetching festival message:", error);
        toast({
            title: "Error",
            description: "Could not fetch a festival greeting. Please try again.",
            variant: "destructive",
        });
        setCurrentMessage({ text: messages[language]?.festival[0] || "Wishing you a joyous day!", key: -1});
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const messageList = messages[language]?.[category] ?? [];
    if (messageList.length === 0) {
      setCurrentMessage({ text: 'No messages in this category yet. Stay tuned!', key: -1 });
      setUsedIndices(new Set());
      return;
    }

    let availableIndices = Array.from(Array(messageList.length).keys()).filter(
      i => !usedIndices.has(i)
    );

    if (availableIndices.length === 0) {
      const newUsed = new Set<number>();
      setUsedIndices(newUsed);
      availableIndices = Array.from(Array(messageList.length).keys());
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    
    setUsedIndices(prev => new Set(prev).add(randomIndex));
    setCurrentMessage({ text: messageList[randomIndex], key: randomIndex });

  }, [language, category, usedIndices, toast]);
  
  useEffect(() => {
    if (category === 'festival') {
        getNewMessage();
    } else {
        const firstMessage = getInitialMessage(language, category);
        setCurrentMessage(firstMessage);
        const newUsedIndices = new Set<number>();
        if (firstMessage.key !== -1) {
            newUsedIndices.add(firstMessage.key);
        }
        setUsedIndices(newUsedIndices);
    }
  }, [language, category]);


  return { currentMessage, getNewMessage, isLoading };
};
