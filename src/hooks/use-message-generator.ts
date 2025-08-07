"use client";

import { useState, useEffect, useCallback } from 'react';
import { messages } from '@/lib/messages';

interface Message {
  text: string;
  key: number;
}

export const useMessageGenerator = (language: string, category: string) => {
  const [currentMessage, setCurrentMessage] = useState<Message>({ text: 'Loading...', key: 0 });
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
      const newUsedIndices = new Set<number>();
      const randomIndex = Math.floor(Math.random() * messageList.length);
      newUsedIndices.add(randomIndex);
      setUsedIndices(newUsedIndices);
      setCurrentMessage({ text: messageList[randomIndex], key: randomIndex });
      return;
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const newUsedIndices = new Set(usedIndices);
    newUsedIndices.add(randomIndex);
    setUsedIndices(newUsedIndices);
    setCurrentMessage({ text: messageList[randomIndex], key: randomIndex });

  }, [language, category, usedIndices]);

  useEffect(() => {
    // Reset used indices and fetch the first message when language or category changes
    const messageList = messages[language]?.[category] ?? [];
    if (messageList.length > 0) {
      const firstRandomIndex = Math.floor(Math.random() * messageList.length);
      setUsedIndices(new Set([firstRandomIndex]));
      setCurrentMessage({ text: messageList[firstRandomIndex], key: firstRandomIndex });
    } else {
      setCurrentMessage({ text: 'Select a category to start your day!', key: -1 });
    }
  }, [language, category]);

  return { currentMessage, getNewMessage };
};
