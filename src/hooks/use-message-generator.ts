
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
    if (['birthday', 'anniversary'].includes(category)) {
      return { text: '', key: 'initial-personalized' };
    }
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
  const isPersonalizedCategory = ['birthday', 'anniversary'].includes(category);

  const sessionMessagesRef = useRef<Record<string, Set<string>>>({});
  
  const getFallbackMessage = useCallback((name?: string) => {
    let messageList = messages[language]?.[category] ?? ["Sorry, something went wrong. Please try again!"];
    if (name && (category === 'birthday' || category === 'anniversary')) {
        messageList = messageList.map(m => m.replace('{{name}}', name));
    }
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


  const getNewMessage = useCallback(async (name?: string, characteristics?: string) => {
    if (isPersonalizedCategory && !name) {
      setCurrentMessage({ text: '', key: 'initial-personalized' });
      return;
    }

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
            name: name,
            characteristics: characteristics,
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
        getFallbackMessage(name);
    } finally {
        setIsLoading(false);
    }

  }, [language, category, toast, getFallbackMessage, isPersonalizedCategory]);
  
  useEffect(() => {
    if (sessionMessagesRef.current[category]) {
      sessionMessagesRef.current[category]!.clear();
    }
    // For personalized categories, don't fetch on category change, wait for user input.
    if (!isPersonalizedCategory) {
      getNewMessage();
    } else {
      setCurrentMessage({ text: '', key: 'initial-personalized' });
    }
  }, [language, category, getNewMessage, isPersonalizedCategory]);


  return { currentMessage, getNewMessage, isLoading, isPersonalizedCategory };
};
