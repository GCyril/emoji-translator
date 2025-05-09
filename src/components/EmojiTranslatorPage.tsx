"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Still using shadcn Button, but will apply custom class
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast'; // Import showError

// An extensively expanded dictionary for word-to-emoji translation
const emojiDictionary: Record<string, string> = {
  // Greetings & Basic Communication
  hello: '👋', bonjour: '👋', hi: '👋', salut: '👋',
  goodbye: '👋', aurevoir: '👋', bye: '👋',
  yes: '✅', oui: '✅',
  no: '❌', non: '❌',
  please: '🙏', "s'il vous plait": '🙏', "s'il te plait": '🙏',
  thankyou: '😊', "thank you": '😊', merci: '😊',
  sorry: '😔', desole: '😔', pardon: '😔',
  welcome: '🤗', bienvenue: '🤗',
  question: '❓', help: '🆘', aide: '🆘',

  // Emotions & Feelings
  happy: '😄', heureux: '😄', content: '😄',
  joy: '😂', joie: '😂',
  sad: '😢', triste: '😢',
  love: '❤️', amour: '❤️',
  like: '👍', aimer: '👍', apprecier: '👍',
  laugh: '😂', rire: '😂',
  smile: '😊', sourire: '😊',
  cry: '😭', pleurer: '😭',
  angry: '😠', colere: '😠', "en colère": '😠', fache: '😠',
  surprised: '😮', surpris: '😮', etonne: '😮',
  shocked: '😱', choque: '😱',
  cool: '😎', genial: '😎',
  wow: '🤩',
  sleep: '😴', dormir: '😴',
  tired: '😫', fatigue: '😫', epuise: '😫',
  sick: '🤢', malade: '🤢',
  wink: '😉', "clin d'oeil": '😉', "clin dœil": '😉', clin: '😉',
  blush: '😊', rougir: '😊',
  thinking: '🤔', penser: '🤔', reflechir: '🤔',
  confused: '😕', confus: '😕', perplexe: '😕',
  scared: '😨', peur: '😨', effraye: '😨',
  excited: '🥳', excite: '🥳', enthousiaste: '🥳',
  proud: '🥲', fier: '🥲',

  // People & Family
  friend: '🧑‍🤝‍🧑', ami: '🧑‍🤝‍🧑', copain: '🧑‍🤝‍🧑', copine: '🧑‍🤝‍🧑',
  family: '👨‍👩‍👧‍👦', famille: '👨‍👩‍👧‍👦',
  man: '👨', homme: '👨',
  woman: '👩', femme: '👩',
  boy: '👦', garcon: '👦',
  girl: '👧', fille: '👧',
  baby: '👶', bebe: '👶',
  child: '🧒', enfant: '🧒',
  teacher: '🧑‍🏫', professeur: '🧑‍🏫', enseignant: '🧑‍🏫',
  student: '🧑‍🎓', etudiant: '🧑‍🎓', eleve: '🧑‍🎓',
  doctor: '🧑‍⚕️', docteur: '🧑‍⚕️', medecin: '🧑‍⚕️',
  police: '👮', policier: '👮',

  // Animals
  animal: '🐾',
  cat: '🐱', chat: '🐱',
  dog: '🐶', chien: '🐶',
  bird: '🐦', oiseau: '🐦',
  fish: '🐠', poisson: '🐠',
  lion: '🦁',
  bear: '🐻', ours: '🐻',
  monkey: '🐒', singe: '🐒',
  horse: '🐴', cheval: '🐴',
  cow: '🐮', vache: '🐮',
  pig: '🐷', cochon: '🐷',
  sheep: '🐑', mouton: '🐑',
  chicken: '🐔', poulet: '🐔', poule: '🐔',
  duck: '🦆', canard: '🦆',
  mouse: '🐭', souris: '🐭',
  rabbit: '🐰', lapin: '🐰',
  frog: '🐸', grenouille: '🐸',
  bee: '🐝', abeille: '🐝',
  butterfly: '🦋', papillon: '🦋',
  spider: '🕷️', araignee: '🕷️',
  snake: '🐍', serpent: '🐍',
  turtle: '🐢', tortue: '🐢',
  dolphin: '🐬', dauphin: '🐬',
  whale: '🐳', baleine: '🐳',
  octopus: '🐙', pieuvre: '🐙', poulpe: '🐙',

  // Food & Drink
  food: '🍕', nourriture: '🍕', repas: '🍽️',
  eat: '😋', manger: '😋',
  drink: '🥤', boire: '🥤',
  pizza: '🍕',
  burger: '🍔', hamburger: '🍔',
  taco: '🌮',
  sushi: '🍣',
  icecream: '🍦', glace: '🍦',
  cake: '🍰', gateau: '🍰',
  cookie: '🍪', biscuit: '🍪',
  chocolate: '🍫', chocolat: '🍫',
  candy: '🍬', bonbon: '🍬',
  popcorn: '🍿',
  fries: '🍟', frites: '🍟',
  bread: '🍞', pain: '🍞',
  cheese: '🧀', fromage: '🧀',
  egg: '🥚', oeuf: '🥚',
  apple: '🍎', pomme: '🍎',
  banana: '🍌', banane: '🍌',
  orange: '🍊', // Fruit
  pear: '🍐', poire: '🍐',
  pineapple: '🍍', ananas: '🍍',
  strawberry: '🍓', fraise: '🍓',
  grapes: '🍇', raisin: '🍇', raisins: '🍇',
  watermelon: '🍉', pasteque: '🍉',
  peach: '🍑', peche: '🍑', // Fruit
  cherry: '🍒', cerise: '🍒',
  lemon: '🍋', citron: '🍋',
  coconut: '🥥', "noix de coco": '🥥',
  avocado: '🥑', avocat: '🥑', // Fruit
  eggplant: '🍆', aubergine: '🍆',
  potato: '🥔', "pomme de terre": '🥔',
  carrot: '🥕', carotte: '🥕',
  corn: '🌽', mais: '🌽',
  broccoli: '🥦', brocoli: '🥦',
  tomato: '🍅', tomate: '🍅',
  mushroom: '🍄', champignon: '🍄',
  pepper: '🌶️', piment: '🌶️', // Hot pepper
  poivron: '🫑', // Bell pepper
  onion: '🧅', oignon: '🧅',
  garlic: '🧄', ail: '🧄',
  cucumber: '🥒', concombre: '🥒',
  lettuce: '🥬', laitue: '🥬', salade: '🥗', // Salad
  coffee: '☕', cafe: '☕',
  tea: '🍵', the: '🍵',
  water: '💧', eau: '💧',
  wine: '🍷', vin: '🍷',
  beer: '🍺', biere: '🍺',
  milk: '🥛', lait: '🥛',
  juice: '🧃', jus: '🧃',

  // Activities, Hobbies & Objects
  world: '🌍', monde: '🌍', earth: '🌍', terre: '🌍', planet: '🌍', planète: '🌍',
  computer: '💻', ordinateur: '💻',
  code: '💻', coder: '💻',
  react: '⚛️', // Specific to tech
  party: '🎉', fete: '🎉', celebration: '🥳', celebrer: '🥳',
  money: '💰', argent: '💰',
  time: '⏰', temps: '⏰', heure: '🕒',
  idea: '💡', idee: '💡',
  book: '📚', livre: '📚', read: '📖', lire: '📖',
  music: '🎵', musique: '🎵', song: '🎶', chanson: '🎶',
  sing: '🎤', chanter: '🎤',
  dance: '💃', danser: '💃',
  game: '🎮', jeu: '🎮', play: '▶️', jouer: '▶️',
  sport: '⚽',
  football: '⚽', soccer: '⚽',
  basketball: '🏀',
  baseball: '⚾',
  tennis: '🎾',
  volleyball: '🏐',
  ball: '🏀', balle: '🏀', ballon: '🎈', // balloon for party
  gift: '🎁', cadeau: '🎁', present: '🎁',
  photo: '📷', camera: '📷',
  phone: '📱', telephone: '📱', call: '📞', appeler: '📞',
  television: '📺', tv: '📺', tele: '📺',
  movie: '🎬', film: '🎬', cinema: '🎦',
  work: '💼', travail: '💼', travailler: '💼', job: '🧑‍💼',
  study: '📖', etudier: '📖', learn: '🧠', apprendre: '🧠',
  write: '✍️', ecrire: '✍️',
  run: '🏃', courir: '🏃',
  walk: '🚶', marcher: '🚶',
  travel: '✈️', voyager: '✈️', trip: '🗺️', voyage: '🗺️',
  car: '🚗', voiture: '🚗', drive: '🚗', conduire: '🚗',
  train: '🚆',
  bus: '🚌',
  bicycle: '🚲', velo: '🚲',
  boat: '⛵', bateau: '⛵', ship: '🚢', navire: '🚢',
  plane: '✈️', avion: '✈️', flight: '✈️', vol: '✈️',
  house: '🏠', maison: '🏠', home: '🏡', foyer: '🏡',
  building: '🏢', batiment: '🏢',
  city: '🏙️', ville: '🏙️',
  road: '🛣️', route: '🛣️', street: 'ରାସ୍ତା', rue: 'ରାସ୍ତା', // Using a generic road symbol as street emoji varies
  park: '🏞️', parc: '🏞️',
  tree: '🌳', arbre: '🌳', forest: '🌲🌲', foret: '🌲🌲',
  flower: '🌸', fleur: '🌸', plant: '🪴', plante: '🪴',
  key: '🔑', cle: '🔑',
  lock: '🔒', cadenas: '🔒', verrou: '🔒',
  tool: '🛠️', outil: '🛠️',
  light: '💡', lumiere: '💡', lamp: '💡', lampe: '💡',
  fire: '🔥', feu: '🔥',
  bomb: '💣', bombe: '💣',
  gun: '🔫', pistolet: '🔫',
  knife: '🔪', couteau: '🔪',

  // Nature & Weather
  sun: '☀️', soleil: '☀️',
  moon: '🌙', lune: '🌙',
  star: '⭐', etoile: '⭐',
  sky: '🌌', ciel: '🌌',
  cloud: '☁️', nuage: '☁️',
  rain: '🌧️', pluie: '🌧️', pleuvoir: '🌧️',
  snow: '❄️', neige: '❄️', neiger: '❄️',
  storm: '⛈️', orage: '⛈️', tempete: '🌪️',
  wind: '🌬️', vent: '🌬️',
  rainbow: '🌈', "arc-en-ciel": '🌈',
  mountain: '⛰️', montagne: '⛰️',
  volcano: '🌋', volcan: '🌋',
  beach: '🏖️', plage: '🏖️',
  ocean: '🌊', oceaan: '🌊', sea: '🌊', mer: '🌊',
  river: '🏞️', riviere: '🏞️', // Park can also represent river landscape
  desert: '🏜️', desert: '🏜️',

  // Abstract & Miscellaneous
  look: '👀', regarder: '👀', see: '👀', voir: '👀',
  hear: '👂', entendre: '👂', listen: '🎧', ecouter: '🎧',
  talk: '🗣️', parler: '🗣️', speak: '🗣️', dire: '🗣️',
  sound: '🔊', son: '🔊',
  strong: '💪', fort: '💪',
  weak: '🤕', faible: '🤕', // Injured person as proxy for weak
  big: '🐘', grand: '🐘', // Elephant as proxy for big
  small: '🐭', petit: '🐭', // Mouse as proxy for small
  hot: '🔥', chaud: '🔥',
  cold: '🥶', froid: '🥶',
  new: '✨', nouveau: '✨', neuf: '✨',
  old: '👴', vieux: '👴', ancien: '📜',
  good: '👍', bon: '👍', bien: '👍',
  bad: '👎', mauvais: '👎', mal: '👎',
  fast: '💨', rapide: '💨', vite: '💨',
  slow: '🐢', lent: '🐢',
  open: '🔓', ouvert: '🔓', ouvrir: '🚪',
  close: '🔒', ferme: '🔒', fermer: '🚪',
  red: '🔴', rouge: '🔴',
  blue: '🔵', bleu: '🔵',
  green: '🟢', vert: '🟢',
  yellow: '🟡', jaune: '🟡',
  orange_color: '🟠', orange_couleur: '🟠', // Distinguish from fruit
  purple: '🟣', violet: '🟣',
  black: '⚫', noir: '⚫',
  white: '⚪', blanc: '⚪',
  brown: '🟤', marron: '🟤', brun: '🟤',
  pink: '🩷', rose: '🩷',
  gray: '🩶', gris: '🩶',
  gold: '🥇', or: '🥇',
  silver: '🥈', argent_metal: '🥈', // Distinguish from money
  number: '#️⃣', numero: '#️⃣', chiffre: '🔢',
  one: '1️⃣', un: '1️⃣',
  two: '2️⃣', deux: '2️⃣',
  three: '3️⃣', trois: '3️⃣',
  hundred: '💯', cent: '💯',
  stop: '🛑', arreter: '🛑',
  warning: '⚠️', attention: '⚠️', avertissement: '⚠️',
  recycle: '♻️', recycler: '♻️',
  heart: '❤️', coeur: '❤️',
  broken_heart: '💔', "coeur brisé": '💔',
  kiss: '💋', bisou: '💋', embrasser: '💋',
  letter: '✉️', lettre: '✉️', mail: '📧', email: '📧',
  calendar: '📅', calendrier: '📅', date: '📅',
  clock: '⏰', horloge: '⏰',
  watch: '⌚', montre: '⌚',
  hourglass: '⏳', sablier: '⏳',
  search: '🔍', chercher: '🔍', rechercher: '🔍',
  zoom_in: '🔎',
  zoom_out: '🔎', // Same emoji, context dependent
  settings: '⚙️', parametres: '⚙️', reglages: '⚙️',
  power: '🔌', courant: '🔌', electricite: '⚡',
  battery: '🔋', batterie: '🔋',
  chart: '📊', graphique: '📊',
  pin: '📌', punaise: '📌', epingle: '📌',
  link: '🔗', lien: '🔗',
  flag: '🚩', drapeau: '🚩',
  switzerland: '🇨🇭', suisse: '🇨🇭', // Added country
  trophy: '🏆', trophee: '🏆',
  medal: '🏅', medaille: '🏅',
  win: '🎉', gagner: '🎉', victoire: '🏆',
  lose: '💔', perdre: '💔', defaite: '👎',
  idea_bulb: '💡',
  target: '🎯', cible: '🎯', objectif: '🎯',
  microphone: '🎤',
  headphones: '🎧', casque: '🎧', ecouteurs: '🎧',
  speaker: '🔊', hautparleur: '🔊',
  mute: '🔇', muet: '🔇',
  bell: '🔔', cloche: '🔔',
  book_open: '📖',
  bookmark: '🔖', signet: '🔖',
  newspaper: '📰', journal: '📰',
  map: '🗺️', carte: '🗺️', plan: '🗺️',
  compass: '🧭', boussole: '🧭',
  briefcase: '💼', mallette: '💼',
  folder: '📁', dossier: '📁',
  scissors: '✂️', ciseaux: '✂️',
  pencil: '✏️', crayon: '✏️',
  pen: '✒️', stylo: '✒️',
  paintbrush: '🖌️', pinceau: '🖌️',
  palette: '🎨',
  glasses: '👓', lunettes: '👓',
  sunglasses: '🕶️', "lunettes de soleil": '🕶️',
  shirt: '👕', chemise: '👕', tshirt: '👕',
  pants: '👖', pantalon: '👖',
  dress: '👗', robe: '👗',
  shoe: '👞', chaussure: '👞', shoes: '👟', chaussures: '👟',
  hat: '🧢', chapeau: '🧢', casquette: '🧢',
  crown: '👑', couronne: '👑',
  ring: '💍', bague: '💍', alliance: '💍',
  gem: '💎', gemme: '💎', diamant: '💎',
  umbrella: '☂️', parapluie: '☂️',
  bag: '👜', sac: '👜', purse: '👛', "sac à main": '👛', backpack: '🎒', "sac à dos": '🎒',
  shopping: '🛍️', acheter: '🛍️',
  cart: '🛒', chariot: '🛒', panier: '🛒',
  pill: '💊', pilule: '💊', medicament: '💊',
  syringe: '💉', seringue: '💉', vaccin: '💉',
  dna: '🧬', adn: '🧬',
  microscope: '🔬',
  telescope: '🔭',
  satellite: '🛰️',
  rocket: '🚀', fusee: '🚀',
  ufo: '🛸', ovni: '🛸',
  fireworks: '🎆', "feux d'artifice": '🎆',
  sparkles: '✨', etincelles: '✨',
  confetti: '🎊', confettis: '🎊',
  balloon_party: '🎈', "ballon de baudruche": '🎈',
  ghost: '👻', fantome: '👻',
  alien: '👽', extraterrestre: '👽',
  robot: '🤖',
  poop: '💩', caca: '💩',
  skull: '💀', "tête de mort": '💀', crane: '💀',
  clown: '🤡',
  devil: '😈', diable: '😈', demon: '👿',
  angel: '😇', ange: '😇',
  lips: '👄', levres: '👄',
  tongue: '👅', langue: '👅',
  nose: '👃', nez: '👃',
  eyes: '👀', yeux: '👀',
  ear: '👂', oreille: '👂',
  brain: '🧠', cerveau: '🧠',
  bone: '🦴', os: '🦴',
  muscle: '💪',
  hand: '✋', main: '✋', wave: '👋',
  fist: '✊', poing: '✊',
  peace: '✌️', paix: '✌️',
  fingers_crossed: '🤞', "doigts croisés": '🤞',
  pray: '🙏', prier: '🙏',
  clap: '👏', applaudir: '👏',
  writing_hand: '✍️',
  nail_polish: '💅', "vernis à ongles": '💅',
  selfie: '🤳',
  zzz: '😴', // Already have sleep, but zzz is common
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

  const copyToClipboard = () => {
    if (!translatedText) {
      showError('Rien à copier, le champ de traduction est vide.');
      return;
    }

    const dictionaryEmojiValues = new Set(Object.values(emojiDictionary));
    const parts = translatedText.split(/\s+/).filter(part => part.length > 0);
    const dictionaryEmojisFound = parts.filter(part => dictionaryEmojiValues.has(part));

    if (dictionaryEmojisFound.length > 0) {
      const emojisToCopyString = dictionaryEmojisFound.join(' ');
      
      console.log('Tentative de copie directe de :', emojisToCopyString); // Log avant la tentative de copie

      navigator.clipboard.writeText(emojisToCopyString)
        .then(() => {
          showSuccess('Emojis copiés !');
        })
        .catch(err => {
          console.error('Erreur DIRECTE lors de la copie : "' + emojisToCopyString + '"', err);
          showError('Impossible de copier les emojis. (Code: ESP_DIRECT)');
        });
    } else {
      showError('Aucun emoji (provenant du dictionnaire) trouvé à copier.');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Traducteur d’Emojis</CardTitle>
          <CardDescription className="text-center">
            {/* Description removed as requested */}
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
                placeholder="Par exemple: Bonjour monde chat heureux pomme"
                className="w-full"
              />
            </div>
            <Button 
              onClick={translateToEmoji} 
              className="button-29 w-full"
            >
              Traduire en Emoji
            </Button>
            {translatedText && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="translated-output" className="block">Résultat Emoji :</Label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard} title="Copier les emojis">
                    <Copy className="h-4 w-4 mr-1" /> Copier
                  </Button>
                </div>
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