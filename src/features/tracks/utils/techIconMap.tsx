import React from 'react'

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 32 32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
})

export const webIcons: Record<string, (s: number) => React.ReactNode> = {
  HTML5: s => (
    <svg {...svgProps(s)}>
      <path d="M4 2l2.2 24.8L16 30l9.8-3.2L28 2H4z" fill="#E44D26" />
      <path d="M16 27.6l7.9-2.2 1.9-21H16v23.2z" fill="#F16529" />
      <path
        d="M16 13.5h-4.5l-.3-3.5H16V6.5H7.5l1 12H16v-5zm0 8.8l-4.6-1.3-.3-3.5H7.5l.6 7 7.9 2.2V22.3z"
        fill="#EBEBEB"
      />
      <path
        d="M16 13.5v5h4.2l-.4 4.3L16 24v3.7l7.9-2.2.1-.6.9-10.4.1-1H16zm0-7v3.5h8.1l.1-.7.2-2.1.1-.7H16z"
        fill="#fff"
      />
    </svg>
  ),
  CSS3: s => (
    <svg {...svgProps(s)}>
      <path d="M4 2l2.2 24.8L16 30l9.8-3.2L28 2H4z" fill="#1572B6" />
      <path d="M16 27.6l7.9-2.2 1.9-21H16v23.2z" fill="#33A9DC" />
      <path
        d="M16 13.5H7.8l.3 3.5H16v-3.5zm0-7H7.2l.3 3.5H16V6.5zm0 17.1l-4.6-1.3-.3-3.3H7.5l.6 6.4 7.9 2.3v-4.1z"
        fill="#EBEBEB"
      />
      <path d="M16 13.5v3.5h4.2l-.4 4L16 22.3v4.1l7.9-2.3.1-.6.6-7H16zm0-7v3.5h8.4l.1-.6.2-2.2.1-.7H16z" fill="#fff" />
    </svg>
  ),
  JavaScript: s => (
    <svg {...svgProps(s)}>
      <rect width="32" height="32" rx="2" fill="#F7DF1E" />
      <path
        d="M8.4 26.2l2.4-1.5c.5.8 1 1.5 2 1.5 1 0 1.7-.4 1.7-2v-10.7h3v10.8c0 3.3-1.9 4.7-4.7 4.7-2.5 0-4-1.3-4.4-2.8zm10.4-.3l2.4-1.4c.6 1 1.4 1.8 2.8 1.8 1.2 0 2-.6 2-1.4 0-1-.8-1.3-2.2-1.9l-.7-.3c-2.2-.9-3.6-2.1-3.6-4.6 0-2.3 1.7-4 4.5-4 1.9 0 3.3.7 4.3 2.5l-2.4 1.5c-.5-.9-1.1-1.3-2-1.3-.9 0-1.5.6-1.5 1.3 0 .9.6 1.3 1.9 1.9l.7.3c2.6 1.1 4 2.3 4 4.8 0 2.7-2.1 4.2-5 4.2-2.8 0-4.6-1.3-5.2-3.1z"
        fill="#000"
      />
    </svg>
  ),
  React: s => (
    <svg {...svgProps(s)}>
      <circle cx="16" cy="16" r="3" fill="#61DAFB" />
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(0 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 16 16)" />
    </svg>
  ),
  'Node.js': s => (
    <svg {...svgProps(s)}>
      <path
        d="M16 2.5a2 2 0 011 .27l10.4 6a2 2 0 011 1.73v12a2 2 0 01-1 1.73l-10.4 6a2 2 0 01-2 0l-10.4-6a2 2 0 01-1-1.73v-12a2 2 0 011-1.73l10.4-6a2 2 0 011-.27z"
        fill="#339933"
      />
      <path d="M16 9v14m-6-11l6-3 6 3v8l-6 3-6-3v-8z" stroke="#fff" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  Git: s => (
    <svg {...svgProps(s)}>
      <path
        d="M30.3 14.8L17.2 1.7a2 2 0 00-2.8 0l-2.7 2.7 3.4 3.4a2.4 2.4 0 013 3l3.3 3.3a2.4 2.4 0 11-1.4 1.3l-3-3.1v8.2a2.4 2.4 0 11-2-0V12.8a2.4 2.4 0 01-1.3-3.2L10.3 6.2 1.7 14.8a2 2 0 000 2.8l13.1 13.1a2 2 0 002.8 0l12.7-13.1a2 2 0 000-2.8"
        fill="#F05032"
      />
    </svg>
  ),
  Vite: s => (
    <svg {...svgProps(s)}>
      <path
        d="M28.5 4.2L16.6 28.8a.5.5 0 01-.9 0L3 10.7a.5.5 0 01.4-.7l12.2-2a.5.5 0 01.5.2L28.3 3.5a.5.5 0 01.2.7z"
        fill="#646CFF"
      />
      <path d="M21.7 2l-8.2 16.2a.3.3 0 00.3.4l8-1.2a.3.3 0 00.2-.4L22.2 2a.3.3 0 00-.5 0z" fill="#FFDD35" />
    </svg>
  ),
  Vercel: s => (
    <svg {...svgProps(s)}>
      <path d="M16 4L30 28H2L16 4z" fill="#000" />
    </svg>
  ),
}
