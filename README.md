# NDC Website

Official website for **Nagarjuna Degree College (NDC)** — a full-stack web application consisting of a Next.js frontend and a Strapi-powered content backend.

🔗 **Live Site:** https://ndc-website-nine.vercel.app

## 📖 Overview

This repository contains the complete source code for the NDC Website project, composed of two independent applications:
 
| Project | Description |
|---|---|
| `ndc-web-main` | Next.js (App Router) frontend that renders all public-facing pages |


The frontend currently reads all content from static JSON files checked into `ndc-web-main/data-export/` rather than fetching from the CMS at request time. Content edited in the Strapi admin panel will not appear on the live site until the JSON export is regenerated and the frontend is rebuilt/redeployed. See [`DEVELOPER.md`](./DEVELOPER.md) for the full breakdown of pages, the CMS → static-JSON migration, and the shared `GlobalBanner` / `ui/` design system.

## ✨ Features

- 40+ page routes covering Home, About, Admissions, Alumni, Departments, Activities, Research, Library, Gallery, Blog, and more
- Shared design system (Button, Card, PageBanner, SectionHeading, Reveal, etc.) for a consistent look across pages
- Unified `GlobalBanner` component used across all major sections
- Live Contact Us and Apply Now forms that submit directly to the CMS
- Fully statically prerendered pages for fast performance, sourced from a versioned JSON export
- Responsive, animated UI built with Framer Motion and a shared navy/orange visual language

## 🛠️ Tech Stack

**Frontend (`ndc-web-main`)**
- Next.js 15 / React 19
- Tailwind CSS & Emotion
- Mantine, Framer Motion, Lucide React, Tabler Icons, FontAwesome
- React Hook Form
- Vercel Analytics & Speed Insights



## 📁 Repository Structure

    NDC-WEBSITE/
 
    ├── ndc-web-main/      # Next.js frontend (public website)
    │   └── data-export/   # Static JSON snapshot of CMS content
    ├── DEVELOPER.md       # In-depth developer notes and migration history
    └── README.md

## 🚀 Getting Started

**Prerequisites:** Node.js v18+


**Frontend (Web)**
```bash
cd ndc-web-main
npm install
npm run dev
```

## 📝 Updating Content

Because the frontend reads from a static export rather than the live CMS, publishing content changes requires editing content in Strapi, regenerating the JSON export in `ndc-web-main/data-export/`, and rebuilding/redeploying the frontend. There is currently no automated refresh pipeline for this.

## 📄 Documentation

For a detailed history of architecture decisions and the UI redesign, see [`DEVELOPER.md`](./DEVELOPER.md).

## 👥 Maintainers

Maintained by Jayanth and contributors.
