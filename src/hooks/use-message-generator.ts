"use client";

import { useState, useEffect, useCallback } from 'react';
import { messages } from '@/lib/messages';

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
  const [usedIndices, setUsedIndices] = useState(new Set<number>([0]));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // When component mounts for the first time on client, get a new message
    // to avoid using the static initial one if the user doesn't interact.
    getNewMessage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNewMessage = useCallback(() => {
    const messageList = messages[language]?.[category] ?? [];
    if (messageList.length === 0) {
      setCurrentMessage({ text: 'No messages in this category yet. Stay tuned!', key: -1 });
      return;
    }

    let availableIndices = Array.from(Array(messageList.length).keys()).filter(
      i => !usedIndices.has(i)
    );

    if (availableIndices.length === 0) {
      // All messages have been shown, reset used indices
      const newUsed = new Set<number>();
      setUsedIndices(newUsed);
      availableIndices = Array.from(Array(messageList.length).keys());
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    
    setUsedIndices(prev => new Set(prev).add(randomIndex));
    setCurrentMessage({ text: messageList[randomIndex], key: randomIndex });

  }, [language, category, usedIndices]);
  
  useEffect(() => {
    // When category or language changes, reset and get a new message, but only on the client.
    if (isMounted) {
      const firstMessage = getInitialMessage(language, category);
      setCurrentMessage(firstMessage);
      const newUsedIndices = new Set<number>();
      if (firstMessage.key !== -1) {
          newUsedIndices.add(firstMessage.key);
      }
      setUsedIndices(newUsedIndices);
      getNewMessage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, category, isMounted]);


  return { currentMessage, getNewMessage };
};
