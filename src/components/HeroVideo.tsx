import React, { useState } from 'react'

import { PlayArrow as PlayArrowIcon } from '@mui/icons-material'
import {
    Card,
    CardMedia,
    Box,
    IconButton,
    Chip,
    useTheme,
    useMediaQuery,
} from '@mui/material'

import VideoEmbed from './VideoEmbed'

type HeroVideoProps = {
    posterUrl: string
    srcUrl: string
    duration: number // duration in seconds
    title?: string
}

const HeroVideo: React.FC<HeroVideoProps> = ({
    posterUrl,
    srcUrl,
    duration,
    title = 'TechLabs Introduction Video',
}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handlePlayClick = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    // Format duration to MM:SS
    const formatDuration = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const durationText = formatDuration(duration)

    return (
        <>
            <Card
                sx={{
                    position: 'relative',
                    maxWidth: { xs: '100%', sm: 600, md: 800 },
                    mx: 'auto',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: theme.shadows[8],
                    },
                    '&:focus-within': {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: 2,
                    },
                }}
                onClick={handlePlayClick}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        handlePlayClick()
                    }
                }}
                aria-label={`Play ${title}, duration ${durationText}`}
            >
                <CardMedia
                    component="img"
                    image={posterUrl}
                    alt={`${title} thumbnail`}
                    sx={{
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                        width: '100%',
                        height: 'auto',
                    }}
                />

                {/* Play Button Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                        },
                    }}
                >
                    <IconButton
                        size="large"
                        aria-label={`Play introduction video, duration ${durationText}`}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            width: { xs: 64, sm: 80 },
                            height: { xs: 64, sm: 80 },
                            '&:hover': {
                                bgcolor: 'primary.dark',
                                transform: 'scale(1.1)',
                            },
                            '&:focus': {
                                outline: `3px solid ${theme.palette.common.white}`,
                                outlineOffset: 2,
                            },
                        }}
                        onClick={(event) => {
                            event.stopPropagation()
                            handlePlayClick()
                        }}
                    >
                        <PlayArrowIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
                    </IconButton>
                </Box>

                {/* Duration Badge */}
                <Chip
                    label={durationText}
                    size={isMobile ? 'small' : 'medium'}
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        color: 'common.white',
                        fontWeight: 600,
                        '& .MuiChip-label': {
                            px: 1.5,
                        },
                    }}
                    aria-label={`Video duration ${durationText}`}
                />
            </Card>

            {/* Video Modal */}
            <VideoEmbed
                open={modalOpen}
                onClose={handleCloseModal}
                title={title}
                srcUrl={srcUrl}
                posterUrl={posterUrl}
            />
        </>
    )
}

export default HeroVideo
