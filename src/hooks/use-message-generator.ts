"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { messages } from '@/lib/messages';
import { getFestivalMessage } from '@/ai/flows/festival-flow';
import { getNewMessage as getNewAiMessage } from '@/ai/flows/message-generation-flow';
import { useToast } from './use-toast';

interface Message {
  text: string;
  key: string | number;
}

const getInitialMessage = (language: string, category: string): Message => {
    const messageList: string[] = messages[language]?.[category] ?? [];
    if (messageList.length > 0) {
        return { text: messageList[0], key: 0 };
    }
    return { text: 'Select a category to start your day!', key: "initial" };
};

export const useMessageGenerator = (language: string, category: string) => {
  const [currentMessage, setCurrentMessage] = useState<Message>(() => getInitialMessage(language, category));
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sessionMessagesRef = useRef<Record<string, Set<string>>>({});
  
  const getFallbackMessage = useCallback(() => {
    const messageList = messages[language]?.[category] ?? ["Sorry, something went wrong. Please try again!"];
    const sessionCategoryMessages = sessionMessagesRef.current[category] || new Set();

    let availableMessages = messageList.filter(m => !sessionCategoryMessages.has(m));

    if (availableMessages.length === 0) {
      sessionCategoryMessages.clear();
      availableMessages = messageList;
    }

    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    const newMessage = availableMessages[randomIndex];
    
    sessionCategoryMessages.add(newMessage);
    sessionMessagesRef.current[category] = sessionCategoryMessages;
    
    setCurrentMessage({ text: newMessage, key: newMessage });
  }, [language, category]);


  const getNewMessage = useCallback(async () => {
    setIsLoading(true);

    if (category === 'festival') {
      try {
        const result = await getFestivalMessage({ language });
        const newMessage = result.message;
        setCurrentMessage({ text: newMessage, key: newMessage });
      } catch (error) {
        console.error("Error fetching festival message:", error);
        toast({
            title: "Festival Message Error",
            description: "Could not fetch a festive greeting, using a local one.",
            variant: "destructive",
        });
        getFallbackMessage();
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
        const sessionCategoryMessages = sessionMessagesRef.current[category] || new Set();
        
        const result = await getNewAiMessage({
            language,
            category,
            existingMessages: Array.from(sessionCategoryMessages),
        });

        const newMessage = result.message;
        sessionCategoryMessages.add(newMessage);
        sessionMessagesRef.current[category] = sessionCategoryMessages;
        setCurrentMessage({ text: newMessage, key: newMessage });

    } catch (error) {
        console.error("Error fetching dynamic message:", error);
        toast({
            title: "Dynamic Message Error",
            description: "Could not generate a new message, using one from our library.",
            variant: "destructive",
        });
        getFallbackMessage();
    } finally {
        setIsLoading(false);
    }

  }, [language, category, toast, getFallbackMessage]);
  
  useEffect(() => {
    if (sessionMessagesRef.current[category]) {
      sessionMessagesRef.current[category]!.clear();
    }
    getNewMessage();
  }, [language, category, getNewMessage]);


  return { currentMessage, getNewMessage, isLoading };
};
