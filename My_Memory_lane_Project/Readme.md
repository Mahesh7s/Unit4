# Project Title :-> "Memory-Lane-personal"

## Introduction
MemoryLane_Personal is a full-stack multimedia timeline web application designed to help users preserve, organize, and relive their most cherished memories. The core idea is to provide a private, secure, and beautifully designed digital space where users can upload photos, videos, voice notes, and tag them by date, album, location, and event milestones.

This project solves the common problem of fragmented digital memories scattered across devices and platforms by bringing everything together into a centralized, searchable, and filterable personal timeline. Users can:

Create and view multimedia memories (image, video, audio)

Organize memories using tags, albums, dates, and locations

Search and filter based on keywords, tags, or milestones

Mark memories as public or private

Log in securely using Firebase Authentication

Store media in Cloudinary to bypass Firebase Storage limitations

Store metadata in Firebase Realtime Database for instant syncing

Built using React.js, Firebase, Tailwind CSS, and Cloudinary, the app offers an intuitive UI, seamless performance, and a personalized user experience.

Ultimately, MemoryLane_Personal is not just a memory management app — it’s a storytelling tool that empowers users to revisit their life's most important moments, anytime, anywhere.

## Project Type
Frontend 

## Deplolyed App
Frontend: https://memorylane7.netlify.app/


## Directory Structure
My_Memory_lane_Project/
│
├── dist/
│   ├── assets/
│   └── index.html
│
├── node_modules/
│
├── src/
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── Readme.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts


## Video Walkthrough of the project
https://youtu.be/TAY__ZeqZuM?si=_cDAH9ZPT8BH4qGg

## Features
Here are the key features of the My Memory Lane application:

User Authentication using Firebase Auth (Login/Signup)

Create & View Memories with title, description, tags, location, and media (image/video/audio)

Media Upload & Playback using Cloudinary for storage and preview of uploaded content on UI

Timeline View to see all memories chronologically

Album & Tag Filters to organize and search memories

Voice Notes Support (via external link or upload)

Dark/Light Theme Toggle using Context API



## Installation & Getting started
### 1. Clone the Repository

```bash
git clone https://github.com/your-username/My_Memory_lane_Project.git
cd My_Memory_lane_Project
npm install
npm run dev



## Technology Stack
List and provide a brief overview of the technologies used in the project.

## 🛠️ Technology Stack

This project leverages modern web development technologies and tools to deliver a seamless memory timeline experience.

- React.js – JavaScript library for building fast and interactive UIs using components.
- TypeScript – Superset of JavaScript that adds static typing and better developer tooling.
- Firebase Auth – Handles user authentication with email/password or social logins.
- Firebase Realtime Database – Stores memory metadata and user data in real-time.
- Cloudinary – Stores and serves images, videos, and voice notes efficiently with transformations and CDN support.
- Tailwind CSS – Utility-first CSS framework for rapidly building modern and responsive UIs.
- Framer Motion – Adds animations and transitions for a polished user experience.
- React Router – Enables client-side routing for navigating between different pages in the app.
- Vite – Next-generation frontend tooling for fast development and optimized builds.