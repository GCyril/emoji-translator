"use client";

import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy, Trash2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

// An extensively expanded dictionary for word-to-emoji translation
const emojiDictionary: Record<string, string> = {
  // Greetings & Basic Communication
  hello: '👋', bonjour: '👋', hi: '👋', salut: '👋',
  goodbye: '👋', aurevoir: '👋', bye: '👋',
  yes: '✅', oui: '✅',
  no: '❌', non: '❌',
  please: '🙏', "s'il vous plaît": '🙏', "s'il te plaît": '🙏',
  thankyou: '😊', "thank you": '😊', merci: '😊',
  sorry: '😔', desole: '😔', désolé: '😔',
  welcome: '🤗', bienvenue: '🤗',
  question: '❓', help: '🆘', aide: '🆘',

  // Emotions & Feelings
  happy: '😄', heureux: '😄', content: '😄',
  joy: '😂', joie: '😂',
  sad: '😢', triste: '😢',
  love: '❤️', amour: '❤️',
  like: '👍', aimer: '👍', apprecier: '👍', apprécier: '👍', "pouce levé": '👍',
  laugh: '😂', rire: '😂',
  smile: '😊', sourire: '😊',
  cry: '😭', pleurer: '😭',
  angry: '😠', colere: '😠', colère: '😠', "en colère": '😠', fache: '😠', fâché: '😠',
  surprised: '😮', surpris: '😮', etonne: '😮', étonné: '😮',
  shocked: '😱', choque: '😱', choqué: '😱',
  cool: '😎', genial: '😎', génial: '😎',
  wow: '🤩',
  sleep: '😴', dormir: '😴',
  tired: '😫', fatigue: '😫', fatigué: '😫', epuise: '😫', épuisé: '😫',
  sick: '🤢', malade: '🤢',
  wink: '😉', "clin d'oeil": '😉', "clin dœil": '😉', clin: '😉',
  blush: '😊', rougir: '😊',
  thinking: '🤔', penser: '🤔', reflechir: '🤔', réfléchir: '🤔',
  confused: '😕', confus: '😕', perplexe: '😕',
  scared: '😨', peur: '😨', effraye: '😨', effrayé: '😨',
  excited: '🥳', excite: '🥳', excité: '🥳', enthousiaste: '🥳',
  proud: '🥲', fier: '🥲',
  peace: '✌️', paix: '✌️', "émoji V": '✌️',

  // People & Family
  friend: '🧑‍🤝‍🧑', ami: '🧑‍🤝‍🧑', copain: '🧑‍🤝‍🧑', copine: '🧑‍🤝‍🧑',
  family: '👨‍👩‍👧‍👦', famille: '👨‍👩‍👧‍👦',
  man: '👨', homme: '👨',
  woman: '👩', femme: '👩',
  boy: '👦', garcon: '👦', garçon: '👦',
  girl: '👧', fille: '👧',
  baby: '👶', bebe: '👶', bébé: '👶',
  child: '🧒', enfant: '🧒',
  teacher: '🧑‍🏫', professeur: '🧑‍🏫', enseignant: '🧑‍🏫',
  student: '🧑‍🎓', etudiant: '🧑‍🎓', étudiant: '🧑‍🎓', eleve: '🧑‍🎓', élève: '🧑‍🎓',
  doctor: '🧑‍⚕️', docteur: '🧑‍⚕️', medecin: '🧑‍⚕️', médecin: '🧑‍⚕️',
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
  spider: '🕷️', araignee: '🕷️', araignée: '🕷️',
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
  cake: '🍰', gateau: '🍰', gâteau: '🍰',
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
  watermelon: '🍉', pasteque: '🍉', pastèque: '🍉',
  peach: '🍑', peche: '🍑', pêche: '🍑', // Fruit
  cherry: '🍒', cerise: '🍒',
  lemon: '🍋', citron: '🍋',
  coconut: '🥥', "noix de coco": '🥥',
  avocado: '🥑', avocat: '🥑', // Fruit
  eggplant: '🍆', aubergine: '🍆',
  potato: '🥔', "pomme de terre": '🥔',
  carrot: '🥕', carotte: '🥕',
  corn: '🌽', mais: '🌽', maïs: '🌽',
  broccoli: '🥦', brocoli: '🥦',
  tomato: '🍅', tomate: '🍅',
  mushroom: '🍄', champignon: '🍄',
  pepper: '🌶️', piment: '🌶️', // Hot pepper
  poivron: '🫑', // Bell pepper
  onion: '🧅', oignon: '🧅',
  garlic: '🧄', ail: '🧄',
  cucumber: '🥒', concombre: '🥒',
  lettuce: '🥬', laitue: '🥬', salade: '🥗', // Salad
  coffee: '☕', cafe: '☕', café: '☕',
  tea: '🍵', the: '🍵', thé: '🍵',
  water: '💧', eau: '💧',
  wine: '🍷', vin: '🍷',
  beer: '🍺', biere: '🍺', bière: '🍺',
  milk: '🥛', lait: '🥛',
  juice: '🧃', jus: '🧃',

  // Activities, Hobbies & Objects
  world: '🌍', monde: '🌍', earth: '🌍', terre: '🌍', planet: '🌍', planète: '🌍',
  computer: '💻', ordinateur: '💻',
  code: '💻', coder: '💻',
  react: '⚛️', // Specific to tech
  party: '🎉', fete: '🎉', fête: '🎉', celebration: '🥳', célébration: '🥳', celebrer: '🥳', célébrer: '🥳',
  money: '💰', argent: '💰',
  time: '⏰', temps: '⏰', heure: '🕒',
  idea: '💡', idee: '💡', idée: '💡',
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
  gift: '🎁', cadeau: '🎁', present: '🎁', présent: '🎁',
  photo: '📷', camera: '📷', caméra: '📷',
  phone: '📱', telephone: '📱', téléphone: '📱', call: '📞', appeler: '📞',
  television: '📺', tv: '📺', tele: '📺', télé: '📺', télévision: '📺',
  movie: '🎬', film: '🎬', cinema: '🎦', cinéma: '🎦',
  work: '💼', travail: '💼', travailler: '💼', job: '🧑‍💼',
  study: '📖', etudier: '📖', étudier: '📖', learn: '🧠', apprendre: '🧠',
  write: '✍️', ecrire: '✍️', écrire: '✍️',
  run: '🏃', courir: '🏃',
  walk: '🚶', marcher: '🚶',
  travel: '✈️', voyager: '✈️', trip: '🗺️', voyage: '🗺️',
  car: '🚗', voiture: '🚗', drive: '🚗', conduire: '🚗',
  train: '🚆',
  bus: '🚌',
  bicycle: '🚲', velo: '🚲', vélo: '🚲',
  boat: '⛵', bateau: '⛵', ship: '🚢', navire: '🚢',
  plane: '✈️', avion: '✈️', flight: '✈️', vol: '✈️',
  house: '🏠', maison: '🏠', home: '🏡', foyer: '🏡',
  building: '🏢', batiment: '🏢', bâtiment: '🏢',
  city: '🏙️', ville: '🏙️',
  road: '🛣️', route: '🛣️', street: 'ରାସ୍ତା', rue: 'ରାସ୍ତା', // Using a generic road symbol as street emoji varies
  park: '🏞️', parc: '🏞️',
  tree: '🌳', arbre: '🌳', forest: '🌲🌲', foret: '🌲🌲', forêt: '🌲🌲',
  flower: '🌸', fleur: '🌸', plant: '🪴', plante: '🪴',
  key: '🔑', cle: '🔑', clé: '🔑',
  lock: '🔒', cadenas: '🔒', verrou: '🔒',
  tool: '🛠️', outil: '🛠️',
  light: '💡', lumiere: '💡', lumière: '💡', lamp: '💡', lampe: '💡',
  fire: '🔥', feu: '🔥',
  bomb: '💣', bombe: '💣',
  gun: '🔫', pistolet: '🔫',
  knife: '🔪', couteau: '🔪',

  // Nature & Weather
  sun: '☀️', soleil: '☀️',
  moon: '🌙', lune: '🌙',
  star: '⭐', etoile: '⭐', étoile: '⭐',
  sky: '🌌', ciel: '🌌',
  cloud: '☁️', nuage: '☁️',
  rain: '🌧️', pluie: '🌧️', pleuvoir: '🌧️',
  snow: '❄️', neige: '❄️', neiger: '❄️',
  storm: '⛈️', orage: '⛈️', tempete: '🌪️', tempête: '🌪️',
  wind: '🌬️', vent: '🌬️',
  rainbow: '🌈', "arc-en-ciel": '🌈',
  mountain: '⛰️', montagne: '⛰️',
  volcano: '🌋', volcan: '🌋',
  beach: '🏖️', plage: '🏖️',
  ocean: '🌊', océan: '🌊', sea: '🌊', mer: '🌊',
  river: '🏞️', riviere: '🏞️', rivière: '🏞️', // Park can also represent river landscape
  desert: '🏜️', désert: '🏜️', // Corrected from desert: '🏜️', desert: '🏜️',

  // Abstract & Miscellaneous
  look: '👀', regarder: '👀', see: '👀', voir: '👀',
  hear: '👂', entendre: '👂', listen: '🎧', ecouter: '🎧', écouter: '🎧',
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
  close: '🔒', ferme: '🔒', fermé: '🔒', fermer: '🚪',
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
  silver: '🥈', argent_metal: '🥈', argent_métal: '🥈', // Distinguish from money
  number: '#️⃣', numero: '#️⃣', numéro: '#️⃣', chiffre: '🔢',
  one: '1️⃣', un: '1️⃣',
  two: '2️⃣', deux: '2️⃣',
  three: '3️⃣', trois: '3️⃣',
  hundred: '💯', cent: '💯',
  stop: '🛑', arreter: '🛑', arrêter: '🛑',
  warning: '⚠️', attention: '⚠️', avertissement: '⚠️',
  recycle: '♻️', recycler: '♻️',
  heart: '❤️', coeur: '❤️',
  broken_heart: '💔', "coeur brisé": '💔',
  kiss: '💋', bisou: '💋', embrasser: '💋',
  letter: '✉️', lettre: '✉️', mail: '📧', email: '📧', "e-mail": '📧',
  calendar: '📅', calendrier: '📅', date: '📅',
  clock: '⏰', horloge: '⏰',
  watch: '⌚', montre: '⌚',
  hourglass: '⏳', sablier: '⏳',
  search: '🔍', chercher: '🔍', rechercher: '🔍',
  zoom_in: '🔎',
  zoom_out: '🔎', // Same emoji, context dependent
  settings: '⚙️', parametres: '⚙️', paramètres: '⚙️', reglages: '⚙️', réglages: '⚙️',
  power: '🔌', courant: '🔌', electricite: '⚡', électricité: '⚡',
  battery: '🔋', batterie: '🔋',
  chart: '📊', graphique: '📊',
  pin: '📌', punaise: '📌', epingle: '📌', épingle: '📌',
  link: '🔗', lien: '🔗',
  flag: '🚩', drapeau: '🚩',
  switzerland: '🇨🇭', suisse: '🇨🇭', // Added country
  trophy: '🏆', trophee: '🏆', trophée: '🏆',
  medal: '🏅', medaille: '🏅', médaille: '🏅',
  win: '🎉', gagner: '🎉', victoire: '🏆',
  lose: '💔', perdre: '💔', defaite: '👎', défaite: '👎',
  idea_bulb: '💡',
  target: '🎯', cible: '🎯', objectif: '🎯',
  microphone: '🎤',
  headphones: '🎧', casque: '🎧', ecouteurs: '🎧', écouteurs: '🎧',
  speaker: '🔊', hautparleur: '🔊', "haut-parleur": '🔊',
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
  pill: '💊', pilule: '💊', medicament: '💊', médicament: '💊',
  syringe: '💉', seringue: '💉', vaccin: '💉',
  dna: '🧬', adn: '🧬',
  microscope: '🔬',
  telescope: '🔭', télescope: '🔭',
  satellite: '🛰️',
  rocket: '🚀', fusee: '🚀', fusée: '🚀',
  ufo: '🛸', ovni: '🛸',
  fireworks: '🎆', "feux d'artifice": '🎆',
  sparkles: '✨', etincelles: '✨', étincelles: '✨',
  confetti: '🎊', confettis: '🎊',
  balloon_party: '🎈', "ballon de baudruche": '🎈',
  ghost: '👻', fantome: '👻', fantôme: '👻',
  alien: '👽', extraterrestre: '👽',
  robot: '🤖',
  poop: '💩', caca: '💩',
  skull: '💀', "tête de mort": '💀', crane: '💀', crâne: '💀',
  clown: '🤡',
  devil: '😈', diable: '😈', demon: '👿', démon: '👿',
  angel: '😇', ange: '😇',
  lips: '👄', levres: '👄', lèvres: '👄',
  tongue: '👅', langue: '👅',
  nose: '👃', nez: '👃',
  eyes: '👀', yeux: '👀',
  ear: '👂', oreille: '👂',
  brain: '🧠', cerveau: '🧠',
  bone: '🦴', os: '🦴',
  muscle: '💪',
  hand: '✋', main: '✋', wave: '👋',
  fist: '✊', poing: '✊',
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
  const [omittedWords, setOmittedWords] = useState<string[]>([]);

  const sortedDictionaryKeywords = useMemo(() => {
    return Object.keys(emojiDictionary).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
  }, []);

  const translateToEmoji = () => {
    const normalizedInput = inputText.toLowerCase().replace(/[.,!?;:"“”()]/g, '');
    const inputWords = normalizedInput.split(/\s+/).filter(word => word.length > 0);

    const translatedEmojisArray: string[] = [];
    const currentOmittedWordsArray: string[] = [];

    const sortedDictKeysForLookup = Object.keys(emojiDictionary).sort((a, b) => b.length - a.length);

    let i = 0;
    while (i < inputWords.length) {
      let matchedKey = null;
      for (const key of sortedDictKeysForLookup) {
        const keyWords = key.split(' ');
        if (inputWords.length >= i + keyWords.length) {
          const potentialMatch = inputWords.slice(i, i + keyWords.length).join(' ');
          if (potentialMatch === key) {
            matchedKey = key;
            break;
          }
        }
      }

      if (matchedKey) {
        translatedEmojisArray.push(emojiDictionary[matchedKey]);
        i += matchedKey.split(' ').length;
      } else {
        currentOmittedWordsArray.push(inputWords[i]);
        i++;
      }
    }
    
    setTranslatedText(translatedEmojisArray.join(' '));
    setOmittedWords(currentOmittedWordsArray);
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
    navigator.clipboard.writeText(translatedText)
      .then(() => {
        showSuccess('Emojis copiés !');
      })
      .catch(err => {
        console.error('Erreur lors de la copie : ', err);
        showError('Impossible de copier les emojis.');
      });
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setOmittedWords([]);
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
                placeholder="Par exemple: clin soleil heureux"
                className="w-full"
              />
            </div>
            <Button 
              onClick={translateToEmoji} 
              className="button-29 w-full"
            >
              Traduire en Emoji
            </Button>
            
            {(translatedText || omittedWords.length > 0) && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <Button variant="ghost" size="sm" onClick={handleClear} title="Effacer la traduction et le texte saisi">
                    <Trash2 className="h-4 w-4 mr-1" /> Effacer
                  </Button>
                  {translatedText && (
                    <Button variant="ghost" size="sm" onClick={copyToClipboard} title="Copier les emojis">
                      <Copy className="h-4 w-4 mr-1" /> Copier
                    </Button>
                  )}
                </div>

                {translatedText && (
                  <Card id="translated-output" className="p-4 bg-secondary">
                    <p className="text-3xl break-words text-center">{translatedText}</p>
                  </Card>
                )}

                {omittedWords.length > 0 && (
                  <div className="text-center mt-2">
                    <p className="text-xs text-muted-foreground">
                      Pas d’équivalent emoji pour :{' '}
                      {omittedWords.map((word, index) => (
                        <React.Fragment key={word + index}>
                          <span style={{ color: '#5868f6' }}>{word}</span>
                          {index < omittedWords.length - 1 && ', '}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 w-full max-w-3xl">
        <h3 className="text-lg font-semibold mb-6 text-center">Mots-clés du dictionnaire :</h3>
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-x-6 text-xs">
          {sortedDictionaryKeywords.map((keyword) => (
            <div key={keyword} className="break-inside-avoid-column mb-1.5">
              {keyword}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default EmojiTranslatorPage;