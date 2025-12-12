import React, { useState } from 'react'
import { Alert, CircularProgress, Box } from '@mui/material'
import { AdminDataTable, ConfirmDialog, EventForm } from '../components'
import { useEvents } from '../hooks'
import { useAdminTable } from '../hooks'
import { type AdminEvent, type CreateEventInput, type TableColumn } from '../types'
import { formatDate, getEventTypeLabel } from '../utils'

const EVENT_COLUMNS: Array<TableColumn<AdminEvent>> = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'type', label: 'Type', minWidth: 100, format: v => getEventTypeLabel(v as AdminEvent['type']) },
  { id: 'date', label: 'Date', minWidth: 120, format: v => formatDate(v as string) },
  { id: 'location', label: 'Location', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' },
]

export const EventsTab: React.FC = () => {
  const { events, createEvent, updateEvent, deleteEvent, isLoading, isError, error } = useEvents()
  const table = useAdminTable<AdminEvent>()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<AdminEvent | null>(null)

  // Get processed data
  const filteredData = table.getFilteredData(events, ['title', 'location', 'blurb'])
  const sortedData = table.getSortedData(filteredData)
  const paginatedData = table.getPaginatedData(sortedData)

  const handleAdd = (): void => {
    setSelectedEvent(null)
    setFormOpen(true)
  }

  const handleEdit = (event: AdminEvent): void => {
    setSelectedEvent(event)
    setFormOpen(true)
  }

  const handleDelete = (event: AdminEvent): void => {
    setEventToDelete(event)
    setDeleteDialogOpen(true)
  }

  const handleFormSubmit = async (data: CreateEventInput): Promise<void> => {
    try {
      if (selectedEvent) {
        await updateEvent({ id: selectedEvent.id, ...data })
      } else {
        await createEvent(data)
      }
      setFormOpen(false)
    } catch (err) {
      console.error('Failed to save event:', err)
      // Ideally show a snackbar here
    }
  }

  const handleConfirmDelete = async (): Promise<void> => {
    if (eventToDelete) {
      try {
        await deleteEvent(eventToDelete.id)
        setEventToDelete(null)
      } catch (err) {
        console.error('Failed to delete event:', err)
      }
    }

    setDeleteDialogOpen(false)
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Error loading events: {(error as Error).message}
      </Alert>
    )
  }

  return (
    <>
      <AdminDataTable<AdminEvent>
        title="Events"
        data={paginatedData}
        columns={EVENT_COLUMNS}
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

      <EventForm open={formOpen} event={selectedEvent} onSubmit={handleFormSubmit} onClose={() => setFormOpen(false)} />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Event"
        message={`Are you sure you want to delete "${eventToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </>
  )
}
