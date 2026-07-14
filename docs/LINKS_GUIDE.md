# Links Guide

Complete inventory of every external link in the portfolio with exact file locations and line numbers.

---

## **Social Media Links**

### **GitHub**

- **URL:** `https://github.com/PranavAD36`
- **Locations:**
  - `components/sections/about-section.tsx` (line 150)
  - `components/sections/footer-section.tsx` (line 87)
- **Usage:**
  - GitHub link in about section social links
  - GitHub link in floating dock
- **How to Update:** Replace the URL in href property

---

### **LinkedIn**

- **URL:** `https://www.linkedin.com/in/dabhi-pranav-129b05331`
- **Locations:**
  - `components/sections/about-section.tsx` (line 151)
  - `components/sections/footer-section.tsx` (line 86)
- **Usage:**
  - LinkedIn link in about section social links
  - LinkedIn link in floating dock
- **How to Update:** Replace the URL in href property

---

### **LeetCode**

- **URL:** `https://leetcode.com/u/tFt4QC7qdx/`
- **Locations:**
  - `components/sections/about-section.tsx` (line 155)
  - `components/sections/footer-section.tsx` (line 90)
- **Usage:**
  - LeetCode link in about section social links
  - LeetCode link in floating dock
- **Display:** Shows as "LC" button with orange color
- **How to Update:** Replace the URL in href property

---

### **Email**

- **Type:** mailto link
- **URL:** `mailto:pranav.dabhi9969@gmail.com`
- **Locations:**
  - `components/sections/about-section.tsx` (line 152)
  - `components/sections/footer-section.tsx` (line 88)
- **Usage:**
  - Opens default email client when clicked
  - Send form submissions to this email
- **How to Update:** Replace email address in:
  1. href property: `mailto:your-email@example.com`
  2. Form recipient: Line 64 in `footer-section.tsx`: `fd.set("to", "your-email@example.com")`

---

### **Phone**

- **Type:** tel link
- **URL:** `tel:+919737286699`
- **Location:** `components/sections/footer-section.tsx` (line 89)
- **Usage:** Opens phone dialer on mobile devices
- **How to Update:** Replace phone number in href property
- **Format:** `tel:+[country code][number]`

---

## **File Assets**

### **Resume/CV**

- **Type:** PDF Download
- **Path:** `/resume.pdf`
- **Location:** `components/sections/footer-section.tsx` (line 84)
- **Usage:** Download resume button in floating dock
- **File Location:** `public/resume.pdf`
- **How to Update:**
  1. Replace file: `public/resume.pdf`
  2. Or change href path if using different location

---

## **External API/Service Links**

### **Web3Forms API** (Email Service)

- **Endpoint:** `https://api.web3forms.com/submit`
- **Location:** `components/sections/footer-section.tsx` (line 52)
- **Usage:** Contact form email submission
- **Method:** POST request with FormData
- **Authentication:** Via `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` environment variable
- **Configuration:** Set in `.env.local`
- **How to Update:**
  1. Get new Web3Forms Access Key from https://web3forms.com
  2. Add to `.env.local`: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key`

---

### **Google Generative AI** (Chatbot)

- **Service:** Google Gemini API
- **Location:** `components/features/floating-assistant.tsx`
- **Usage:** Powers the AI chatbot assistant
- **Configuration:** Requires Google API key in environment
- **How to Update:**
  1. Get API key from Google Cloud Console
  2. Add to environment variables
  3. Update component configuration

---

### **OpenGraph Image** (Social Preview)

- **URL:** `/icon.png`
- **Location:** `app/layout.tsx` (line 20)
- **Usage:** When sharing on social media
- **Size:** 192x192 pixels
- **How to Update:** Replace `public/icon.png` with your image

---

## **Internal Navigation Links**

### **Navbar Section Links**

- **Location:** `components/navigation/resizable-navbar.tsx`
- **Links Format:** `href="#section-id"`
- **Examples:**
  - `#about` → About section
  - `#projects` → Projects section
  - `#contact` → Contact section
- **How to Update:** Change section IDs if renamed

---

## **Form Configuration**

### **Contact Form**

- **Location:** `components/sections/footer-section.tsx`

#### **Form Recipient Email**

- **Line:** 64
- **Current:** `pranav.dabhi9969@gmail.com`
- **Code:** `fd.set("to", "pranav.dabhi9969@gmail.com")`
- **Purpose:** Where contact form submissions are sent

#### **Form Subject Line**

- **Line:** 63
- **Current:** `Portfolio Contact - {reason}`
- **Code:** ``fd.set("subject", `Portfolio Contact - ${subjectEl}`)``
- **Purpose:** Email subject for form submissions

#### **Form Subject Options**

- **Location:** Contact form select element
- **Current Options:**
  1. General Inquiry
  2. Collaboration Opportunity
  3. Freelance Project
  4. Technical Discussion
  5. Job Opportunity
  6. Feedback
  7. Bug Report
  8. Other
- **How to Update:** Add/remove options in the select element

---

## **Complete Link Reference Table**

| Link Type       | URL                                                  | File               | Line | Purpose         |
| --------------- | ---------------------------------------------------- | ------------------ | ---- | --------------- |
| GitHub          | `https://github.com/PranavAD36`                      | about-section.tsx  | 150  | Social link     |
| GitHub          | `https://github.com/PranavAD36`                      | footer-section.tsx | 87   | Floating dock   |
| LinkedIn        | `https://www.linkedin.com/in/dabhi-pranav-129b05331` | about-section.tsx  | 151  | Social link     |
| LinkedIn        | `https://www.linkedin.com/in/dabhi-pranav-129b05331` | footer-section.tsx | 86   | Floating dock   |
| LeetCode        | `https://leetcode.com/u/tFt4QC7qdx/`                 | about-section.tsx  | 155  | Social link     |
| LeetCode        | `https://leetcode.com/u/tFt4QC7qdx/`                 | footer-section.tsx | 90   | Floating dock   |
| Email           | `mailto:pranav.dabhi9969@gmail.com`                  | about-section.tsx  | 152  | Social link     |
| Email           | `mailto:pranav.dabhi9969@gmail.com`                  | footer-section.tsx | 88   | Floating dock   |
| Email Recipient | `pranav.dabhi9969@gmail.com`                         | footer-section.tsx | 64   | Form submission |
| Phone           | `tel:+919737286699`                                  | footer-section.tsx | 89   | Floating dock   |
| Resume          | `/resume.pdf`                                        | footer-section.tsx | 84   | Download link   |
| Web3Forms API   | `https://api.web3forms.com/submit`                   | footer-section.tsx | 52   | Email service   |

---

## **How to Update All Links at Once**

### **Search and Replace Steps:**

1. Open VS Code search (Ctrl+Shift+F)
2. Search for the old link/email/phone
3. Replace all occurrences with new value
4. Verify changes across files

### **Example: Updating Email**

1. Search: `pranav.dabhi9969@gmail.com`
2. Replace with: `your-new-email@example.com`
3. Update in both about section and footer section
4. Test form submission

### **Example: Updating Phone**

1. Search: `+919737286699`
2. Replace with: `+1234567890` (your number)
3. Update in footer-section.tsx
4. Test phone link

---

## **Environment Variables for Links**

### **Web3Forms Access Key** (Email Service)

- **File:** `.env.local` (NOT committed to git)
- **Variable:** `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
- **Value:** Your Web3Forms access key
- **Template:** See `.env.example`
- **Where Used:** `components/sections/footer-section.tsx` (line 23)

### **Future Environment Variables** (if adding)

- Google Generative AI API Key
- Analytics tracking IDs
- Third-party service keys

---

## **Link Testing Checklist**

- [ ] GitHub link opens your GitHub profile
- [ ] LinkedIn link opens your LinkedIn profile
- [ ] LeetCode link opens your LeetCode profile
- [ ] Email link opens email client
- [ ] Phone link triggers dial on mobile
- [ ] Resume link downloads PDF
- [ ] Contact form sends to correct email
- [ ] Web3Forms API key is working
- [ ] All social links in about section work
- [ ] All social links in floating dock work
- [ ] Navigation links scroll to correct sections

---

## **Adding New External Links**

### **To Add a New Social Link:**

1. **Choose file location:**
   - About section: `components/sections/about-section.tsx`
   - Or Footer section: `components/sections/footer-section.tsx`

2. **Add SocialLink component (about section):**

   ```jsx
   <SocialLink href="https://your-link.com" icon={<YourIcon />} />
   ```

3. **Add to floating dock (footer section):**

   ```jsx
   {
     title: "Link Name",
     icon: <IconComponent />,
     href: "https://your-link.com"
   }
   ```

4. **Import icon if new:**
   ```jsx
   import { IconName } from "@tabler/icons-react";
   // or
   import { IconName } from "lucide-react";
   ```

### **To Add a New External API:**

1. Add service endpoint URL
2. Create environment variable if authentication needed
3. Add to `.env.local` and `.env.example`
4. Fetch the API in component
5. Handle response and errors

---

## **Security Best Practices**

### **Do NOT hardcode sensitive information:**

- ❌ `const key = "secret123"`
- ✅ `const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

### **Public vs. Private Keys:**

- `NEXT_PUBLIC_` prefix = exposed to browser (safe)
- No prefix = server-side only (secret)
- Email addresses are okay to show (for contact)
- Phone numbers are okay to show
- API keys should use environment variables

### **Environment File Security:**

- `.env.local` is in `.gitignore` (never committed)
- `.env.example` shows template only (no real values)
- Never commit `.env.local` with real keys

---
