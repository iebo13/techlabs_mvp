import React from 'react'

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 32 32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
})

export const dataIcons: Record<string, (s: number) => React.ReactNode> = {
  Python: s => (
    <svg {...svgProps(s)}>
      <path
        d="M15.9 2C9.4 2 10 4.9 10 4.9v3h6.1v1H6.5S2 8.4 2 15.8s3.9 7.1 3.9 7.1h2.3v-3.4s-.1-3.9 3.9-3.9h6.7s3.7.1 3.7-3.6V5.8S23.1 2 15.9 2zm-3.7 2.2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        fill="#3776AB"
      />
      <path
        d="M16.1 30c6.5 0 5.9-2.9 5.9-2.9v-3h-6.1v-1h9.6s4.5.5 4.5-6.9-3.9-7.1-3.9-7.1h-2.3v3.4s.1 3.9-3.9 3.9H13.2s-3.7-.1-3.7 3.6v6.2S8.9 30 16.1 30zm3.7-2.2a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z"
        fill="#FFD43B"
      />
    </svg>
  ),
  Pandas: s => (
    <svg {...svgProps(s)}>
      <rect x="7" y="4" width="4" height="8" rx="1" fill="#150458" />
      <rect x="7" y="15" width="4" height="13" rx="1" fill="#150458" />
      <rect x="14" y="8" width="4" height="16" rx="1" fill="#150458" />
      <rect x="21" y="4" width="4" height="13" rx="1" fill="#150458" />
      <rect x="21" y="20" width="4" height="8" rx="1" fill="#150458" />
    </svg>
  ),
  NumPy: s => (
    <svg {...svgProps(s)}>
      <path d="M16 2L4 9v14l12 7 12-7V9L16 2z" fill="#4DABCF" />
      <path d="M16 2L4 9l12 7 12-7L16 2z" fill="#4D77CF" />
      <path d="M16 16v14l12-7V9L16 16z" fill="#4DABCF" opacity="0.7" />
    </svg>
  ),
  'Scikit-learn': s => (
    <svg {...svgProps(s)}>
      <circle cx="10" cy="10" r="3" fill="#F89939" />
      <circle cx="22" cy="10" r="3" fill="#3499CD" />
      <circle cx="10" cy="22" r="3" fill="#3499CD" />
      <circle cx="22" cy="22" r="3" fill="#F89939" />
      <circle cx="16" cy="16" r="4" fill="#F89939" stroke="#3499CD" strokeWidth="1.5" />
    </svg>
  ),
  SQL: s => (
    <svg {...svgProps(s)}>
      <ellipse cx="16" cy="8" rx="10" ry="4" fill="#00618A" />
      <path d="M6 8v16c0 2.2 4.5 4 10 4s10-1.8 10-4V8" fill="none" stroke="#00618A" strokeWidth="2" />
      <ellipse cx="16" cy="24" rx="10" ry="4" fill="none" stroke="#00618A" strokeWidth="2" />
      <path d="M6 16c0 2.2 4.5 4 10 4s10-1.8 10-4" fill="none" stroke="#00618A" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),
  Matplotlib: s => (
    <svg {...svgProps(s)}>
      <rect x="4" y="4" width="24" height="24" rx="2" fill="#11557C" opacity="0.1" stroke="#11557C" strokeWidth="1.5" />
      <polyline
        points="6,24 12,16 16,20 22,8 26,12"
        fill="none"
        stroke="#11557C"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polyline
        points="6,24 10,22 14,18 20,20 26,16"
        fill="none"
        stroke="#E24A33"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Jupyter: s => (
    <svg {...svgProps(s)}>
      <circle cx="16" cy="16" r="12" fill="none" stroke="#F37626" strokeWidth="2" />
      <circle cx="16" cy="6" r="2" fill="#F37626" />
      <circle cx="8" cy="24" r="1.5" fill="#989898" />
      <circle cx="24" cy="22" r="1.5" fill="#989898" />
    </svg>
  ),
  Figma: s => (
    <svg {...svgProps(s)}>
      <circle cx="20" cy="16" r="4" fill="#1ABCFE" />
      <path d="M12 28a4 4 0 004-4v-4h-4a4 4 0 000 8z" fill="#0ACF83" />
      <path d="M12 4a4 4 0 000 8h4V4h-4z" fill="#F24E1E" />
      <path d="M16 4v8h4a4 4 0 000-8h-4z" fill="#FF7262" />
      <path d="M12 12a4 4 0 000 8h4v-8h-4z" fill="#A259FF" />
    </svg>
  ),
  FigJam: s => (
    <svg {...svgProps(s)}>
      <rect x="4" y="4" width="24" height="24" rx="6" fill="#F2C94C" />
      <circle cx="12" cy="14" r="2" fill="#fff" />
      <circle cx="20" cy="14" r="2" fill="#fff" />
      <path d="M11 20c0 0 2.5 3 5 3s5-3 5-3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  PyTorch: s => (
    <svg {...svgProps(s)}>
      <path d="M16 2v6l5.5 5.5a8 8 0 11-11 0L16 8V2z" fill="#EE4C2C" />
      <circle cx="19.5" cy="9.5" r="1.5" fill="#EE4C2C" />
    </svg>
  ),
  TensorFlow: s => (
    <svg {...svgProps(s)}>
      <path d="M16 2L4 9l12 7v14l6-3.5V16.5l6-3.5L16 2z" fill="#FF6F00" />
      <path d="M16 16v14l-6-3.5v-7L16 16z" fill="#FF9100" />
    </svg>
  ),
  'Hugging Face': s => (
    <svg {...svgProps(s)}>
      <circle cx="16" cy="16" r="13" fill="#FFD21E" />
      <circle cx="11" cy="13" r="2.5" fill="#fff" />
      <circle cx="21" cy="13" r="2.5" fill="#fff" />
      <circle cx="11.5" cy="13.5" r="1.2" fill="#6B3FA0" />
      <circle cx="21.5" cy="13.5" r="1.2" fill="#6B3FA0" />
      <path d="M10 20c0 0 3 4 6 4s6-4 6-4" stroke="#6B3FA0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  LangChain: s => (
    <svg {...svgProps(s)}>
      <circle cx="16" cy="8" r="4" fill="none" stroke="#1C3C3C" strokeWidth="2" />
      <circle cx="16" cy="24" r="4" fill="none" stroke="#1C3C3C" strokeWidth="2" />
      <path d="M16 12v8" stroke="#1C3C3C" strokeWidth="2" />
      <circle cx="8" cy="16" r="3" fill="none" stroke="#1C3C3C" strokeWidth="1.5" />
      <circle cx="24" cy="16" r="3" fill="none" stroke="#1C3C3C" strokeWidth="1.5" />
      <path d="M11 16h10" stroke="#1C3C3C" strokeWidth="1.5" />
    </svg>
  ),
}
