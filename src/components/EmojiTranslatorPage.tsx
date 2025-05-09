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
  sorry: '😔', désolé: '😔',
  welcome: '🤗', bienvenue: '🤗',
  question: '❓', help: '🆘', aide: '🆘',

  // Emotions & Feelings
  happy: '😄', heureux: '😄', content: '😄',
  joy: '😂', joie: '😂',
  sad: '😢', triste: '😢',
  love: '❤️', amour: '❤️',
  like: '👍', aimer: '👍', apprécier: '👍', "pouce levé": '👍',
  laugh: '😂', rire: '😂',
  smile: '😊', sourire: '😊',
  cry: '😭', pleurer: '😭',
  angry: '😠', colère: '😠', "en colère": '😠', fâché: '😠',
  surprised: '😮', surpris: '😮', étonné: '😮',
  shocked: '😱', choqué: '😱',
  cool: '😎', génial: '😎',
  wow: '🤩',
  sleep: '😴', dormir: '😴',
  tired: '😫', fatigué: '😫', épuisé: '😫',
  sick: '🤢', malade: '🤢',
  wink: '😉', "clin d'oeil": '😉', "clin dœil": '😉', clin: '😉',
  blush: '😊', rougir: '😊',
  thinking: '🤔', penser: '🤔', réfléchir: '🤔',
  confused: '😕', confus: '😕', perplexe: '😕',
  scared: '😨', peur: '😨', effrayé: '😨',
  excited: '🥳', excité: '🥳', enthousiaste: '🥳',
  proud: '🥲', fier: '🥲',
  peace: '✌️', paix: '✌️', "émoji V": '✌️',

  // People & Family
  friend: '🧑‍🤝‍🧑', ami: '🧑‍🤝‍🧑', copain: '🧑‍🤝‍🧑', copine: '🧑‍🤝‍🧑',
  family: '👨‍👩‍👧‍👦', famille: '👨‍👩‍👧‍👦',
  man: '👨', homme: '👨',
  woman: '👩', femme: '👩',
  boy: '👦', garçon: '👦',
  girl: '👧', fille: '👧',
  baby: '👶', bébé: '👶',
  child: '🧒', enfant: '🧒',
  teacher: '🧑‍🏫', professeur: '🧑‍🏫', enseignant: '🧑‍🏫',
  student: '🧑‍🎓', étudiant: '🧑‍🎓', élève: '🧑‍🎓',
  doctor: '🧑‍⚕️', docteur: '🧑‍⚕️', médecin: '🧑‍⚕️',
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
  spider: '🕷️', araignée: '🕷️',
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
  cake: '🍰', gâteau: '🍰',
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
  watermelon: '🍉', pastèque: '🍉',
  peach: '🍑', pêche: '🍑', // Fruit
  cherry: '🍒', cerise: '🍒',
  lemon: '🍋', citron: '🍋',
  coconut: '🥥', "noix de coco": '🥥',
  avocado: '🥑', avocat: '🥑', // Fruit
  eggplant: '🍆', aubergine: '🍆',
  potato: '🥔', "pomme de terre": '🥔',
  carrot: '🥕', carotte: '🥕',
  corn: '🌽', maïs: '🌽',
  broccoli: '🥦', brocoli: '🥦',
  tomato: '🍅', tomate: '🍅',
  mushroom: '🍄', champignon: '🍄',
  pepper: '🌶️', piment: '🌶️', // Hot pepper
  poivron: '🫑', // Bell pepper
  onion: '🧅', oignon: '🧅',
  garlic: '🧄', ail: '🧄',
  cucumber: '🥒', concombre: '🥒',
  lettuce: '🥬', laitue: '🥬', salade: '🥗', // Salad
  coffee: '☕', café: '☕',
  tea: '🍵', thé: '🍵',
  water: '💧', eau: '💧',
  wine: '🍷', vin: '🍷',
  beer: '🍺', bière: '🍺',
  milk: '🥛', lait: '🥛',
  juice: '🧃', jus: '🧃',

  // Activities, Hobbies & Objects
  world: '🌍', monde: '🌍', earth: '🌍', terre: '🌍', planet: '🌍', planète: '🌍',
  computer: '💻', ordinateur: '💻',
  code: '💻', coder: '💻',
  react: '⚛️', // Specific to tech
  party: '🎉', fête: '🎉', celebration: '🥳', célébration: '🥳', celebrer: '🥳', célébrer: '🥳',
  money: '💰', argent: '💰',
  time: '⏰', temps: '⏰', heure: '🕒',
  idea: '💡', idée: '💡',
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
  photo: '📷', caméra: '📷',
  phone: '📱', téléphone: '📱', call: '📞', appeler: '📞',
  television: '📺', tv: '📺', télé: '📺', télévision: '📺',
  movie: '🎬', film: '🎬', cinéma: '🎦',
  work: '💼', travail: '💼', travailler: '💼', job: '🧑‍💼',
  study: '📖', étudier: '📖', learn: '🧠', apprendre: '🧠',
  write: '✍️', écrire: '✍️',
  run: '🏃', courir: '🏃',
  walk: '🚶', marcher: '🚶',
  travel: '✈️', voyager: '✈️', trip: '🗺️', voyage: '🗺️',
  car: '🚗', voiture: '🚗', drive: '🚗', conduire: '🚗',
  train: '🚆',
  bus: '🚌',
  bicycle: '🚲', vélo: '🚲',
  boat: '⛵', bateau: '⛵', ship: '🚢', navire: '🚢',
  plane: '✈️', avion: '✈️', flight: '✈️', vol: '✈️',
  house: '🏠', maison: '🏠', home: '🏡', foyer: '🏡',
  building: '🏢', bâtiment: '🏢',
  city: '🏙️', ville: '🏙️',
  road: '🛣️', route: '🛣️', street: 'ରାସ୍ତା', rue: 'ରାସ୍ତା', // Using a generic road symbol as street emoji varies
  park: '🏞️', parc: '🏞️',
  tree: '🌳', arbre: '🌳', forest: '🌲🌲', forêt: '🌲🌲',
  flower: '🌸', fleur: '🌸', plant: '🪴', plante: '🪴',
  key: '🔑', clé: '🔑',
  lock: '🔒', cadenas: '🔒', verrou: '🔒',
  tool: '🛠️', outil: '🛠️',
  light: '💡', lumière: '💡', lamp: '💡', lampe: '💡',
  fire: '🔥', feu: '🔥',
  bomb: '💣', bombe: '💣',
  gun: '🔫', pistolet: '🔫',
  knife: '🔪', couteau: '🔪',

  // Nature & Weather
  sun: '☀️', soleil: '☀️',
  moon: '🌙', lune: '🌙',
  star: '⭐', étoile: '⭐',
  sky: '🌌', ciel: '🌌',
  cloud: '☁️', nuage: '☁️',
  rain: '🌧️', pluie: '🌧️', pleuvoir: '🌧️',
  snow: '❄️', neige: '❄️', neiger: '❄️',
  storm: '⛈️', orage: '⛈️', tempête: '🌪️',
  wind: '🌬️', vent: '🌬️',
  rainbow: '🌈', "arc-en-ciel": '🌈',
  mountain: '⛰️', montagne: '⛰️',
  volcano: '🌋', volcan: '🌋',
  beach: '🏖️', plage: '🏖️',
  ocean: '🌊', océan: '🌊', sea: '🌊', mer: '🌊',
  river: '🏞️', rivière: '🏞️', // Park can also represent river landscape
  desert: '🏜️', désert: '🏜️', // English "desert" kept, French "désert" is primary

  // Abstract & Miscellaneous
  look: '👀', regarder: '👀', see: '👀', voir: '👀',
  hear: '👂', entendre: '👂', listen: '🎧', écouter: '🎧',
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
  close: '🔒', fermé: '🔒', fermer: '🚪', // "ferme" (unaccented adj) removed
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
  silver: '🥈', argent_métal: '🥈', // "argent_metal" removed
  number: '#️⃣', numéro: '#️⃣', chiffre: '🔢',
  one: '1️⃣', un: '1️⃣',
  two: '2️⃣', deux: '2️⃣',
  three: '3️⃣', trois: '3️⃣',
  hundred: '💯', cent: '💯',
  stop: '🛑', arrêter: '🛑',
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
  settings: '⚙️', paramètres: '⚙️', réglages: '⚙️',
  power: '🔌', courant: '🔌', électricité: '⚡',
  battery: '🔋', batterie: '🔋',
  chart: '📊', graphique: '📊',
  pin: '📌', punaise: '📌', épingle: '📌',
  link: '🔗', lien: '🔗',
  flag: '🚩', drapeau: '🚩',
  switzerland: '🇨🇭', suisse: '🇨🇭', // Added country
  trophy: '🏆', trophée: '🏆',
  medal: '🏅', médaille: '🏅',
  win: '🎉', gagner: '🎉', victoire: '🏆',
  lose: '💔', perdre: '💔', défaite: '👎',
  idea_bulb: '💡',
  target: '🎯', cible: '🎯', objectif: '🎯',
  microphone: '🎤',
  headphones: '🎧', casque: '🎧', écouteurs: '🎧',
  speaker: '🔊', "haut-parleur": '🔊',
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
  pill: '💊', pilule: '💊', médicament: '💊',
  syringe: '💉', seringue: '💉', vaccin: '💉',
  dna: '🧬', adn: '🧬',
  microscope: '🔬',
  telescope: '🔭', télescope: '🔭',
  satellite: '🛰️',
  rocket: '🚀', fusée: '🚀',
  ufo: '🛸', ovni: '🛸',
  fireworks: '🎆', "feux d'artifice": '🎆',
  sparkles: '✨', étincelles: '✨',
  confetti: '🎊', confettis: '🎊',
  balloon_party: '🎈', "ballon de baudruche": '🎈',
  ghost: '👻', fantôme: '👻',
  alien: '👽', extraterrestre: '👽',
  robot: '🤖',
  poop: '💩', caca: '💩',
  skull: '💀', "tête de mort": '💀', crâne: '💀',
  clown: '🤡',
  devil: '😈', diable: '😈', démon: '👿',
  angel: '😇', ange: '😇',
  lips: '👄', lèvres: '👄',
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

// List of unaccented French words or common loanwords from the dictionary to be included in the display list
const unaccentedFrenchAndLoanwords = new Set([
  "bonjour", "salut", "aurevoir", "oui", "non", "merci", "bienvenue", "aide", "content", "joie", "rire", "sourire", "pleurer", "amour", "aimer", "penser", "paix", "ami", "copain", "copine", "famille", "homme", "femme", "garcon", "fille", "enfant", "professeur", "enseignant", "eleve", "docteur", "medecin", "policier", "animal", "chat", "chien", "oiseau", "poisson", "lion", "ours", "singe", "cheval", "vache", "cochon", "mouton", "poulet", "poule", "canard", "souris", "lapin", "grenouille", "abeille", "papillon", "serpent", "tortue", "dauphin", "baleine", "pieuvre", "poulpe", "nourriture", "repas", "manger", "boire", "pizza", "hamburger", "taco", "sushi", "glace", "biscuit", "chocolat", "bonbon", "popcorn", "frites", "pain", "fromage", "oeuf", "pomme", "banane", "orange", "poire", "ananas", "fraise", "raisin", "raisins", "citron", "avocat", "aubergine", "carotte", "brocoli", "tomate", "champignon", "piment", "poivron", "oignon", "ail", "concombre", "laitue", "salade", "vin", "lait", "jus", "monde", "terre", "ordinateur", "coder", "temps", "livre", "lire", "musique", "chanson", "chanter", "danser", "jeu", "jouer", "sport", "football", "basketball", "baseball", "tennis", "volleyball", "balle", "ballon", "cadeau", "present", "camera", "telephone", "appeler", "tele", "tv", "film", "cinema", "travail", "travailler", "job", "apprendre", "ecrire", "courir", "marcher", "voyager", "voyage", "voiture", "conduire", "train", "bus", "velo", "bateau", "navire", "avion", "vol", "maison", "foyer", "batiment", "ville", "route", "rue", "parc", "arbre", "foret", "fleur", "plante", "cadenas", "verrou", "outil", "lumiere", "lampe", "feu", "bombe", "pistolet", "couteau", "soleil", "lune", "ciel", "nuage", "pluie", "pleuvoir", "neige", "neiger", "orage", "vent", "regarder", "voir", "entendre", "ecouter", "parler", "dire", "son", "fort", "faible", "grand", "petit", "chaud", "froid", "neuf", "vieux", "ancien", "bon", "bien", "mauvais", "mal", "vite", "lent", "ouvert", "ouvrir", "fermer", "rouge", "bleu", "vert", "jaune", "orange_couleur", "violet", "noir", "blanc", "marron", "brun", "rose", "gris", "or", "chiffre", "un", "deux", "trois", "cent", "stop", "attention", "avertissement", "recycler", "coeur", "bisou", "embrasser", "lettre", "email", "date", "horloge", "montre", "sablier", "chercher", "rechercher", "courant", "batterie", "graphique", "punaise", "epingle", "lien", "drapeau", "suisse", "victoire", "cible", "objectif", "casque", "muet", "cloche", "signet", "journal", "carte", "plan", "boussole", "mallette", "dossier", "ciseaux", "crayon", "stylo", "pinceau", "palette", "lunettes", "chemise", "tshirt", "pantalon", "robe", "chaussure", "chaussures", "chapeau", "casquette", "couronne", "bague", "alliance", "gemme", "diamant", "parapluie", "sac", "acheter", "chariot", "panier", "pilule", "vaccin", "adn", "microscope", "satellite", "ovni", "confettis", "caca", "crane", "diable", "ange", "langue", "nez", "yeux", "oreille", "cerveau", "os", "muscle", "main", "poing", "prier", "applaudir", "code", "wow"
]);


const EmojiTranslatorPage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [omittedWords, setOmittedWords] = useState<string[]>([]);

  const frenchDisplayKeywords = useMemo(() => {
    const allKeywords = Object.keys(emojiDictionary);
    const frenchRegex = /[éèêëàâäôöûüùîïç']/;
    const wordsToExcludeFromDisplay = new Set(["télescope", "émoji V", "react", "télévision"]);

    const filteredKeywords = allKeywords.filter(keyword => {
      if (wordsToExcludeFromDisplay.has(keyword)) {
        return false;
      }
      if (frenchRegex.test(keyword)) {
        return true;
      }
      return unaccentedFrenchAndLoanwords.has(keyword);
    });
  
    return filteredKeywords.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
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
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-x-6 text-xs">
          {frenchDisplayKeywords.map((keyword) => {
            let displayKeyword = keyword;
            if (keyword === "argent_métal") {
              displayKeyword = "argent";
            }

            const firstCharNormalized = displayKeyword
              .charAt(0)
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();
            
            let colorStyle = { color: 'inherit' }; // Default: black or current text color

            if (firstCharNormalized >= 'a' && firstCharNormalized <= 'z') {
              const alphaIndex = firstCharNormalized.charCodeAt(0) - 'a'.charCodeAt(0);
              // Si l'index de la lettre (0 pour 'a', 1 pour 'b', ...) est pair, couleur bleue. Sinon, noir.
              if (alphaIndex % 2 === 0) { 
                colorStyle = { color: '#5868f6' };
              }
            }
            
            return (
              <div key={keyword} className="break-inside-avoid-column mb-1.5" style={colorStyle}>
                {displayKeyword}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default EmojiTranslatorPage;