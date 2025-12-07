/**
 * PartnersTab component
 * Admin tab for managing partners with CRUD operations
 */

import React, { useState } from 'react'
import { AdminDataTable, ConfirmDialog, PartnerForm } from '../components'
import { useAdmin } from '../contexts'
import { useAdminTable } from '../hooks'
import { type AdminPartner, type CreatePartnerInput, type TableColumn } from '../types'

const PARTNER_COLUMNS: Array<TableColumn<AdminPartner>> = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'tier', label: 'Tier', minWidth: 100, format: v => v.charAt(0).toUpperCase() + v.slice(1) },
  { id: 'category', label: 'Category', minWidth: 130 },
  { id: 'website', label: 'Website', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' },
]

export const PartnersTab: React.FC = () => {
  const { state, createPartner, updatePartner, deletePartner } = useAdmin()
  const table = useAdminTable<AdminPartner>()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<AdminPartner | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [partnerToDelete, setPartnerToDelete] = useState<AdminPartner | null>(null)

  // Get processed data
  const filteredData = table.getFilteredData(state.partners, ['name', 'category', 'description'])
  const sortedData = table.getSortedData(filteredData)
  const paginatedData = table.getPaginatedData(sortedData)

  const handleAdd = (): void => {
    setSelectedPartner(null)
    setFormOpen(true)
  }

  const handleEdit = (partner: AdminPartner): void => {
    setSelectedPartner(partner)
    setFormOpen(true)
  }

  const handleDelete = (partner: AdminPartner): void => {
    setPartnerToDelete(partner)
    setDeleteDialogOpen(true)
  }

  const handleFormSubmit = (data: CreatePartnerInput): void => {
    if (selectedPartner) {
      updatePartner({ id: selectedPartner.id, ...data })
    } else {
      createPartner(data)
    }
  }

  const handleConfirmDelete = (): void => {
    if (partnerToDelete) {
      deletePartner(partnerToDelete.id)
      setPartnerToDelete(null)
    }

    setDeleteDialogOpen(false)
  }

  return (
    <>
      <AdminDataTable<AdminPartner>
        title="Partners"
        data={paginatedData}
        columns={PARTNER_COLUMNS}
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

      <PartnerForm
        open={formOpen}
        partner={selectedPartner}
        onSubmit={handleFormSubmit}
        onClose={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Partner"
        message={`Are you sure you want to delete "${partnerToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </>
  )
}
