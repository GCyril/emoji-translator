"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// An expanded dictionary for word-to-emoji translation
const emojiDictionary: Record<string, string> = {
  // Greetings & Basic
  hello: '👋',
  bonjour: '👋',
  hi: '👋',
  salut: '👋',
  goodbye: '👋',
  aurevoir: '👋',
  yes: '✅',
  oui: '✅',
  no: '❌',
  non: '❌',
  please: '🙏',
  "s'il vous plait": '🙏',
  "s'il te plait": '🙏',
  thankyou: '😊',
  "thank you": '😊',
  merci: '😊',

  // Emotions & Feelings
  happy: '😄',
  heureux: '😄',
  joy: '😂',
  joie: '😂',
  sad: '😢',
  triste: '😢',
  love: '❤️',
  amour: '❤️',
  like: '👍',
  aimer: '👍',
  laugh: '😂',
  rire: '😂',
  smile: '😊',
  sourire: '😊',
  cry: '😭',
  pleurer: '😭',
  angry: '😠',
  colere: '😠',
  "en colère": '😠',
  surprised: '😮',
  surpris: '😮',
  cool: '😎',
  wow: '🤩',
  sleep: '😴',
  dormir: '😴',
  tired: '😫',
  fatigue: '😫',
  sick: '🤢',
  malade: '🤢',
  wink: '😉',
  "clin d'oeil": '😉',
  "clin dœil": '😉', // Common variation without space

  // People & Family
  friend: '🧑‍🤝‍🧑',
  ami: '🧑‍🤝‍🧑',
  family: '👨‍👩‍👧‍👦',
  famille: '👨‍👩‍👧‍👦',
  man: '👨',
  homme: '👨',
  woman: '👩',
  femme: '👩',
  boy: '👦',
  garcon: '👦',
  girl: '👧',
  fille: '👧',
  baby: '👶',
  bebe: '👶',

  // Animals
  cat: '🐱',
  chat: '🐱',
  dog: '🐶',
  chien: '🐶',
  bird: '🐦',
  oiseau: '🐦',
  fish: '🐠',
  poisson: '🐠',
  lion: '🦁',
  bear: '🐻',
  ours: '🐻',
  monkey: '🐒',
  singe: '🐒',

  // Food & Drink
  food: '🍕',
  nourriture: '🍕',
  pizza: '🍕',
  burger: '🍔',
  taco: '🌮',
  sushi: '🍣',
  icecream: '🍦',
  glace: '🍦',
  cake: '🍰',
  gateau: '🍰',
  apple: '🍎',
  pomme: '🍎',
  banana: '🍌',
  banane: '🍌',
  orange: '🍊',
  coffee: '☕',
  cafe: '☕',
  tea: '🍵',
  the: '🍵',
  water: '💧',
  eau: '💧',
  wine: '🍷',
  vin: '🍷',
  beer: '🍺',
  biere: '🍺',

  // Activities & Objects
  world: '🌍',
  monde: '🌍',
  sun: '☀️',
  soleil: '☀️',
  moon: '🌙',
  lune: '🌙',
  star: '⭐',
  etoile: '⭐',
  computer: '💻',
  ordinateur: '💻',
  code: '💻',
  react: '⚛️',
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
  car: '🚗',
  voiture: '🚗',
  house: '🏠',
  maison: '🏠',
  tree: '🌳',
  arbre: '🌳',
  flower: '🌸',
  fleur: '🌸',
  gift: '🎁',
  cadeau: '🎁',
  photo: '📷',
  camera: '📷',
  phone: '📱',
  telephone: '📱',
  sport: '⚽',
  football: '⚽',
  ball: '🏀',
  balle: '🏀',
  balloon: '🎈',
  ballon: '🎈',

  // Weather
  rain: '🌧️',
  pluie: '🌧️',
  snow: '❄️',
  neige: '❄️',
  cloud: '☁️',
  nuage: '☁️',
  storm: '⛈️',
  orage: '⛈️',
  wind: '🌬️',
  vent: '🌬️',

  // Actions
  work: '💼',
  travail: '💼',
  study: '📖',
  etudier: '📖',
  read: '📖',
  lire: '📖',
  write: '✍️',
  ecrire: '✍️',
  eat: '😋',
  manger: '😋',
  drink: '🥤',
  boire: '🥤',
  run: '🏃',
  courir: '🏃',
  walk: '🚶',
  marcher: '🚶',
  dance: '💃',
  danser: '💃',
  sing: '🎤',
  chanter: '🎤',
  think: '🤔',
  penser: '🤔',
  look: '👀',
  regarder: '👀',
  see: '👀',
  voir: '👀',
  hear: '👂',
  entendre: '👂',
  listen: '🎧',
  ecouter: '🎧',
  talk: '🗣️',
  parler: '🗣️',
  celebrate: '🥳',
  celebrer: '🥳',
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
                placeholder="par exemple, Bonjour monde chat heureux pomme"
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