
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { messages } from '../lib/messages';
import { getFestivalMessage } from '../ai/flows/festival-flow';
import { getNewMessage as getNewAiMessage, MessageInput } from '../ai/flows/message-generation-flow';
import { useToast } from './use-toast';

interface Message {
  text: string;
  key: string | number;
}

interface MessageOptions {
    name?: string;
    characteristics?: string;
}

const getInitialMessage = (language: string, category: string): Message => {
    const messageList: string[] = messages[language]?.[category] ?? [];
    if (messageList.length > 0) {
        return { text: messageList[0], key: 0 };
    }
    return { text: 'Select a category to start your day!', key: "initial" };
};

export const useMessageGenerator = (language: string, category: string, options: MessageOptions) => {
  const [currentMessage, setCurrentMessage] = useState<Message>(() => getInitialMessage(language, category));
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sessionMessagesRef = useRef<Record<string, Set<string>>>({});
  
  const getFallbackMessage = useCallback(() => {
    let messageList = messages[language]?.[category] ?? ["Sorry, something went wrong. Please try again!"];
    const sessionCategoryMessages = sessionMessagesRef.current[category] || new Set();

    let availableMessages = messageList.filter(m => !sessionCategoryMessages.has(m));

    if (availableMessages.length === 0) {
      sessionCategoryMessages.clear();
      availableMessages = messageList;
    }

    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    let newMessage = availableMessages[randomIndex];
    
    if (options.name && (category === 'birthday' || category === 'anniversary')) {
        newMessage = newMessage.replace('__NAME__', options.name);
    }
    
    sessionCategoryMessages.add(newMessage);
    sessionMessagesRef.current[category] = sessionCategoryMessages;
    
    setCurrentMessage({ text: newMessage, key: newMessage });
  }, [language, category, options.name]);


  const getNewMessage = useCallback(async (isInitialLoad = false) => {
    setIsLoading(true);

    if (category === 'festival') {
      try {
        const result = await getFestivalMessage({ language });
        const newMessage = result.message;
        setCurrentMessage({ text: newMessage, key: Date.now() }); // Use timestamp to force re-render
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

    if ((category === 'birthday' || category === 'anniversary') && !options.name) {
        if (!isInitialLoad) {
           setCurrentMessage({ text: "Please enter a name to generate a message.", key: 'prompt_for_name' });
        } else {
           setCurrentMessage({ text: "Enter a name to begin.", key: 'initial_prompt_for_name'})
        }
        setIsLoading(false);
        return;
    }

    try {
        const sessionCategoryMessages = sessionMessagesRef.current[category] || new Set();
        
        const input: MessageInput = {
            language,
            category,
            existingMessages: Array.from(sessionCategoryMessages),
            name: options.name,
            characteristics: options.characteristics,
        };

        const result = await getNewAiMessage(input);

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

  }, [language, category, toast, getFallbackMessage, options.name, options.characteristics]);
  
  useEffect(() => {
    if (sessionMessagesRef.current[category]) {
      sessionMessagesRef.current[category]!.clear();
    }
    getNewMessage(true);
  }, [language, category]);


  return { currentMessage, getNewMessage, isLoading };
};
