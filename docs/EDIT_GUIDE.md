# Edit Guide

**Beginner-Friendly Quick Reference**

Want to change something on your portfolio? This guide tells you exactly where to look.

---

## **Quick Navigation**

**Choose what you want to edit:**

- [Name & Branding](#name--branding)
- [Text & Content](#text--content)
- [Social Links](#social-links)
- [Contact Form](#contact-form)
- [Projects](#projects)
- [Resume & Files](#resume--files)
- [Appearance](#appearance)
- [Advanced Changes](#advanced-changes)

---

## **Name & Branding**

### Want to change your name from "Pranav Dabhi" to something else?

**File:** `app/layout.tsx`

- **Line:** 9
- **Change:** `title: "PranavDabhi"` → `title: "YourName"`
- **Effect:** Changes browser tab title

**File:** `components/navigation/resizable-navbar.tsx`

- **Look for:** NavbarLogo component
- **Change:** "Pranav Dabhi" text → your name
- **Effect:** Updates navbar logo text

**File:** `components/sections/hero-section.tsx`

- **Look for:** Main heading text
- **Change:** All instances of "Pranav Dabhi" → your name
- **Effect:** Updates hero banner title

**File:** `components/sections/about-section.tsx`

- **Line:** ~115
- **Change:** `<h3 className="text-3xl...">Pranav Dabhi</h3>` → your name
- **Effect:** Updates about section profile name

---

### Want to change the logo initial from "P" to your initial?

**File:** `components/navigation/resizable-navbar.tsx`

- **Look for:** NavbarLogo component with "P" letter
- **Change:** `"P"` → your initial (single letter)
- **Effect:** Updates navbar logo letter

---

## **Text & Content**

### Want to edit the Hero section tagline/description?

**File:** `components/sections/hero-section.tsx`

- **Look for:** Subtitle or tagline text
- **Search for:** Text like "Building..." or "Creating..."
- **Change to:** Your tagline
- **Example:**
  - Old: "Building polished digital experiences"
  - New: "Crafting innovative web solutions"

---

### Want to edit the About section description?

**File:** `components/sections/about-section.tsx`

- **Line:** ~145-149
- **Look for:** The paragraph text in the "unlocked" state
- **Search for:** "Hi, I'm building a polished portfolio..."
- **Change to:** Your bio/description
- **Effect:** Updates about section text when unlocked

---

### Want to edit the About section info cards?

**File:** `components/sections/about-section.tsx`

- **Look for:** InfoCard components (around line 155-159)
- **Education card:** Change "B.Tech in Computer Engineering (3rd Year)"
- **Role card:** Change "Full Stack Developer"
- **Specialized In:** Change "Modern Web Applications"
- **Location:** Change "Morbi, Gujarat, India"
- **Goal:** Change "Building clean, simple user experiences"

**How to edit:**

```
Look for lines like:
<InfoCard icon={...} title="Education" value="B.Tech in..." color="purple" />
Change the value="..." part to your text
```

---

### Want to edit Tech Stack / Skills?

**File:** `components/sections/tech-stack.tsx`

- **Look for:** Tech list array
- **Add/Remove/Edit:** Technology names and descriptions
- **Effect:** Updates the technologies display section

---

### Want to edit Project names and descriptions?

**File:** `components/sections/projects-section.tsx`

- **Search for:** "Project 1", "Project 2", "Project 3"
- **Change to:** Your actual project names
- **Search for:** "This project is currently under development"
- **Change to:** Your project descriptions
- **Effect:** Updates projects section cards

---

### Want to edit form labels or placeholders?

**File:** `components/sections/footer-section.tsx`

- **Look for:** Form input elements (around line 200+)
- **Placeholder examples:**
  - `placeholder="Enter your full name"` → your placeholder text
  - `placeholder="your@email.com"` → your email placeholder
- **Form fields:** Name, Email, Subject (dropdown), Message
- **Change the text:** Replace placeholder or label text
- **Effect:** Changes what users see in the contact form

---

### Want to change contact form subject line options?

**File:** `components/sections/footer-section.tsx`

- **Look for:** `<select name="subject">` or `<option>` tags
- **Current options:**
  - General Inquiry
  - Collaboration Opportunity
  - Freelance Project
  - Technical Discussion
  - Job Opportunity
  - Feedback
  - Bug Report
  - Other
- **To change:** Replace option text with your categories
- **To add/remove:** Add/remove `<option>` tags

---

## **Social Links**

### Want to change your GitHub link?

**File:** `components/sections/about-section.tsx`

- **Line:** 150
- **Change:** `href="https://github.com/PranavAD36"` → your GitHub URL

**File:** `components/sections/footer-section.tsx`

- **Line:** 87 (in links array)
- **Change:** `href: "https://github.com/PranavAD36"` → your GitHub URL

---

### Want to change your LinkedIn link?

**File:** `components/sections/about-section.tsx`

- **Line:** 151
- **Change:** `href="https://www.linkedin.com/in/dabhi-pranav-129b05331"` → your LinkedIn URL

**File:** `components/sections/footer-section.tsx`

- **Line:** 86 (in links array)
- **Change:** `href: "https://www.linkedin.com/in/dabhi-pranav-129b05331"` → your LinkedIn URL

---

### Want to change your LeetCode link?

**File:** `components/sections/about-section.tsx`

- **Line:** 155
- **Change:** `href="https://leetcode.com/u/tFt4QC7qdx/"` → your LeetCode URL

**File:** `components/sections/footer-section.tsx`

- **Line:** 90 (in links array)
- **Change:** `href: "https://leetcode.com/u/tFt4QC7qdx/"` → your LeetCode URL

---

### Want to change your email?

**File:** `components/sections/about-section.tsx`

- **Line:** 152
- **Change:** `href="mailto:pranav.dabhi9969@gmail.com"` → `mailto:your-email@example.com`

**File:** `components/sections/footer-section.tsx`

- **Line:** 64
- **Change:** `fd.set("to", "pranav.dabhi9969@gmail.com")` → your email
- **Effect:** Contact form submissions go to this email

**File:** `components/sections/footer-section.tsx`

- **Line:** 88 (in links array)
- **Change:** `href: "mailto:pranav.dabhi9969@gmail.com"` → `mailto:your-email@example.com`

---

### Want to change your phone number?

**File:** `components/sections/footer-section.tsx`

- **Line:** 89 (in links array)
- **Change:** `href: "tel:+919737286699"` → `tel:+your-country-code-number`
- **Format:** `tel:+[country-code][number]` (no spaces or dashes)
- **Example:** `tel:+14155552671` (US number)

---

## **Contact Form**

### Want to change the contact form recipient email?

**File:** `components/sections/footer-section.tsx`

- **Line:** 64
- **Current:** `fd.set("to", "pranav.dabhi9969@gmail.com")`
- **Change to:** `fd.set("to", "your-email@example.com")`
- **Effect:** Emails from contact form will be sent to this address

---

### Want to change the contact form subject line?

**File:** `components/sections/footer-section.tsx`

- **Line:** 63
- **Current:** ``fd.set("subject", `Portfolio Contact - ${subjectEl}`)``
- **Change to:** ``fd.set("subject", `Your Portfolio - ${subjectEl}`)``
- **What is `${subjectEl}`?** The subject category selected by the user
- **Effect:** Emails will have your custom subject line

---

### Want to set up the contact form to actually send emails?

1. **Go to:** https://web3forms.com
2. **Create account** and sign up
3. **Create a form** and get your Access Key
4. **Open file:** `.env.local` (in project root)
5. **Add this line:** `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here`
6. **Replace:** `your_access_key_here` with your actual key
7. **Save and restart** your dev server

**Test:**

- Go to your portfolio
- Fill out contact form
- Click submit
- Should see success message
- Check your email inbox for the submission

---

### Want to add a new field to the contact form?

**File:** `components/sections/footer-section.tsx`

- **Look for:** Form inputs (name, email, subject, message)
- **To add:** Create new `<input>` or `<textarea>` element with `name="fieldname"`
- **Example:**
  ```jsx
  <input type="text" name="company" placeholder="Your company (optional)" />
  ```
- **Important:** Add `name` attribute so data is captured

---

## **Projects**

### Want to change "Project 1" title?

**File:** `components/sections/projects-section.tsx`

- **Search for:** "Project 1"
- **Change to:** Your actual project name
- **Example:** "E-Commerce Platform", "AI Chatbot", "Dashboard App"

---

### Want to change project description?

**File:** `components/sections/projects-section.tsx`

- **Search for:** "This project is currently under development"
- **Change to:** Your project description
- **Example:** "A full-stack e-commerce platform built with React and Node.js"

---

### Want to add project links?

**File:** `components/sections/projects-section.tsx`

- **Look for:** Project card links
- **Add:** GitHub link, live demo link, etc.
- **Update:** href to point to your project URL

---

## **Resume & Files**

### Want to change your resume file?

**File:** `public/resume.pdf`

- **Replace:** Your resume PDF in the public folder
- **Name:** Must be exactly `resume.pdf`
- **Where used:** Resume download button in footer dock
- **How:**
  1. Create/download your resume as PDF
  2. Save as `resume.pdf`
  3. Replace the file in `public/` folder
  4. Refresh portfolio to see changes

---

### Want to change the resume download button?

**File:** `components/sections/footer-section.tsx`

- **Line:** 84 (in links array)
- **Current:** `{ title: "Resume", icon: ..., href: "/resume.pdf" }`
- **Change href:** To point to different file path if needed
- **Or change title:** To "Download CV", "CV", "Portfolio", etc.

---

### Want to add another file download (like cover letter)?

**File:** `components/sections/footer-section.tsx`

- **Add to links array:**
  ```jsx
  {
    title: "Cover Letter",
    icon: <IconFileText />,
    href: "/cover-letter.pdf"
  }
  ```
- **Add file:** Save your PDF as `cover-letter.pdf` in `public/` folder

---

## **Appearance**

### Want to change colors?

**Colors are defined using Tailwind CSS classes**

**Common color classes:**

- Text: `text-cyan-400`, `text-white`, `text-orange-400`
- Background: `bg-black`, `bg-white/10`, `bg-purple-500/20`
- Border: `border-white/10`, `border-cyan-500`

**To change a color:**

1. **Find the element** you want to change
2. **Look for** Tailwind class like `text-cyan-400`
3. **Replace** with different color: `text-blue-400`, `text-green-400`, etc.
4. **Color options:** https://tailwindcss.com/docs/customizing-colors

**Example:**

- Old: `<span className="text-cyan-400">ONLINE</span>`
- New: `<span className="text-green-400">ONLINE</span>`

---

### Want to change fonts?

**Current font:** Space Grotesk (from Google Fonts)

**To change:**

1. **File:** `app/layout.tsx` (line 3-4)
2. **Change:** `import { Space_Grotesk } from "next/font/google"`
3. **To new font:** `import { Poppins } from "next/font/google"`
4. **Update:** Font configuration and className
5. **Visit:** https://fonts.google.com for font options

---

### Want to change animation speed?

**Animations use Framer Motion**

**Find animation speed:**

- Look for: `transition={{ duration: 0.5 }}`
- `0.5` = half second, `1` = 1 second, `2` = 2 seconds
- Lower number = faster animation
- Higher number = slower animation

**To change:**

- Edit the duration value
- Smaller = faster, Larger = slower

---

### Want to disable animations?

**Option 1:** Remove `motion.` components and use regular HTML

- Replace: `<motion.div>` with `<div>`

**Option 2:** Set duration to 0

- Change: `transition={{ duration: 0 }}`

**Option 3:** Add prefers-reduced-motion CSS

- In globals.css, add media query for accessibility

---

### Want to change the favicon?

**File:** `app/icon.png`

- **Current:** White "P" on dark background (192x192 pixels)
- **Replace:** Create your own 192x192 PNG image
- **Save as:** `app/icon.png`
- **Also update:** `public/icon.png` (keep in sync)
- **Effect:** Changes browser tab icon

---

### Want to change the browser tab title?

**File:** `app/layout.tsx`

- **Line:** 9
- **Current:** `title: "PranavDabhi"`
- **Change to:** `title: "Your Name"` or `title: "My Portfolio"`
- **Effect:** Changes what appears in the browser tab

---

### Want to change the browser title bar?

**File:** `app/layout.tsx`

- **Same as above** - the `title` property
- **Effect:** Affects browser tab text and search engine results

---

### Want to change meta description (for SEO)?

**File:** `app/layout.tsx`

- **Line:** 11
- **Current:** `description: "A polished portfolio experience built with modern web technologies."`
- **Change to:** Your description
- **Effect:** Shows in Google search results, social media previews

---

## **Advanced Changes**

### Want to hide/show components?

**File:** `app/page.tsx`

- **Comment out components** you don't want to show
- **Example (hide floating assistant):**
  ```jsx
  {
    /* <FloatingAssistant /> */
  }
  ```

### Want to reorder sections?

**File:** `app/page.tsx`

- **Move components** around in the JSX
- **Order of components** = order on page
- **Example:** Move FooterSection above ProjectsSection to change layout

---

### Want to add a new section?

1. **Create file:** `components/sections/new-section.tsx`
2. **Build component** with your content
3. **Import:** In `app/page.tsx` at top
4. **Add:** In the JSX where you want it to appear
5. **Style:** Use Tailwind CSS classes

---

### Want to change SEO metadata?

**File:** `app/layout.tsx`

- **title:** Browser tab and search results
- **description:** Google search result snippet
- **openGraph.title:** Social media share title
- **openGraph.description:** Social media share description

---

### Want to add Google Analytics?

1. **Set up:** Google Analytics account
2. **Get:** Tracking ID
3. **Add:** To environment variables or code
4. **Example:** Use `next/script` component in layout

---

### Want to enable/disable the AI chatbot?

**File:** `app/page.tsx`

- **Look for:** `<FloatingAssistant />`
- **To hide:** Add `{/* <FloatingAssistant /> */}` (comment out)
- **To show:** Remove comment: `<FloatingAssistant />`

---

### Want to change the background pattern?

**File:** `components/sections/footer-section.tsx`

- **Look for:** `<DotPattern>` component
- **Properties:** `width`, `height`, `opacity`
- **Example:**
  ```jsx
  <DotPattern
    width={20} // spacing between dots
    height={20}
    opacity={40} // transparency (0-100)
  />
  ```

---

## **Common Issues & Fixes**

### **Changes not showing up?**

1. **Save file** (Ctrl+S)
2. **Check dev server** is running (npm run dev)
3. **Refresh browser** (F5 or Ctrl+R)
4. **Hard refresh** (Ctrl+Shift+R) to clear cache

### **Build errors after editing?**

1. **Check syntax** - look for unclosed brackets or quotes
2. **Check file path** - make sure imports are correct
3. **Check tsconfig** - TypeScript might be catching type errors

### **Email form not sending?**

1. **Check .env.local** - Access key must be set
2. **Check email recipient** - Line 64 in footer-section.tsx
3. **Check browser console** - Ctrl+Shift+J for error messages
4. **Test in browser** - Go to portfolio and try form

---

## **Verification Checklist**

After making changes:

- [ ] File saved (Ctrl+S)
- [ ] Dev server running (npm run dev)
- [ ] Browser refreshed (Ctrl+R)
- [ ] Changes visible on localhost:3000
- [ ] No console errors (F12 → Console)
- [ ] Links open correct pages
- [ ] Form submits successfully
- [ ] Mobile responsive (F12 → Toggle device)
- [ ] No TypeScript errors

---

## **Quick Command Reference**

| Task             | Command              |
| ---------------- | -------------------- |
| Start dev server | `npm run dev`        |
| Build project    | `npm run build`      |
| Start production | `npm start`          |
| Lint code        | `npm run lint`       |
| Stop dev server  | `Ctrl+C` in terminal |

---

## **When to Get Help**

Ask for help if you need to:

- Add major new features
- Integrate third-party services
- Fix broken builds or errors
- Deploy to production
- Optimize performance
- Configure databases
- Set up authentication

---

**Happy editing! 🚀**

If you can't find what you're looking for, check **PROJECT_STRUCTURE.md** for the complete folder guide or **COMPONENT_MAP.md** for detailed component information.

---
