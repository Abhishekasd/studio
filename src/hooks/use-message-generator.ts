
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
    const messageList = messages[language]?.[category] ?? [];
    if (messageList.length > 0) {
        return { text: messageList[0], key: 0 };
    }
    return { text: 'Select a category to start your day!', key: "initial" };
};

export const useMessageGenerator = (language: string, category: string) => {
  const [currentMessage, setCurrentMessage] = useState<Message>(() => getInitialMessage(language, category));
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Use a ref to store session messages to avoid re-renders and keep it persistent
  const sessionMessagesRef = useRef<Record<string, Set<string>>>({});

  // Function to get a unique message from the local fallback list
  const getFallbackMessage = useCallback(() => {
    const messageList = messages[language]?.[category] ?? ["Sorry, something went wrong. Please try again!"];
    const sessionCategoryMessages = sessionMessagesRef.current[category] || new Set();

    let availableMessages = messageList.filter(m => !sessionCategoryMessages.has(m));

    if (availableMessages.length === 0) {
      // All local messages for this category have been used, reset for this category
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

    // Festival category has its own dedicated flow
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

    // For other categories, try the new AI flow first
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
        // Fallback to local list if AI fails
        getFallbackMessage();
    } finally {
        setIsLoading(false);
    }

  }, [language, category, toast, getFallbackMessage]);
  
  useEffect(() => {
    // When language or category changes, get a new message.
    // Reset the session cache for that category if the language changes.
    if (sessionMessagesRef.current[category]) {
      sessionMessagesRef.current[category]!.clear();
    }
    getNewMessage();
  }, [language, category, getNewMessage]);


  return { currentMessage, getNewMessage, isLoading };
};
