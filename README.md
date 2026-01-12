# OLIK Demolishers - Premium Manual Deconstruction Platform

OLIK Demolishers is a high-end digital portal for a specialized demolition and salvage firm based in Nairobi, Kenya. The platform focuses on precision manual dismantling, architectural salvage, and AI-driven structural audits.

## 🏗️ Core Features

- **AI Structural & Salvage Audit**: Leverage Google Gemini Pro models to analyze site images for structural integrity, personnel requirements, and material value.
- **Live Operations Pulse**: Real-time activity feed monitoring active site progress and recovery milestones.
- **Dynamic Salvage Inventory**: A curated showcase of reclaimed architectural fixtures with local-storage-backed "Quick-List" functionality for on-site staff.
- **Project Execution Gallery**: High-definition visual record of complex deconstruction projects, including luxury pool remediation.
- **Direct Director Access**: Integrated communication channels for instant site assessments via WhatsApp and secure email.

## 🛠️ Tech Stack

- **Frontend**: React 19 (ES6 Modules)
- **Styling**: Tailwind CSS
- **Intelligence**: Google Gemini API (`@google/genai`)
- **Icons**: FontAwesome 6.4.0
- **Typography**: Inter (Google Fonts)

## 🚀 Getting Started

1. **Prerequisites**: Ensure you have an environment capable of serving static HTML/JS files.
2. **Environment Variables**: The application requires a `process.env.API_KEY` for the Gemini AI Audit features.
3. **Deployment**: This project is structured as a root-level ES6 module application. Point your web server to `index.html`.

## 📂 Project Structure

- `/components`: UI Modules (Navbar, Hero, Gallery, etc.)
- `/services`: API integration (Gemini Pro)
- `/constants.tsx`: Central data store for services and gallery
- `App.tsx`: Main application entry and layout
- `index.tsx`: React mounting point

## 🛡️ Safety & Compliance

OLIK Demolishers operates under strict NCA standards. This digital platform is designed to streamline the technical documentation and safety auditing required for high-risk manual structural dismantling.

---

*© 2025 OLIK Demolishers. Professional. Precise. Reclaimed.*