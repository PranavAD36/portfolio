# Project Structure

Complete folder tree and file guide for Pranav Dabhi's Portfolio.

---

## **Root Level Files**

```
s:\project\portfolio\
├── .env.local                    → Environment variables (NOT committed to git)
├── .env.example                  → Template for .env.local
├── package.json                  → Dependencies and scripts
├── package-lock.json             → Dependency lock file
├── tsconfig.json                 → TypeScript configuration
├── next.config.ts                → Next.js configuration
├── tailwind.config.ts            → Tailwind CSS configuration
├── postcss.config.mjs            → PostCSS configuration
├── components.json               → Shadcn component registry
├── eslint.config.mjs             → ESLint rules
├── README.md                     → Project overview
└── tech.txt                      → Tech stack file
```

---

## **Directory Structure**

### **app/** - Next.js App Router (Main Application Logic)

```
app/
├── page.tsx                      → Main homepage component
│                                   Renders all sections in order
│                                   Components used: Navbar, Hero, About, TechStack, Projects, Footer
├── layout.tsx                    → Root layout with metadata
│                                   Sets browser title: "PranavDabhi"
│                                   Favicon configuration: /icon.png
│                                   Font: Space Grotesk
├── globals.css                   → Global styles and Tailwind imports
├── icon.png                      → Favicon (192x192 PNG)
│                                   White "P" on dark background
├── not-found.tsx                 → 404 error page
└── api/                          → API routes (if needed)
    └── (empty currently)
```

---

### **components/** - React Components

#### **components/navigation/** - Navigation Components

```
navigation/
├── navbar.tsx                    → Desktop navigation bar
│                                   Logo: "P" + "Pranav Dabhi"
│                                   Navigation links to sections
├── resizable-navbar.tsx          → Responsive/mobile navigation
│                                   Logo: "P" + "Pranav Dabhi"
│                                   Handles mobile menu
└── menu.tsx                      → Mobile menu component
                                    Links and hamburger menu
```

#### **components/sections/** - Main Page Sections

```
sections/
├── hero-section.tsx              → Hero/banner section
│                                   Displays name and title
│                                   Badge text: "Pranav Dabhi"
│                                   Call-to-action buttons
├── about-section.tsx             → About/profile section
│                                   Encrypted unlock animation
│                                   Social links: GitHub, LinkedIn, Email, LeetCode
│                                   Skills and info cards
├── tech-stack.tsx                → Technologies section
│                                   List of tools and frameworks
│                                   Skills display
├── projects-section.tsx          → Projects/missions section
│                                   Project 1, 2, 3 cards
│                                   Development status
│                                   Project descriptions
└── footer-section.tsx            → Contact form (Transmission Deck)
                                    Web3Forms email integration
                                    Floating dock with social links
                                    Contact form fields
```

#### **components/features/** - Feature Components

```
features/
├── floating-assistant.tsx        → Floating assistant widget
│                                   AI-powered chatbot (Google Generative AI)
├── feedback-popup.tsx            → Feedback/survey popup
│                                   User feedback collection
└── (other features if added)
```

#### **components/ui/** - Reusable UI Components

```
ui/
├── dot-pattern.tsx               → Dot pattern background effect
├── floating-dock.tsx             → Floating dock navigation
│                                   Social links with icons
│                                   Appears in footer section
├── spotlight-cursor.tsx          → Spotlight effect on cursor (optional)
├── button.tsx                    → Reusable button component
├── card.tsx                      → Reusable card component
└── (other Shadcn UI components)
```

#### **components/common/** - Common Utility Components

```
common/
├── preloader.tsx                 → Loading screen
│                                   Shows on page load
├── smooth-scroll.tsx             → Smooth scrolling utility
│                                   Handles smooth page scrolling
└── (other common utilities)
```

---

### **public/** - Static Assets

```
public/
├── icon.png                      → Favicon file
│                                   White "P" on dark background
│                                   192x192 pixels
├── resume.pdf                    → Resume/CV download
└── (other static files)
```

---

### **lib/** - Utility Functions and Helpers

```
lib/
├── utils.ts                      → Helper functions
│                                   Utility functions used throughout project
└── (other utilities)
```

---

### **styles/** - Styling (if separate from globals.css)

```
(Integrated into globals.css and component-level Tailwind classes)
```

---

## **Configuration Files Explained**

| File                 | Purpose                                 |
| -------------------- | --------------------------------------- |
| `tsconfig.json`      | TypeScript compilation settings         |
| `next.config.ts`     | Next.js build and runtime configuration |
| `tailwind.config.ts` | Tailwind CSS customization              |
| `postcss.config.mjs` | CSS post-processing with Tailwind       |
| `components.json`    | Shadcn UI component configuration       |
| `eslint.config.mjs`  | Code linting rules                      |

---

## **Environment Files**

| File           | Purpose                                        | Safe to Edit?                          |
| -------------- | ---------------------------------------------- | -------------------------------------- |
| `.env.local`   | Local environment variables (NOT committed)    | ✅ YES - Add Web3Forms access key here |
| `.env.example` | Template showing what env variables are needed | ✅ YES - For reference                 |

---

## **Build Artifacts (Auto-Generated, Do NOT Edit)**

```
.next/                   → Build output (auto-generated)
node_modules/            → Installed packages (auto-generated)
.git/                    → Git repository (version control)
```

---

## **Key Rendering Flow**

1. **app/page.tsx** → Imports and renders main components
2. **Navbar** → Navigation (top of page)
3. **HeroSection** → Hero banner with name
4. **AboutSection** → Profile and info
5. **TechStack** → Skills and technologies
6. **ProjectsSection** → Project portfolio
7. **FloatingAssistant** → AI chatbot widget
8. **FooterSection** → Contact form and footer

---

## **Component Dependencies**

**Top-Level (imported in page.tsx):**

- HeroSection
- Navbar / ResizableNavbar
- AboutSection
- TechStack
- ProjectsSection
- FooterSection
- FloatingAssistant
- Preloader
- SmoothScroll
- FeedbackPopup

**Utility Components (used by sections):**

- FloatingDock
- DotPattern
- Button
- Card
- Icons (from lucide-react and @tabler/icons-react)

---

## **Important File Paths for Quick Reference**

```
Edit Name/Title     → app/layout.tsx (line 9: title: "PranavDabhi")
Edit Hero Text      → components/sections/hero-section.tsx
Edit About Info     → components/sections/about-section.tsx
Edit Projects       → components/sections/projects-section.tsx
Edit Contact Form   → components/sections/footer-section.tsx
Edit Navbar         → components/navigation/resizable-navbar.tsx
Edit Favicon        → app/icon.png (or public/icon.png)
Edit Animations     → components/sections/* (uses Framer Motion)
Edit Colors/Styles  → Tailwind classes in component files
Edit Social Links   → components/sections/about-section.tsx & footer-section.tsx
```

---

## **Technology Stack**

- **Framework:** Next.js 16.0.7
- **Runtime:** React 19.2.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.9
- **Animation:** Framer Motion 12.23.25
- **Icons:** Lucide React + Tabler Icons
- **Forms:** Web3Forms (email service)
- **AI:** Google Generative AI (chatbot)
- **UI Components:** Shadcn/ui (Radix UI)
- **Bundler:** Turbopack (built into Next.js)

---
