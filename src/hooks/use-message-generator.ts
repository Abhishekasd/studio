"use client";

import { useState, useEffect, useCallback } from 'react';
import { messages } from '@/lib/messages';

interface Message {
  text: string;
  key: number;
}

const getFirstMessage = (language: string, category: string): Message => {
    const messageList = messages[language]?.[category] ?? [];
    if (messageList.length > 0) {
        return { text: messageList[0], key: 0 };
    }
    return { text: 'Select a category to start your day!', key: -1 };
};

export const useMessageGenerator = (language: string, category: string) => {
  const [currentMessage, setCurrentMessage] = useState<Message>(() => getFirstMessage(language, category));
  const [usedIndices, setUsedIndices] = useState(new Set<number>());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
      setUsedIndices(new Set());
      availableIndices = Array.from(Array(messageList.length).keys());
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    
    setUsedIndices(prev => new Set(prev).add(randomIndex));
    setCurrentMessage({ text: messageList[randomIndex], key: randomIndex });

  }, [language, category, usedIndices]);
  
  useEffect(() => {
    setUsedIndices(new Set());
    setCurrentMessage(getFirstMessage(language, category));
  }, [language, category]);

  useEffect(() => {
    if (isMounted) {
      getNewMessage();
    }
    // We only want this to run once on mount for a new category/language, so we have specific deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, language, category]);


  return { currentMessage, getNewMessage };
};
