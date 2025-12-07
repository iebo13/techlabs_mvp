/**
 * StoriesTab component
 * Admin tab for managing stories with CRUD operations
 */

import React, { useState } from 'react'
import { AdminDataTable, ConfirmDialog, StoryForm } from '../components'
import { useAdmin } from '../contexts'
import { useAdminTable } from '../hooks'
import { type AdminStory, type CreateStoryInput, type TableColumn } from '../types'
import { getTrackLabel } from '../utils'

const STORY_COLUMNS: Array<TableColumn<AdminStory>> = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'track', label: 'Track', minWidth: 130, format: v => getTrackLabel(v as AdminStory['track']) },
  { id: 'company', label: 'Company', minWidth: 130 },
  { id: 'currentRole', label: 'Role', minWidth: 150 },
  { id: 'location', label: 'Location', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' },
]

export const StoriesTab: React.FC = () => {
  const { state, createStory, updateStory, deleteStory } = useAdmin()
  const table = useAdminTable<AdminStory>()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState<AdminStory | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [storyToDelete, setStoryToDelete] = useState<AdminStory | null>(null)

  // Get processed data
  const filteredData = table.getFilteredData(state.stories, ['title', 'company', 'currentRole'])
  const sortedData = table.getSortedData(filteredData)
  const paginatedData = table.getPaginatedData(sortedData)

  const handleAdd = (): void => {
    setSelectedStory(null)
    setFormOpen(true)
  }

  const handleEdit = (story: AdminStory): void => {
    setSelectedStory(story)
    setFormOpen(true)
  }

  const handleDelete = (story: AdminStory): void => {
    setStoryToDelete(story)
    setDeleteDialogOpen(true)
  }

  const handleFormSubmit = (data: CreateStoryInput): void => {
    if (selectedStory) {
      updateStory({ id: selectedStory.id, ...data })
    } else {
      createStory(data)
    }
  }

  const handleConfirmDelete = (): void => {
    if (storyToDelete) {
      deleteStory(storyToDelete.id)
      setStoryToDelete(null)
    }

    setDeleteDialogOpen(false)
  }

  return (
    <>
      <AdminDataTable<AdminStory>
        title="Stories"
        data={paginatedData}
        columns={STORY_COLUMNS}
        searchQuery={table.searchQuery}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        sortColumn={table.sortColumn}
        sortDirection={table.sortDirection}
        onSearchChange={table.setSearchQuery}
        onPageChange={table.setPage}
        onRowsPerPageChange={table.setRowsPerPage}
        onSort={table.handleSort}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StoryForm open={formOpen} story={selectedStory} onSubmit={handleFormSubmit} onClose={() => setFormOpen(false)} />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Story"
        message={`Are you sure you want to delete "${storyToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </>
  )
}
