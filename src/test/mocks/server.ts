/**
 * MSW Server Setup for Node.js Testing Environment
 * This file configures the Mock Service Worker for intercepting HTTP requests in tests
 */

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Create MSW server with default handlers
export const server = setupServer(...handlers)

// Export server for additional configuration in specific tests
export { server as mswServer }

// Re-export MSW utilities for convenience
export { http, HttpResponse } from 'msw'
