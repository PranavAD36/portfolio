# Assets Guide

Complete inventory of all static assets used in the portfolio.

---

## **Public Assets** (`public/` folder)

### **1. icon.png**

- **Type:** Image (PNG)
- **Size:** 192x192 pixels
- **Description:** Favicon with white "P" letter on dark background (#060816)
- **Used In:**
  - Browser tab (favicon)
  - Open Graph preview
  - Apple devices (bookmark icon)
- **Where Referenced:** `app/layout.tsx` (lines 10-15)
- **How to Replace:**
  1. Create new 192x192 PNG image
  2. Save as `public/icon.png`
  3. Overwrite existing file
  4. Also update `app/icon.png` (app router favicon)
- **Safe to Delete:** ❌ NO - Required for favicon

---

### **2. resume.pdf**

- **Type:** PDF Document
- **Description:** Your resume/CV file
- **Used In:**
  - Download resume button in floating dock
  - Footer section social links
- **Where Referenced:**
  - `components/sections/footer-section.tsx` (lines 84-90)
  - Resume link in floating dock
- **How to Replace:**
  1. Create or download new resume.pdf
  2. Save to `public/resume.pdf`
  3. Overwrite existing file
- **Safe to Delete:** ❌ NO - Used by resume button

---

## **App Router Assets** (`app/` folder)

### **1. app/icon.png**

- **Type:** Image (PNG)
- **Size:** 192x192 pixels
- **Description:** Next.js app router favicon
- **Used In:** Browser tab, social previews
- **Where Referenced:** `app/layout.tsx` (auto-generated from this file)
- **How to Replace:**
  1. Create new 192x192 PNG image
  2. Save as `app/icon.png`
  3. Keep in sync with `public/icon.png`
- **Safe to Delete:** ❌ NO - Required for favicon
- **Note:** Next.js auto-generates favicon from this file

---

## **Style Assets** (Integrated in Code)

### **Global Styles**

- **File:** `app/globals.css`
- **Type:** CSS
- **Includes:**
  - Tailwind CSS imports
  - CSS variables
  - Animation keyframes
  - Font imports (Space Grotesk from Google Fonts)

### **Tailwind Configuration**

- **File:** `tailwind.config.ts`
- **Contains:**
  - Color palette customization
  - Typography settings
  - Theme extensions
  - Custom animations

---

## **Font Assets** (External)

### **Space Grotesk Font**

- **Source:** Google Fonts
- **Used In:** All headings and branding text
- **Imported:** `app/layout.tsx` (line 3-4)
- **Fallback:** System sans-serif
- **How to Change:**
  1. Edit `app/layout.tsx`
  2. Change: `import { Space_Grotesk } from "next/font/google"`
  3. Choose different font from Google Fonts
  4. Update className in document root

---

## **Icon Libraries** (npm Packages)

### **1. Lucide React**

- **Icons Used In:**
  - About section: Lock, Unlock, GraduationCap, Code, Cpu, Globe, Trophy, Github, Linkedin, Mail
  - Footer section: Send, CheckCircle, Loader2, RotateCcw, X
  - Projects: ExternalLink, Github
- **Package:** `lucide-react` (npm)
- **How to Use:** Import and add as JSX component
- **Example:** `<Github size={18} />`

### **2. Tabler Icons**

- **Icons Used In:**
  - Navbar: Menu, X (close)
  - Footer: GitHub, LinkedIn, Mail, Phone, FileText, Home
  - Floating Dock: Various social media icons
- **Package:** `@tabler/icons-react` (npm)
- **How to Use:** Import and add as JSX component
- **Example:** `<IconBrandGithub className="h-full w-full" />`

---

## **Image Assets** (Currently None - Placeholder Locations)

### **Project Images** (Not yet added)

- **Location:** `public/images/` (create if adding)
- **Purpose:** Project thumbnails/screenshots
- **Format:** JPG or WebP (for optimization)
- **Size:** Recommended 1200x800px (or your preferred ratio)
- **How to Add:**
  1. Create `public/images/` folder
  2. Add project images (project-1.jpg, project-2.jpg, etc.)
  3. Update `components/sections/projects-section.tsx`
  4. Import and render using Next.js `<Image>` component

### **Avatar/Profile Image** (Not currently used)

- **Location:** `public/images/avatar.jpg` (if needed)
- **Purpose:** Profile photo in about section
- **How to Add:**
  1. Create or take profile photo (JPG or PNG)
  2. Save to `public/images/avatar.jpg`
  3. Add to about section component
  4. Use Next.js `<Image>` component for optimization

---

## **Background Assets**

### **Dot Pattern**

- **Component:** `components/ui/dot-pattern.tsx`
- **Used In:** Footer section background
- **Type:** SVG (rendered as React component)
- **Customizable Properties:**
  - Width: `width={20}` (dot spacing)
  - Height: `height={20}` (dot spacing)
  - Opacity: `opacity={40}` (percentage)
  - Color: Via CSS/Tailwind
- **How to Customize:** Edit the `cx`, `cy`, `cr` and styling props in the component usage

### **Gradients**

- **Implemented Via:** Tailwind CSS classes
- **Examples:**
  - `bg-gradient-to-b from-white to-gray-500` (text gradient)
  - `bg-[radial-gradient(...)]` (radial gradients)
  - `bg-gradient-to-t` (gradient directions)
- **How to Change:** Modify Tailwind gradient classes in components

---

## **Animation Assets**

### **Framer Motion Animations**

- **Package:** `framer-motion` (npm)
- **File Locations:** All component files with `motion.` prefix
- **Animations Include:**
  - Fade in/out: `opacity: 0 → 1`
  - Scale: `scale: 0.9 → 1`
  - Y motion: `y: 20 → 0`
  - Hover effects: `whileHover={{ scale: 1.05 }}`
  - Tap effects: `whileTap={{ scale: 0.95 }}`
- **How to Modify:** Edit `initial`, `animate`, `exit`, `whileHover`, `transition` props

---

## **Configuration Files** (Not Direct Assets But Important)

| File                 | Type       | Purpose                               |
| -------------------- | ---------- | ------------------------------------- |
| `.env.local`         | Text       | Environment variables (Web3Forms key) |
| `.env.example`       | Text       | Template for .env.local               |
| `package.json`       | JSON       | Dependencies and scripts              |
| `tsconfig.json`      | JSON       | TypeScript configuration              |
| `next.config.ts`     | TypeScript | Next.js configuration                 |
| `tailwind.config.ts` | TypeScript | Tailwind CSS configuration            |
| `components.json`    | JSON       | Shadcn UI component registry          |

---

## **Asset Optimization Tips**

### **Images**

- Use **WebP format** for smaller file sizes
- Use **Next.js Image component** for automatic optimization
- Compress images before adding to project
- Tools: TinyPNG, ImageOptim, or similar

### **Fonts**

- Current setup uses **Google Fonts API** (best practice)
- Fonts are lazy-loaded with `next/font`
- No need to store font files locally

### **Icons**

- Using **npm packages** (lucide-react, @tabler/icons-react)
- Icons are rendered as React components
- Very lightweight and tree-shakeable

### **CSS**

- Using **Tailwind CSS** (no separate CSS files needed)
- Styles are scoped to components
- Builds include only used CSS (PurgeCSS)

---

## **Delete Safety Chart**

| Asset               | Safe to Delete? | Reason                           |
| ------------------- | --------------- | -------------------------------- |
| `public/icon.png`   | ❌ NO           | Required for favicon             |
| `app/icon.png`      | ❌ NO           | Required for favicon             |
| `public/resume.pdf` | ❌ NO           | Used by resume button            |
| `app/globals.css`   | ❌ NO           | Required for global styles       |
| `app/layout.tsx`    | ❌ NO           | Root layout (required)           |
| `app/page.tsx`      | ❌ NO           | Home page (required)             |
| `node_modules/`     | ✅ YES          | Can reinstall with `npm install` |
| `.next/`            | ✅ YES          | Build artifacts (regenerated)    |
| `.git/`             | ⚠️ CAUTION      | Version control data             |

---

## **File Size Reference**

| Asset                 | Typical Size   | Notes                     |
| --------------------- | -------------- | ------------------------- |
| `icon.png`            | ~5-15 KB       | Favicon (small)           |
| `resume.pdf`          | ~500 KB - 2 MB | Depends on content        |
| `globals.css` (built) | ~15-50 KB      | After Tailwind processing |
| `node_modules/`       | ~500 MB+       | All dependencies          |
| `.next/`              | ~100-300 MB    | Build output              |

---

## **Asset Organization Best Practices**

### **Recommended Structure for Expansion**

```
public/
├── icon.png                 → Favicon
├── resume.pdf               → Resume document
└── images/                  → Image folder (create as needed)
    ├── projects/            → Project screenshots
    ├── avatar/              → Profile photos
    └── og-image.jpg         → Open Graph image
```

### **File Naming Conventions**

- Use **lowercase** names
- Use **hyphens** for spaces: `my-image.png` (not `my_image.png`)
- Be **descriptive**: `project-1-hero.png` (not `img.png`)
- Include **size in name** if multiple: `icon-192x192.png`

---

## **Quick Asset Checklist**

- [ ] Favicon: `public/icon.png` and `app/icon.png` (192x192 PNG)
- [ ] Resume: `public/resume.pdf` (your CV/resume)
- [ ] Global Styles: `app/globals.css` (present and imported)
- [ ] Font: Space Grotesk (from Google Fonts in layout.tsx)
- [ ] Icons: Lucide React + Tabler Icons (npm packages)
- [ ] Images: Added to `public/images/` if needed
- [ ] Animations: Framer Motion (npm package)
- [ ] Tailwind Config: `tailwind.config.ts` (customized if needed)

---
