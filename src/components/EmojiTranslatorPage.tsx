"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// A simple dictionary for word-to-emoji translation
const emojiDictionary: Record<string, string> = {
  hello: '👋',
  world: '🌍',
  love: '❤️',
  happy: '😄',
  sad: '😢',
  cat: '🐱',
  dog: '🐶',
  sun: '☀️',
  moon: '🌙',
  star: '⭐',
  food: '🍕',
  coffee: '☕',
  computer: '💻',
  code: '💻',
  react: '⚛️',
  cool: '😎',
  fire: '🔥',
  party: '🎉',
  money: '💰',
  time: '⏰',
  idea: '💡',
  book: '📚',
  music: '🎵',
  game: '🎮',
  pizza: '🍕',
  burger: '🍔',
  taco: '🌮',
  sushi: '🍣',
  icecream: '🍦',
  cake: '🍰',
};

const EmojiTranslatorPage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translateToEmoji = () => {
    const words = inputText.toLowerCase().split(/\s+/); // Split by space and convert to lowercase
    const translatedWords = words.map(word => {
      // Remove punctuation for better matching
      const cleanWord = word.replace(/[.,!?]/g, '');
      return emojiDictionary[cleanWord] || word;
    });
    setTranslatedText(translatedWords.join(' '));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      translateToEmoji();
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Emoji Translator</CardTitle>
          <CardDescription className="text-center">
            Type your text below and see it translated into emojis!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-input" className="mb-2 block">Enter text:</Label>
              <Input
                id="text-input"
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Hello world happy cat"
                className="w-full"
              />
            </div>
            <Button onClick={translateToEmoji} className="w-full">
              Translate to Emoji
            </Button>
            {translatedText && (
              <div className="mt-6">
                <Label htmlFor="translated-output" className="mb-2 block">Emoji Output:</Label>
                <Card id="translated-output" className="p-4 bg-secondary">
                  <p className="text-lg break-words">{translatedText}</p>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmojiTranslatorPage;