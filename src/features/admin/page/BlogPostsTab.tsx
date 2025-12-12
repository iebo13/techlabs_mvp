/**
 * BlogPostsTab component
 * Admin tab for managing blog posts with CRUD operations
 */

import React, { useState } from 'react'
import { AdminDataTable, ConfirmDialog } from '../components'
import { BlogPostForm } from '../components/BlogPostForm'
import { useAdmin } from '../contexts'
import { useAdminTable } from '../hooks'
import { type BlogPost, type CreateBlogPostInput, type TableColumn } from '../types'
import { formatDate, getBlogPostStatusLabel, truncateText } from '../utils'

const BLOG_POST_COLUMNS: Array<TableColumn<BlogPost>> = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'author', label: 'Author', minWidth: 120 },
  { id: 'status', label: 'Status', minWidth: 100, format: v => getBlogPostStatusLabel(v as BlogPost['status']) },
  { id: 'updatedAt', label: 'Updated', minWidth: 120, format: v => formatDate(v as string) },
  { id: 'excerpt', label: 'Excerpt', minWidth: 200, format: v => truncateText(v as string, 60) },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' },
]

export const BlogPostsTab: React.FC = () => {
  const { state, createBlogPost, updateBlogPost, deleteBlogPost } = useAdmin()
  const table = useAdminTable<BlogPost>()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)

  // Get processed data
  const filteredData = table.getFilteredData(state.blogPosts, ['title', 'author', 'excerpt'])
  const sortedData = table.getSortedData(filteredData)
  const paginatedData = table.getPaginatedData(sortedData)

  const handleAdd = (): void => {
    setSelectedPost(null)
    setFormOpen(true)
  }

  const handleEdit = (post: BlogPost): void => {
    setSelectedPost(post)
    setFormOpen(true)
  }

  const handleDelete = (post: BlogPost): void => {
    setPostToDelete(post)
    setDeleteDialogOpen(true)
  }

  const handleFormSubmit = async (data: CreateBlogPostInput): Promise<void> => {
    await (selectedPost ? updateBlogPost({ id: selectedPost.id, ...data }) : createBlogPost(data))
  }

  const handleConfirmDelete = async (): Promise<void> => {
    if (postToDelete) {
      await deleteBlogPost(postToDelete.id)
      setPostToDelete(null)
    }

    setDeleteDialogOpen(false)
  }

  return (
    <>
      <AdminDataTable<BlogPost>
        title="Blog Posts"
        data={paginatedData}
        totalCount={sortedData.length}
        columns={BLOG_POST_COLUMNS}
        loading={state.loading}
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

      <BlogPostForm
        open={formOpen}
        post={selectedPost}
        onSubmit={handleFormSubmit}
        onClose={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${postToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </>
  )
}
