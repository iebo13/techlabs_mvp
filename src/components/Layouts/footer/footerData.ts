import { LinkedIn, X as Twitter, Instagram, Facebook, Email, YouTube } from '@mui/icons-material'

export type FooterSection = {
  title: string
  links: Array<{
    label: string
    path: string
    external?: boolean
  }>
}

export type SocialLink = {
  name: string
  icon: typeof LinkedIn
  url: string
  ariaLabel: string
}

export const footerSections: FooterSection[] = [
  {
    title: 'Programs',
    links: [
      { label: 'Digital Shaper Program', path: '/tracks' },
      { label: '#codeathome Bootcamp', path: '/events' },
      { label: 'Digital Shaper Summit', path: '/events' },
    ],
  },
  {
    title: 'Tracks',
    links: [
      { label: 'Data Science', path: '/tracks' },
      { label: 'Artificial Intelligence', path: '/tracks' },
      { label: 'UX Design', path: '/tracks' },
      { label: 'Web Development', path: '/tracks' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Become a volunteer', path: '/about' },
      { label: 'Support Tech Education', path: '/about' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Imprint', path: '/imprint' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Our partners', path: '/partners' },
    ],
  },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/techlabs',
    ariaLabel: 'TechLabs on Instagram',
  },
  {
    name: 'YouTube',
    icon: YouTube,
    url: 'https://youtube.com/c/techlabs',
    ariaLabel: 'TechLabs on YouTube',
  },
  {
    name: 'X',
    icon: Twitter,
    url: 'https://x.com/techlabs',
    ariaLabel: 'TechLabs on X',
  },
  {
    name: 'LinkedIn',
    icon: LinkedIn,
    url: 'https://linkedin.com/company/techlabs',
    ariaLabel: 'TechLabs on LinkedIn',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/techlabs',
    ariaLabel: 'TechLabs on Facebook',
  },
  {
    name: 'Email',
    icon: Email,
    url: 'mailto:contact@techlabs.org',
    ariaLabel: 'Contact TechLabs by Email',
  },
]
