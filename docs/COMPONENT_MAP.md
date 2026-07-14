# Component Map

Detailed guide to every visible section of the portfolio with editing instructions.

---

## **1. Navbar (Navigation Bar)**

> Mission Control and the contribution graph are now documented separately below.

### **Component Details**

- **Component Name:** ResizableNavbar (responsive)
- **File Location:** `components/navigation/resizable-navbar.tsx`
- **Related Files:**
  - `components/navigation/navbar.tsx` (desktop version)
  - `components/navigation/menu.tsx` (mobile menu)
- **Related CSS:** Tailwind classes within component
- **Icons Used:** Lucide React icons
- **Dependencies:** React, Tailwind CSS, Framer Motion

### **What It Shows**

- Logo: "P" + "Pranav Dabhi" text
- Navigation links to sections: Hero, About, Tech Stack, Projects, Contact
- Mobile hamburger menu on small screens
- Smooth transitions and animations

### **How to Edit Text**

```
File: components/navigation/resizable-navbar.tsx
Look for the NavbarLogo component and navigation links
Change text where you see "Pranav Dabhi" to your name
```

### **How to Change Buttons/Links**

```
Find the navigation array in the file
Modify href values to point to section IDs
Example: href="#about" links to the about section
```

### **How to Change Logo**

```
Look for NavbarLogo component
Change "P" to your initial
Change "Pranav Dabhi" to your name
```

---

## **2. Hero Section (Banner)**

### **Component Details**

- **Component Name:** HeroSection
- **File Location:** `components/sections/hero-section.tsx`
- **Related CSS:** Tailwind gradient classes
- **Images Used:** None (background gradients only)
- **Icons Used:** None
- **Dependencies:** React, Tailwind CSS, Framer Motion

### **What It Shows**

- Large title with name
- Badge text: "Pranav Dabhi"
- Subtitle/tagline
- Call-to-action buttons (Resume, Contact)
- Animated text effects

### **How to Edit Text**

```
File: components/sections/hero-section.tsx
Search for "Pranav Dabhi" - all instances
Replace with your name
Search for tagline/description text
Edit the main heading and subtitle text
```

### **How to Change Buttons**

```
Look for button elements in the JSX
Change button text
Modify onClick handlers or href links
Update button labels like "Download Resume" or "Get In Touch"
```

### **How to Add/Remove Buttons**

```
Add new motion.button element with className and onClick handler
Remove by deleting the motion.button JSX block
```

---

## **3. About Section (Profile/Encryption)**

### **Component Details**

- **Component Name:** AboutSection
- **File Location:** `components/sections/about-section.tsx`
- **Related CSS:** Tailwind classes, gradient backgrounds
- **Images Used:** None (gradients and animations only)
- **Icons Used:** Lucide React (Lock, Unlock, GraduationCap, Code, Cpu, Globe, Trophy, Github, Linkedin, Mail)
- **Dependencies:** React, Tailwind CSS, Framer Motion

### **What It Shows**

- Animated lock/unlock gate animation
- "ENCRYPTION" title with status text
- Profile name: "Pranav Dabhi"
- Status indicator: "SYSTEM STATUS: ONLINE"
- Info cards: Education, Role, Specialization, Location, Goal
- Social links: GitHub, LinkedIn, Email, LeetCode
- Interactive unlock/re-lock button

### **How to Edit Text**

```
File: components/sections/about-section.tsx

Change Name: Line ~115, "Pranav Dabhi"
Change Status: Look for statusText variable (lines ~20-30)
Change Info Cards:
  - Line ~155: Change Education text
  - Line ~156: Change Role text
  - Line ~157: Change Specialization
  - Line ~158: Change Location
  - Line ~159: Change Goal text
Change Bio/Summary: Line ~145-149, edit the paragraph text
```

### **How to Change Social Links**

```
File: components/sections/about-section.tsx
Look for SocialLink components (around line 150-154)

Current links:
- GitHub: https://github.com/PranavAD36
- LinkedIn: https://www.linkedin.com/in/dabhi-pranav-129b05331
- Email: mailto:pranav.dabhi9969@gmail.com
- LeetCode: https://leetcode.com/u/tFt4QC7qdx/

Replace URLs in the href property
Keep mailto: prefix for email
Keep https:// for external links
```

### **How to Change Info Card Icons**

```
Look at the InfoCard component calls
Change the icon prop to use a different Lucide React icon
Import new icons at top: import { NewIcon } from "lucide-react"
```

---

## **4. Tech Stack Section (Skills)**

### **Component Details**

- **Component Name:** TechStack
- **File Location:** `components/sections/tech-stack.tsx`
- **Related CSS:** Tailwind grid classes
- **Images Used:** Tech logos (CSS display)
- **Icons Used:** None
- **Dependencies:** React, Tailwind CSS, Framer Motion

### **What It Shows**

- Grid of technology/tool cards
- Logos for each technology
- Hover animations on cards
- Technologies: JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Tailwind, etc.

### **How to Edit Technologies**

```
File: components/sections/tech-stack.tsx
Find the tech array/list in the component
Add, remove, or modify technology names
Update descriptions if present
```

### **How to Add New Tech**

```
Add new entry to the tech array with:
- name
- logo/icon
- description (optional)

Follow existing pattern for consistency
```

---

## **5. Projects Section (Mission/Portfolio)**

### **Component Details**

- **Component Name:** ProjectsSection
- **File Location:** `components/sections/projects-section.tsx`
- **Related CSS:** Tailwind card classes
- **Images Used:** Project images (if added)
- **Icons Used:** ExternalLink (Lucide React), Github icon
- **Dependencies:** React, Tailwind CSS, Framer Motion

### **What It Shows**

- Project cards: Project 1, 2, 3
- Project titles
- Descriptions: "This project is currently under development"
- External links / GitHub links
- Animated card hover effects

### **How to Edit Project Titles**

```
File: components/sections/projects-section.tsx
Search for "Project 1", "Project 2", "Project 3"
Replace with actual project names
```

### **How to Edit Project Descriptions**

```
Look for project description text
Replace "This project is currently under development"
with actual project description
```

### **How to Change Project Links**

```
Find project links array/objects
Update href for GitHub links
Update external project URLs
Example: href: "https://github.com/your-project"
```

### **How to Add Project Images**

```
Add images to public/ folder
Import or reference in component
Update project card to display image
Wrap image in <Image> component (Next.js optimized)
```

---

## **6. Floating Dock (Social Links - Footer)**

### **Component Details**

- **Component Name:** FloatingDock
- **File Location:** `components/ui/floating-dock.tsx`
- **Related CSS:** Tailwind positioning classes
- **Icons Used:** Tabler Icons (IconBrandGithub, IconBrandLinkedin, IconMail, IconPhone, IconFileText, etc.)
- **Dependencies:** React, Tailwind CSS, Framer Motion

### **What It Shows**

- Floating dock with social media icons
- Icons for: Home, LinkedIn, GitHub, Email, Phone, Resume, LeetCode
- Hover effects and animations
- Positioned at bottom of page

### **How to Edit Links**

```
File: components/sections/footer-section.tsx (line 84-90 in links array)

Links included:
- Home: # (internal scroll)
- LinkedIn: https://www.linkedin.com/in/dabhi-pranav-129b05331
- GitHub: https://github.com/PranavAD36
- Email: mailto:pranav.dabhi9969@gmail.com
- Phone: tel:+919737286699
- Resume: /resume.pdf (or update path)
- LeetCode: https://leetcode.com/u/tFt4QC7qdx/

Replace URL in href property
```

### **How to Change Icons**

```
Import new icons from @tabler/icons-react
Update the icon prop in links array
Ensure icon sizes are consistent
```

### **How to Add/Remove Links**

```
Add new object to links array:
{ title: "LinkName", icon: <IconComponent />, href: "url" }

Remove by deleting the object from array
Ensure proper comma placement
```

---

## **7. Footer Section (Transmission Deck - Contact Form)**

### **Component Details**

- **Component Name:** FooterSection
- **File Location:** `components/sections/footer-section.tsx`
- **Related CSS:** Tailwind classes, backdrop blur
- **Images Used:** None
- **Icons Used:** Send, CheckCircle, Loader2, RotateCcw, X (Lucide React), Tabler Icons
- **Dependencies:** React, Tailwind CSS, Framer Motion, Web3Forms API

### **What It Shows**

- "TRANSMISSION DECK" heading (contact form section)
- Contact form with fields: Name, Email, Subject, Message
- Submit button with animated states (idle, sending, success, error)
- Success/error message display
- Error banner with API response
- Floating dock with social links
- Dot pattern background

### **How to Edit Contact Form Title**

```
File: components/sections/footer-section.tsx
Look for h2 with "TRANSMISSION DECK" (line ~130)
Change to your preferred section title
```

### **How to Edit Form Labels/Placeholders**

```
Find form input elements
Change placeholder text
Update label text
Example: placeholder: "Enter your full name"
```

### **How to Change Form Recipient Email**

```
Line ~64: fd.set("to", "pranav.dabhi9969@gmail.com")
Replace email address with your email
This is where contact form submissions go
```

### **How to Change Subject Line Format**

```
Line ~63: fd.set("subject", `Portfolio Contact - ${subjectEl}`)
Customize the subject line template
The ${subjectEl} is replaced with selected reason
```

### **How to Add/Remove Form Fields**

```
Add new field: Create <input> or <select> element with name attribute
Remove field: Delete the input element
Update FormData handling if adding custom fields
```

### **How to Change Submit Button Text**

```
Find button text: "Send Transmission" or similar
Replace with your preferred text
Button color changes based on sendStatus state (idle/sending/success/error)
```

### **How to Set Up Email (Web3Forms)**

```
1. Get Web3Forms Access Key from https://web3forms.com
2. Add to .env.local file:
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here
3. Form will automatically send emails to pranav.dabhi9969@gmail.com
4. Change recipient in line 64 if needed
```

---

## **8. Floating Assistant (AI Chatbot)**

### **Component Details**

- **Component Name:** FloatingAssistant
- **File Location:** `components/features/floating-assistant.tsx`
- **Related CSS:** Tailwind classes, positioning
- **Images Used:** None
- **Icons Used:** Chat/message icons
- **Dependencies:** React, Google Generative AI API

### **What It Shows**

- Floating chat widget
- AI-powered chatbot (powered by Google Gemini)
- Conversation interface
- Appears as floating button on page

### **How to Enable/Disable**

```
File: app/page.tsx
Comment/uncomment the FloatingAssistant import
To disable: Add // before the component rendering
```

### **How to Configure**

```
File: components/features/floating-assistant.tsx
Add Google Generative AI API key to environment
Configure chatbot system prompt/instructions
```

---

## **9. Background & Animations**

### **Background Elements**

- **Dot Pattern:** Used in footer section
  - File: `components/ui/dot-pattern.tsx`
  - Location: Footer background
  - Edit: Adjust opacity, dot size, colors

### **Animation Framework**

- **Framer Motion:** All animations use Framer Motion
- **File Locations:** Every component with animations
- **Animations Include:**
  - Fade in/out effects
  - Scale transitions
  - Y-axis (vertical) motion
  - Hover effects on cards
  - Button state animations

### **Global Styles**

- **File:** `app/globals.css`
- **Includes:**
  - Tailwind CSS imports
  - Global CSS variables
  - Animation keyframes
  - Font definitions

### **How to Change Animation Speed**

```
Look for transition={{ duration: X }}
X is in seconds (e.g., 0.5 = half second)
Adjust value to speed up or slow down animation
```

### **How to Disable Animations**

```
Option 1: Set duration to 0
Option 2: Remove motion.* components and use regular HTML elements
Option 3: Add CSS class to disable transitions globally
```

### **How to Change Colors**

```
Most colors use Tailwind classes
Examples: text-cyan-400, bg-white/10, border-white/10
Edit these class values
Use Tailwind color palette: https://tailwindcss.com/docs/customizing-colors
```

---

## **10. Mobile Responsive Design**

### **Responsive Strategy**

- **Mobile First:** Components designed mobile-first
- **Breakpoints:** Uses Tailwind breakpoints (sm, md, lg, xl)
- **Responsive Navbar:** ResizableNavbar handles mobile vs desktop

### **Mobile Menu**

- **File:** `components/navigation/menu.tsx`
- **Behavior:** Hamburger menu appears on small screens
- **Links:** Same as desktop navigation

### **Responsive Layout**

- **Classes Used:**
  - `md:` prefix for medium screens and above
  - `lg:` prefix for large screens and above
  - `flex flex-col md:flex-row` (stack on mobile, row on desktop)

### **How to Test Mobile View**

```
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device size
4. Test all sections
```

---

## **Quick Reference: Component-to-File Mapping**

| Section      | File                                         | Edit For                              |
| ------------ | -------------------------------------------- | ------------------------------------- |
| Navbar       | `components/navigation/resizable-navbar.tsx` | Name, logo, links                     |
| Hero         | `components/sections/hero-section.tsx`       | Title, tagline, buttons               |
| About        | `components/sections/about-section.tsx`      | Name, social links, info cards        |
| Tech Stack   | `components/sections/tech-stack.tsx`         | Technologies, skills                  |
| Projects     | `components/sections/projects-section.tsx`   | Project names, descriptions, links    |
| Contact Form | `components/sections/footer-section.tsx`     | Form fields, email recipient, subject |
| Social Dock  | `components/ui/floating-dock.tsx`            | Social media links, icons             |
| AI Chatbot   | `components/features/floating-assistant.tsx` | Enable/disable, configuration         |
| Background   | `app/globals.css`                            | Global styles                         |
| Animations   | All component files                          | Duration, effects                     |

---
