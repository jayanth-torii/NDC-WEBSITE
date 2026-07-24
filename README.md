# NDC Website

This repository contains the full source code for the NDC Website project, consisting of:
- `ndc-web-main`: Next.js frontend application.
- `ndc-cms-main`: Strapi backend application.

## Prerequisites
- Node.js (v18+)

## Setup Instructions

1. **Backend (CMS):**
   Navigate to `ndc-cms-main`, copy `.env.example` to `.env`, run `npm install`, and start with `npm run dev`.

2. **Frontend (Web):**
   Navigate to `ndc-web-main`, run `npm install`, and start with `npm run dev`.

## Content

Page content on the live frontend is read from static JSON checked into `ndc-web-main/data-export/`, not fetched from the CMS at request time. Editing content in the Strapi admin panel will not change the live site until the export is regenerated and the frontend is rebuilt/redeployed. See [`DEVELOPER.md`](./DEVELOPER.md) for the full breakdown of pages, the CMS → static-JSON migration, and the shared `GlobalBanner`/`ui/` design system.
