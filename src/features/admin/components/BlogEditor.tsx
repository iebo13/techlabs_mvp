/**
 * BlogEditor component
 * Medium-like rich text editor using TipTap
 */

import React, { useState } from 'react'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Paper } from '@mui/material'
import { EditorToolbar } from './EditorToolbar'
import { InputDialog } from './InputDialog'

type BlogEditorProps = {
  readonly content: string
  readonly onChange: (content: string) => void
  readonly placeholder?: string
}

type DialogState = {
  type: 'image' | 'link' | null
  defaultValue: string
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing your story...',
}) => {
  const [dialogState, setDialogState] = useState<DialogState>({ type: null, defaultValue: '' })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Image.configure({ HTMLAttributes: { class: 'blog-image' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'blog-link' } }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  })

  if (!editor) return null

  const handleAddImage = (): void => {
    setDialogState({ type: 'image', defaultValue: '' })
  }

  const handleAddLink = (): void => {
    const previousUrl = editor.getAttributes('link').href ?? ''

    setDialogState({ type: 'link', defaultValue: previousUrl })
  }

  const handleDialogConfirm = (value: string): void => {
    if (dialogState.type === 'image' && value) {
      editor.chain().focus().setImage({ src: value }).run()
    } else if (dialogState.type === 'link') {
      if (value === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
      } else {
        editor.chain().focus().extendMarkRange('link').setLink({ href: value }).run()
      }
    }

    setDialogState({ type: null, defaultValue: '' })
  }

  const handleDialogCancel = (): void => {
    setDialogState({ type: null, defaultValue: '' })
  }

  return (
    <>
      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        <EditorToolbar editor={editor} onAddImage={handleAddImage} onAddLink={handleAddLink} />
        <Box sx={editorStyles}>
          <EditorContent editor={editor} />
        </Box>
      </Paper>

      <InputDialog
        open={dialogState.type === 'image'}
        title="Add Image"
        label="Image URL"
        defaultValue={dialogState.defaultValue}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />

      <InputDialog
        open={dialogState.type === 'link'}
        title="Add Link"
        label="URL"
        defaultValue={dialogState.defaultValue}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />
    </>
  )
}

const editorStyles = {
  '& .ProseMirror': {
    minHeight: 400,
    maxHeight: 600,
    overflow: 'auto',
    p: 3,
    outline: 'none',
    '& > * + *': { marginTop: '0.75em' },
    '& h1': { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
    '& h2': { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
    '& h3': { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
    '& p': { fontSize: '1.125rem', lineHeight: 1.7 },
    '& blockquote': {
      borderLeft: '4px solid',
      borderColor: 'primary.main',
      pl: 2,
      py: 0.5,
      fontStyle: 'italic',
      color: 'text.secondary',
    },
    '& pre': {
      bgcolor: 'grey.900',
      color: 'grey.100',
      p: 2,
      borderRadius: 1,
      overflow: 'auto',
      '& code': { fontFamily: 'monospace' },
    },
    '& code': { bgcolor: 'grey.200', px: 0.5, borderRadius: 0.5, fontFamily: 'monospace' },
    '& ul, & ol': { pl: 3 },
    '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1 },
    '& a': { color: 'primary.main', textDecoration: 'underline' },
    '& .ProseMirror-placeholder': {
      color: 'text.disabled',
      '&::before': { content: 'attr(data-placeholder)', float: 'left', height: 0, pointerEvents: 'none' },
    },
  },
}
