/**
 * useAdminTable hook
 * Provides table functionality for admin CRUD operations
 */

import { useState } from 'react'
import type { AdminEntity } from '../types'

type SortDirection = 'asc' | 'desc'

type UseAdminTableReturn<T extends AdminEntity> = {
  page: number
  rowsPerPage: number
  sortColumn: keyof T | null
  sortDirection: SortDirection
  searchQuery: string
  setPage: (page: number) => void
  setRowsPerPage: (rows: number) => void
  setSearchQuery: (query: string) => void
  handleSort: (column: keyof T) => void
  getSortedData: (data: T[]) => T[]
  getFilteredData: (data: T[], searchFields: Array<keyof T>) => T[]
  getPaginatedData: (data: T[]) => T[]
}

export const useAdminTable = <T extends AdminEntity>(): UseAdminTableReturn<T> => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSort = (column: keyof T): void => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const getSortedData = (data: T[]): T[] => {
    if (!sortColumn) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue === bValue) return 0

      const comparison = aValue < bValue ? -1 : 1

      return sortDirection === 'asc' ? comparison : -comparison
    })
  }

  const getFilteredData = (data: T[], searchFields: Array<keyof T>): T[] => {
    if (!searchQuery.trim()) return data

    const query = searchQuery.toLowerCase()

    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field]

        if (typeof value === 'string') {
          return value.toLowerCase().includes(query)
        }

        return false
      })
    )
  }

  const getPaginatedData = (data: T[]): T[] => {
    const startIndex = page * rowsPerPage

    return data.slice(startIndex, startIndex + rowsPerPage)
  }

  return {
    page,
    rowsPerPage,
    sortColumn,
    sortDirection,
    searchQuery,
    setPage,
    setRowsPerPage,
    setSearchQuery,
    handleSort,
    getSortedData,
    getFilteredData,
    getPaginatedData,
  }
}
