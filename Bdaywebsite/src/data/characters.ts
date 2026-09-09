export interface CharacterData {
  id: string
  name: string
  message: string
  interactiveEmoji: string
  interactiveLabel: string
  bgGradient: string
  accentColor: string
  secondaryColor: string
}

export const characters: CharacterData[] = [
  {
    id: 'web',
    name: 'Web-Slinging Hero',
    message: '🕸️ With great power comes great cake. Swing high and never stop chasing your dreams! ❤️',
    interactiveEmoji: '🕸️',
    interactiveLabel: 'Touch the web',
    bgGradient: 'linear-gradient(180deg, #0a0e2a 0%, #1a1040 30%, #0d1535 60%, #15102a 100%)',
    accentColor: '#e83030',
    secondaryColor: '#1a40c0',
  },
  {
    id: 'green',
    name: 'Powerful Green Hero',
    message: '💚🎉 You are way stronger than you think. Smash every challenge with that amazing heart of yours! ✨',
    interactiveEmoji: '💚',
    interactiveLabel: 'Touch the gem',
    bgGradient: 'linear-gradient(180deg, #0a1a0a 0%, #0d2010 30%, #102818 60%, #081508 100%)',
    accentColor: '#30c040',
    secondaryColor: '#8040c0',
  },
  {
    id: 'pirate',
    name: 'Anime Pirate Boy',
    message: '🏴‍☠️🎂 Your next adventure starts today — set sail for happiness and treasure every moment! ❤️',
    interactiveEmoji: '🏴‍☠️',
    interactiveLabel: 'Touch the treasure',
    bgGradient: 'linear-gradient(180deg, #0a1526 0%, #12304a 30%, #0e2038 60%, #08121f 100%)',
    accentColor: '#ff9a2a',
    secondaryColor: '#1f8fc0',
  },
  {
    id: 'electric',
    name: 'Cute Electric Creature',
    message: '⚡🎂 Thanks for being a super friend. You are positively electric! ❤️',
    interactiveEmoji: '⚡',
    interactiveLabel: 'Touch the spark',
    bgGradient: 'linear-gradient(180deg, #081020 0%, #10203c 25%, #0a1830 60%, #060a16 100%)',
    accentColor: '#ffd23a',
    secondaryColor: '#ff7a2a',
  },
  {
    id: 'redhair',
    name: 'Red-Haired 1980s Girl',
    message: '❤️✨ Never forget how strong and special you are. Keep being yourself and never stop moving forward! 🎂',
    interactiveEmoji: '🛹',
    interactiveLabel: 'Touch the skateboard',
    bgGradient: 'linear-gradient(180deg, #1a0a10 0%, #200818 30%, #180a20 60%, #100815 100%)',
    accentColor: '#ff4060',
    secondaryColor: '#ff8030',
  },
  {
    id: 'psychic',
    name: 'Psychic Girl',
    message: '🛸🎂 I have a feeling this year holds something incredible for you. Trust it — and trust you! ❤️',
    interactiveEmoji: '🛸',
    interactiveLabel: 'Touch the arcade',
    bgGradient: 'linear-gradient(180deg, #0d0820 0%, #1a0a30 30%, #0d1028 60%, #0a0818 100%)',
    accentColor: '#ff6030',
    secondaryColor: '#30c0ff',
  },
  {
    id: 'retrohero',
    name: '1980s Hero Boy',
    message: '🕶️🎉 Stay cool, stay kind, and keep making every day feel like a movie — starring you! ❤️',
    interactiveEmoji: '🛍️',
    interactiveLabel: 'Touch the badge',
    bgGradient: 'linear-gradient(180deg, #1a1508 0%, #201a0a 30%, #1a1510 60%, #120d08 100%)',
    accentColor: '#ff9030',
    secondaryColor: '#ffd040',
  },
  {
    id: 'curly',
    name: 'Curly-Haired Supernatural Boy',
    message: '🎂⚡ Some mysteries are worth solving — and you are definitely one of the best parts of the story! ❤️',
    interactiveEmoji: '🧀',
    interactiveLabel: 'Touch the compass',
    bgGradient: 'linear-gradient(180deg, #0e0a1e 0%, #1c1434 30%, #120e28 60%, #0a0818 100%)',
    accentColor: '#4aa8ff',
    secondaryColor: '#ffb040',
  },
  {
    id: 'gothic',
    name: 'Gothic Anime Girl',
    message: '🖤✨ Stay confident, unique, beautiful, and completely yourself. 🎂',
    interactiveEmoji: '🖤',
    interactiveLabel: 'Touch the heart',
    bgGradient: 'linear-gradient(180deg, #080808 0%, #101015 30%, #0a0a10 60%, #050508 100%)',
    accentColor: '#d02040',
    secondaryColor: '#ffffff',
  },
]

export const sceneOrder: string[] = characters.map((c) => c.id)