import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Completely mock the entire @mui/icons-material module to prevent EMFILE errors
vi.mock('@mui/icons-material', () => ({
  PlayArrow: () => '▶',
  Close: () => '✕',
  ArrowBack: () => '←',
  ArrowForward: () => '→',
  HourglassEmpty: () => '⏳',
  ExpandMore: () => '▼',
  ExpandLess: () => '▲',
  QuestionAnswer: () => '❓',
  LocationOn: () => '📍',
  Work: () => '💼',
  School: () => '🎓',
  // Add any other icons that might be used
  default: {
    PlayArrow: () => '▶',
    Close: () => '✕',
    ArrowBack: () => '←',
    ArrowForward: () => '→',
    HourglassEmpty: () => '⏳',
    ExpandMore: () => '▼',
    ExpandLess: () => '▲',
    QuestionAnswer: () => '❓',
    LocationOn: () => '📍',
    Work: () => '💼',
    School: () => '🎓',
  },
}))

// Also mock specific icon imports to be extra safe
vi.mock('@mui/icons-material/PlayArrow', () => ({
  __esModule: true,
  default: () => '▶',
}))

vi.mock('@mui/icons-material/Close', () => ({
  __esModule: true,
  default: () => '✕',
}))

vi.mock('@mui/icons-material/ArrowBack', () => ({
  __esModule: true,
  default: () => '←',
}))

vi.mock('@mui/icons-material/ArrowForward', () => ({
  __esModule: true,
  default: () => '→',
}))

vi.mock('@mui/icons-material/HourglassEmpty', () => ({
  __esModule: true,
  default: () => '⏳',
}))

// Mock JSON imports
vi.mock('../mocks/stories.json', () => ({
  default: [
    {
      id: '1',
      title: 'Max Startup is Rocketing',
      excerpt: 'From concept to seed funding in 6 months.',
      fullDescription: 'Max joined TechLabs with a background in business but no technical skills.',
      imageUrl: '/img/stories/max.jpg',
      href: '/stories/max-startup',
      track: 'web-dev',
      trackLabel: 'Web Development',
      graduationDate: '2024-03',
      location: 'Berlin',
      currentRole: 'Founder & CEO',
      company: 'TechFlow Solutions',
      achievements: ['Secured €500K seed funding', 'Built MVP from scratch'],
    },
    {
      id: '2',
      title: 'Lia just landed her first client',
      excerpt: 'Freelance success after the DS track.',
      fullDescription: 'Lia was a marketing professional looking to transition into data science.',
      imageUrl: '/img/stories/lia.jpg',
      href: '/stories/lia-first-client',
      track: 'data-science',
      trackLabel: 'Data Science',
      graduationDate: '2024-01',
      location: 'Munich',
      currentRole: 'Freelance Data Analyst',
      company: 'Self-employed',
      achievements: ['First client within 2 weeks', '€3K monthly revenue'],
    },
  ],
}))

vi.mock('../mocks/partners.json', () => ({
  default: {
    partners: [
      {
        tier: 'platinum',
        name: 'Google.org',
        logoUrl: '/img/partners/google-org.svg',
        description: 'Winner of the Google.org Impact Challenge Germany 2018',
        website: 'https://www.google.org',
        category: 'Technology & Innovation',
      },
    ],
    tiers: [
      {
        id: 'platinum',
        name: 'Platinum Partners',
        description: 'Our highest-level partners who provide significant support and resources',
        color: '#E5E4E2',
      },
    ],
  },
}))
