
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
        // Always return the first message for the initial render to ensure consistency
        return { text: messageList[0], key: 0 };
    }
    return { text: 'Select a category to start your day!', key: -1 };
};

export const useMessageGenerator = (language: string, category: string) => {
  const [currentMessage, setCurrentMessage] = useState<Message>(() => getInitialMessage(language, category));
  const [usedIndices, setUsedIndices] = useState(new Set<number>());

  const getNewMessage = useCallback(() => {
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
      // All messages have been shown, reset for a new cycle
      const newUsed = new Set<number>();
      setUsedIndices(newUsed);
      availableIndices = Array.from(Array(messageList.length).keys());
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    
    setUsedIndices(prev => new Set(prev).add(randomIndex));
    setCurrentMessage({ text: messageList[randomIndex], key: randomIndex });

  }, [language, category, usedIndices]);
  
  // Effect to reset and fetch a new message when language or category changes
  useEffect(() => {
      const firstMessage = getInitialMessage(language, category);
      setCurrentMessage(firstMessage);
      const newUsedIndices = new Set<number>();
      if (firstMessage.key !== -1) {
          newUsedIndices.add(firstMessage.key);
      }
      setUsedIndices(newUsedIndices);
  }, [language, category]);


  return { currentMessage, getNewMessage };
};
