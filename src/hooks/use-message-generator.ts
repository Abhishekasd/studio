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
      // All messages shown, reset and show a random one
      setUsedIndices(prev => {
        const newUsedIndices = new Set<number>();
        const randomIndex = Math.floor(Math.random() * messageList.length);
        newUsedIndices.add(randomIndex);
        setCurrentMessage({ text: messageList[randomIndex], key: randomIndex });
        return newUsedIndices;
      });
      return;
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setUsedIndices(prev => new Set(prev).add(randomIndex));
    setCurrentMessage({ text: messageList[randomIndex], key: randomIndex });

  }, [language, category, usedIndices]);

  useEffect(() => {
    // Reset used indices and fetch the first message when language or category changes
    setUsedIndices(new Set());
    setCurrentMessage(getFirstMessage(language, category));
    // We call getNewMessage here to get a random one on category/language change.
    // The timeout ensures state updates from the lines above are processed.
    setTimeout(() => getNewMessage(), 0);
  }, [language, category, getNewMessage]);


  return { currentMessage, getNewMessage };
};
