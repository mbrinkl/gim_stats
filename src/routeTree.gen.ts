/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as EditImport } from './routes/edit'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const EditRoute = EditImport.update({
  path: '/edit',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/edit': {
      id: '/edit'
      path: '/edit'
      fullPath: '/edit'
      preLoaderRoute: typeof EditImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({ IndexRoute, EditRoute })

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/edit"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/edit": {
      "filePath": "edit.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
