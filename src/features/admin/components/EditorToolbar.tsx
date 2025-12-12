/**
 * EditorToolbar component
 * Toolbar for the TipTap rich text editor
 */

import React from 'react'
import type { Editor } from '@tiptap/react'
import CodeIcon from '@mui/icons-material/Code'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import ImageIcon from '@mui/icons-material/Image'
import LinkIcon from '@mui/icons-material/Link'
import RedoIcon from '@mui/icons-material/Redo'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import UndoIcon from '@mui/icons-material/Undo'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'

type EditorToolbarProps = {
  readonly editor: Editor
  readonly onAddImage: () => void
  readonly onAddLink: () => void
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor, onAddImage, onAddLink }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 0.5,
        p: 1,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
      }}>
      {/* Text formatting */}
      <Tooltip title="Bold (Ctrl+B)">
        <IconButton
          size="small"
          aria-label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}>
          <FormatBoldIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Italic (Ctrl+I)">
        <IconButton
          size="small"
          aria-label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}>
          <FormatItalicIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Underline (Ctrl+U)">
        <IconButton
          size="small"
          aria-label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          color={editor.isActive('underline') ? 'primary' : 'default'}>
          <FormatUnderlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Strikethrough">
        <IconButton
          size="small"
          aria-label="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          color={editor.isActive('strike') ? 'primary' : 'default'}>
          <StrikethroughSIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Headings */}
      <Tooltip title="Heading 1">
        <IconButton
          size="small"
          aria-label="Heading 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
          sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
          H1
        </IconButton>
      </Tooltip>
      <Tooltip title="Heading 2">
        <IconButton
          size="small"
          aria-label="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
          sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
          H2
        </IconButton>
      </Tooltip>
      <Tooltip title="Heading 3">
        <IconButton
          size="small"
          aria-label="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          color={editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'}
          sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
          H3
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Lists */}
      <Tooltip title="Bullet List">
        <IconButton
          size="small"
          aria-label="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}>
          <FormatListBulletedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Numbered List">
        <IconButton
          size="small"
          aria-label="Numbered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}>
          <FormatListNumberedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Block elements */}
      <Tooltip title="Blockquote">
        <IconButton
          size="small"
          aria-label="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          color={editor.isActive('blockquote') ? 'primary' : 'default'}>
          <FormatQuoteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Code Block">
        <IconButton
          size="small"
          aria-label="Code block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          color={editor.isActive('codeBlock') ? 'primary' : 'default'}>
          <CodeIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Alignment */}
      <Tooltip title="Align Left">
        <IconButton
          size="small"
          aria-label="Align left"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          color={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}>
          <FormatAlignLeftIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Center">
        <IconButton
          size="small"
          aria-label="Align center"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          color={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}>
          <FormatAlignCenterIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Align Right">
        <IconButton
          size="small"
          aria-label="Align right"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          color={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}>
          <FormatAlignRightIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Media */}
      <Tooltip title="Add Link">
        <IconButton
          size="small"
          aria-label="Add link"
          onClick={onAddLink}
          color={editor.isActive('link') ? 'primary' : 'default'}>
          <LinkIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Image">
        <IconButton size="small" aria-label="Add image" onClick={onAddImage}>
          <ImageIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Undo/Redo */}
      <Tooltip title="Undo (Ctrl+Z)">
        <IconButton
          size="small"
          aria-label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}>
          <UndoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo (Ctrl+Y)">
        <IconButton
          size="small"
          aria-label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}>
          <RedoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
