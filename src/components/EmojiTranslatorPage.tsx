"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// A simple dictionary for word-to-emoji translation
const emojiDictionary: Record<string, string> = {
  hello: '👋',
  bonjour: '👋',
  world: '🌍',
  monde: '🌍',
  love: '❤️',
  amour: '❤️',
  happy: '😄',
  heureux: '😄',
  sad: '😢',
  triste: '😢',
  cat: '🐱',
  chat: '🐱',
  dog: '🐶',
  chien: '🐶',
  sun: '☀️',
  soleil: '☀️',
  moon: '🌙',
  lune: '🌙',
  star: '⭐',
  etoile: '⭐',
  food: '🍕',
  nourriture: '🍕',
  coffee: '☕',
  cafe: '☕',
  computer: '💻',
  ordinateur: '💻',
  code: '💻',
  react: '⚛️',
  cool: '😎',
  fire: '🔥',
  feu: '🔥',
  party: '🎉',
  fete: '🎉',
  money: '💰',
  argent: '💰',
  time: '⏰',
  temps: '⏰',
  idea: '💡',
  idee: '💡',
  book: '📚',
  livre: '📚',
  music: '🎵',
  musique: '🎵',
  game: '🎮',
  jeu: '🎮',
  pizza: '🍕',
  burger: '🍔',
  taco: '🌮',
  sushi: '🍣',
  icecream: '🍦',
  glace: '🍦',
  cake: '🍰',
  gateau: '🍰',
};

const EmojiTranslatorPage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translateToEmoji = () => {
    const words = inputText.toLowerCase().split(/\s+/); 
    const translatedWords = words.map(word => {
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
          <CardTitle className="text-2xl font-bold text-center">Traducteur d'Emojis</CardTitle>
          <CardDescription className="text-center">
            Tapez votre texte ci-dessous et voyez-le traduit en emojis !
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-input" className="mb-2 block">Entrez du texte :</Label>
              <Input
                id="text-input"
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="par exemple, Bonjour monde chat heureux"
                className="w-full"
              />
            </div>
            <Button onClick={translateToEmoji} className="w-full">
              Traduire en Emoji
            </Button>
            {translatedText && (
              <div className="mt-6">
                <Label htmlFor="translated-output" className="mb-2 block">Résultat Emoji :</Label>
                <Card id="translated-output" className="p-4 bg-secondary">
                  <p className="text-3xl break-words text-center">{translatedText}</p>
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