import React from 'react'
import { Typography, Box, type SxProps, type CSSProperties } from '@mui/material'

type ValuePropCardProps = {
  /** MUI icon name as string */
  icon: string
  /** Card title */
  title: string
  /** Card body text */
  body: string
}

// Custom SVG Icon Components
const FreeIcon: React.FC<{ sx?: SxProps }> = ({ sx }) => (
  <svg
    width="96"
    height="96"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx as CSSProperties}
  >
    <path
      d="M32.44 63.55L63.55 32.44M34.67 12.44V3.56M61.33 83.56V92.44M12.44 34.67H3.56M83.56 61.33H92.44M16.51 16.51L10.22 10.22M79.49 79.49L85.78 85.78M48 73.14L38.57 82.57C31.61 89.53 20.36 89.53 13.4 82.57C6.44 75.61 6.44 64.36 13.4 57.4L22.84 48M73.15 48L82.58 38.57C89.54 31.61 89.54 20.36 82.58 13.4C75.62 6.44 64.37 6.44 57.41 13.4L48 22.84"
      stroke="#FF2D6C"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const NetworkIcon: React.FC<{ sx?: SxProps }> = ({ sx }) => (
  <svg
    width="96"
    height="96"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx as CSSProperties}
  >
    <line x1="73" y1="48" x2="84" y2="26" stroke="#FF2D6C" strokeWidth="3" />
    <line x1="53" y1="59" x2="23" y2="21" stroke="#FF2D6C" strokeWidth="3" />
    <line x1="8.6" y1="52" x2="83" y2="24" stroke="#FF2D6C" strokeWidth="3" />
    <line x1="39" y1="62" x2="8.8" y2="53.5" stroke="#FF2D6C" strokeWidth="3" />
    <line x1="83.7" y1="24.1" x2="33.9" y2="18.1" stroke="#FF2D6C" strokeWidth="3" />
    <circle cx="63.5" cy="71.5" r="24" fill="white" stroke="white" strokeWidth="2" />
    <circle cx="84.5" cy="23.5" r="11" fill="#FF2D6C" stroke="white" />
    <circle cx="7.7" cy="53" r="7.3" fill="#FF2D6C" stroke="white" strokeWidth="1" />
    <circle cx="20" cy="15" r="14.5" fill="#FF2D6C" stroke="white" strokeWidth="2" />
    <circle cx="63.5" cy="71.5" r="20" stroke="#FF2D6C" strokeWidth="4" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50.1 78.6C52.8 74.8 58 72.5 63.5 72.5C69 72.5 74.2 74.8 77 78.6C77 78.6 77.1 78.7 77.1 78.7C77.3 79 77.6 79.4 77.8 79.7C78 80.1 78.2 80.6 78.2 81.2C78.1 81.7 78 82.1 77.8 82.4C77.6 82.8 77.3 83.1 77 83.4C76.5 83.8 76 83.9 75.5 84C75.1 84 74.6 84 74.1 84H52.9C52.4 84 51.9 84 51.5 84C51 83.9 50.5 83.8 50 83.4C49.7 83.1 49.4 82.8 49.2 82.4C49 82.1 48.9 81.7 48.8 81.2C48.8 80.6 49 80.1 49.2 79.7C49.4 79.4 49.7 79 49.9 78.7C50 78.6 50 78.6 50.1 78.6Z"
      fill="#FF2D6C"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M55 64.5C55 60.4 58.4 57 63.5 57C68.6 57 72 60.4 72 64.5C72 68.6 68.6 72 63.5 72C58.4 72 55 68.6 55 64.5Z"
      fill="#FF2D6C"
    />
  </svg>
)

const JobIcon: React.FC<{ sx?: SxProps }> = ({ sx }) => (
  <svg
    width="96"
    height="96"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={sx as CSSProperties}
  >
    <path
      d="M56.5 45L44.8125 57L39.5 51.5455"
      stroke="#FF2D6C"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M57.2 36.1111C57.2 33.9928 57.2 32.9337 56.9649 32.0647C56.3269 29.7066 54.467 27.8647 52.0859 27.2328C51.2084 27 50.1389 27 48 27C45.8611 27 44.7916 27 43.9141 27.2328C41.533 27.8647 39.6731 29.7066 39.0351 32.0647C38.8 32.9337 38.8 33.9928 38.8 36.1111M32.36 68H63.64C66.2162 68 67.5044 68 68.4884 67.5035C69.3539 67.0667 70.0576 66.3698 70.4986 65.5126C71 64.5381 71 63.2625 71 60.7111V43.4C71 40.8486 71 39.573 70.4986 38.5985C70.0576 37.7413 69.3539 37.0444 68.4884 36.6076C67.5044 36.1111 66.2162 36.1111 63.64 36.1111H32.36C29.7838 36.1111 28.4956 36.1111 27.5116 36.6076C26.6461 37.0444 25.9424 37.7413 25.5014 38.5985C25 39.573 25 40.8486 25 43.4V60.7111C25 63.2625 25 64.5381 25.5014 65.5126C25.9424 66.3698 26.6461 67.0667 27.5116 67.5035C28.4956 68 29.7838 68 32.36 68Z"
      stroke="#FF2D6C"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Icon mapping for the specific icons we use
const iconMap = {
  free: FreeIcon,
  network: NetworkIcon,
  job: JobIcon,
} as const

/**
 * FeatureItem - Clean feature display component without card styling
 * Used in Why Techlabs section to showcase key benefits
 */
export const FeatureItem: React.FC<ValuePropCardProps> = ({ icon, title, body }) => {
  // Get the specific icon component from our map
  const IconComponent = iconMap[icon as keyof typeof iconMap]

  return (
    <Box sx={{ textAlign: 'center', maxWidth: '300px', mx: 'auto' }}>
      {/* Icon */}
      <Box
        sx={{
          mb: 2, // 16px spacing from icon to title
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {IconComponent && (
          <IconComponent
            sx={{
              width: 48, // Display size 48px (SVGs are 96x96 but scaled down)
              height: 48,
            }}
          />
        )}
      </Box>

      {/* Title */}
      <Typography
        variant="h5"
        component="h3"
        sx={{
          mb: 1.5, // 8-12px from title to body
          fontSize: '24px',
          fontWeight: 700,
          color: '#FF2D6C', // Brand pink
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      {/* Body */}
      <Typography
        variant="body1"
        sx={{
          fontSize: '15px', // 14-16px range
          color: '#6B7280', // Muted grey
          lineHeight: 1.5, // 150% line height
          maxWidth: '260px', // Restrict width for proper wrapping
          mx: 'auto',
        }}
      >
        {body}
      </Typography>
    </Box>
  )
}
