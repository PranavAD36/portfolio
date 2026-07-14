# API Routes & Data Fetching Guide

**Location:** `app/api/`

---

## **Available API Routes**

### **1. GitHub Mission Control** - `GET /api/mission-control/github`

**Purpose:** Fetch the real GitHub contribution calendar for the Mission Control card.

**File:** `app/api/mission-control/github/route.ts`

**Response:**

```json
{
  "username": "PranavAD36",
  "graphUrl": "data:image/svg+xml;charset=utf-8,...",
  "profileUrl": "https://github.com/PranavAD36",
  "name": "Pranav Dabhi",
  "avatar": "https://avatars.githubusercontent.com/u/229634833?v=4",
  "contributionsCount": 109
}
```

**Notes:**

- Uses GitHub’s public contribution page HTML, parsed server-side.
- No fake or random contribution values are generated.
- No tokens are exposed to the frontend.
- The card UI retains its wider, cleaner layout while keeping the contribution graph centered and full-width.
- The contribution graph now renders month labels up to the current month and avoids future-month labels.

---

### **2. GitHub Stats** - `GET /api/github-stats`

**Purpose:** Fetch real-time GitHub user statistics

**File:** `app/api/github-stats/route.ts`

**Response:**

```json
{
  "username": "PranavAD36",
  "name": "string",
  "avatar": "string (URL)",
  "bio": "string",
  "profileUrl": "string (GitHub URL)",
  "publicRepos": "number",
  "followers": "number",
  "following": "number",
  "publicReposCount": "number",
  "totalStars": "number",
  "topLanguages": [{ "language": "string", "count": "number" }],
  "company": "string or null",
  "location": "string or null",
  "email": "string or null",
  "blog": "string or null",
  "created_at": "ISO timestamp",
  "updated_at": "ISO timestamp"
}
```

**Error Response:**

```json
{
  "error": "Failed to fetch GitHub stats",
  "fallback": {
    "username": "PranavAD36",
    "publicRepos": 0,
    "followers": 0,
    "following": 0,
    "totalStars": 0,
    "topLanguages": []
  }
}
```

**Configuration:**

- **Username:** `app/api/github-stats/route.ts` line 5
- **Cache Duration:** 3600 seconds (1 hour)
- **Authentication:** Optional `GITHUB_TOKEN` env variable

---

### **2. LeetCode Stats** - `GET /api/leetcode-stats`

**Purpose:** Fetch real-time LeetCode user statistics

**File:** `app/api/leetcode-stats/route.ts`

**Response:**

```json
{
  "username": "tFt4QC7qdx",
  "name": "string",
  "profileUrl": "string (LeetCode URL)",
  "totalSolved": "number",
  "easyCount": "number",
  "mediumCount": "number",
  "hardCount": "number",
  "topLanguages": [{ "language": "string", "count": "number" }],
  "streak": "number",
  "totalActiveDays": "number",
  "badgeCount": "number",
  "bio": "string",
  "school": "string or null",
  "skillTags": "array of strings"
}
```

**Error Response:**

```json
{
  "error": "Failed to fetch LeetCode stats",
  "message": "string (error reason)",
  "fallback": {
    "username": "tFt4QC7qdx",
    "totalSolved": 0,
    "easyCount": 0,
    "mediumCount": 0,
    "hardCount": 0,
    "topLanguages": [],
    "streak": 0,
    "badgeCount": 0
  }
}
```

**Configuration:**

- **Username:** `app/api/leetcode-stats/route.ts` line 6
- **Cache Duration:** 3600 seconds (1 hour)
- **Authentication:** None (uses public GraphQL endpoint)

---

## **Placeholder Features**

These features are ready to be connected to APIs when they become available:

### **1. GitHub Contribution Graph** 📊

**Status:** ⏳ Placeholder  
**File:** Not yet created  
**Why Placeholder:** GitHub REST API doesn't expose contribution graph in structured format

**Future Implementation:**

- Use GitHub user's public contribution graph image
- Display as calendar heatmap
- Show yearly contributions
- Link to GitHub profile

**Code Example (future):**

```typescript
const contributionGraphUrl = `https://ghchart.radekmie.pl/PranavAD36`;
```

---

### **2. Commit Statistics** 📈

**Status:** ⏳ Placeholder  
**File:** Not yet created  
**Why Placeholder:** Requires authentication token (security concern)

**Future Implementation:**

- Fetch from authenticated GitHub API
- Show commits this year
- Show commits this month
- Show top commit days

**Note:** Would require more secure token handling

---

### **3. Repository Details** 🏷️

**Status:** ⏳ Placeholder  
**File:** Not yet created  
**Why Placeholder:** Currently showing top languages, could show per-repo breakdown

**Future Implementation:**

- Show most forked repositories
- Show most starred repositories
- Show recently updated projects
- Interactive repo explorer

---

### **4. LeetCode Rating/Ranking** 🏆

**Status:** ⏳ Placeholder (Data available, UI not created)  
**File:** Partially in `leetcode-stats/route.ts`  
**Why Placeholder:** API returns data but component doesn't display it

**Available Data:**

- Contest badge/rating (in API response)
- Ranking percentile
- Achievement medals

**Future Implementation:**

- Display in stats section
- Show rating trend over time
- Compare with other users (optional)

---

### **5. Real-time Data Updates** 🔄

**Status:** ⏳ Placeholder (Currently using ISR)  
**File:** Potential: `app/api/webhook/github-push`  
**Why Placeholder:** Current implementation uses 1-hour caching

**Future Implementation:**

- GitHub webhooks for real-time updates
- Immediate data refresh on push events
- WebSocket connection for live updates
- Activity feed component

---

### **6. Contribution Streak Calendar** 📅

**Status:** ⏳ Placeholder (LeetCode data available, GitHub not)  
**File:** Not yet created  
**Why Placeholder:** GitHub API doesn't expose day-by-day data easily

**Available Data:**

- LeetCode has streaks and total active days
- GitHub has contribution graph (visual only)

**Future Implementation:**

- Interactive calendar view
- Heatmap visualization
- Streak statistics

---

### **7. Language Proficiency Charts** 📊

**Status:** ⏳ Placeholder (Data available, advanced UI not created)  
**File:** `stats-section.tsx` shows text list  
**Why Placeholder:** Could show visual charts/graphs

**Current Display:**

- Simple list with counts

**Future Implementation:**

- Pie chart of language distribution
- Skill level indicators
- Proficiency ratings per language
- Interactive language selector

---

### **8. Activity Timeline** 📝

**Status:** ⏳ Placeholder  
**File:** Not yet created  
**Why Placeholder:** Complex feature requiring multiple data sources

**Future Implementation:**

- Show recent GitHub commits
- Show recent LeetCode solutions
- Combined activity feed
- Filterable by type/date range

---

## **API Integration Checklist**

### **GitHub API**

- ✅ User stats working
- ✅ Repositories data fetching
- ✅ Top languages calculation
- ⏳ Contributions graph (ready to add)
- ⏳ Commit history (needs token)
- ⏳ Real-time webhook (ready to add)

### **LeetCode API**

- ✅ Problem stats working
- ✅ Difficulty breakdown working
- ✅ Language stats working
- ✅ Streak data available
- ✅ Badge count available
- ⏳ Rating/ranking display (ready to add)
- ⏳ Recent submissions list (ready to add)

---

## **How to Connect Placeholders**

### **Step 1: Create New Component**

```typescript
// components/sections/new-feature.tsx
export default function NewFeature() {
  // Fetch data
  // Render component
}
```

### **Step 2: Add to Page**

```typescript
// app/page.tsx
import NewFeature from "@/components/sections/new-feature";

// In JSX:
<NewFeature />
```

### **Step 3: Style with Existing Theme**

- Use Tailwind classes matching portfolio theme
- Use Framer Motion for animations
- Follow glassmorphism pattern
- Responsive design (mobile first)

### **Step 4: Error Handling**

- Add loading states
- Add error fallback UI
- Log errors to console
- Don't break page on API failures

---

## **Data Caching Strategy**

### **Current: ISR (Incremental Static Regeneration)**

**Pros:**

- ✅ Fast static pages
- ✅ Automatic updates every hour
- ✅ No database needed
- ✅ Works without API key

**Cons:**

- ❌ 1-hour delay between updates
- ❌ Not real-time

**Code:**

```typescript
next: {
  revalidate: 3600;
} // 1 hour
```

### **Future: WebSocket (Real-time)**

**Pros:**

- ✅ Real-time data updates
- ✅ Live activity feed possible
- ✅ Instant GitHub push updates

**Cons:**

- ❌ More complex backend
- ❌ Requires persistent connection
- ❌ Higher server cost

---

## **Security Considerations**

### **Current Setup:**

- ✅ No sensitive data exposed to browser
- ✅ API keys only server-side
- ✅ Public API endpoints only
- ✅ Rate limiting protected by GitHub/LeetCode

### **GitHub Token Safety:**

- Only in `.env` (not committed)
- Read-only permissions recommended
- Rate limit improvement only
- Never exposed to client

### **LeetCode:**

- Uses public GraphQL endpoint
- No authentication required
- No sensitive data exposed

---

## **Rate Limiting**

### **GitHub API (without token)**

- 60 requests/hour per IP
- Enough for hourly refresh

### **GitHub API (with token)**

- 5000 requests/hour per IP
- More than enough for any use case

### **LeetCode API**

- No official rate limit documented
- Respectful usage recommended
- 1-hour cache prevents abuse

---

## **Debugging API Issues**

### **1. Check API Response**

```bash
# Terminal
curl http://localhost:3000/api/github-stats
curl http://localhost:3000/api/leetcode-stats
```

### **2. Browser Console**

```javascript
// JavaScript console (F12 → Console)
fetch("/api/github-stats")
  .then((r) => r.json())
  .then(console.log);
```

### **3. Check Network Tab**

- F12 → Network tab
- Look for API calls
- Check status codes
- Review response bodies

### **4. Enable Verbose Logging**

Both API routes log errors:

```typescript
console.error("GitHub API error:", error);
```

---

## **Performance Optimization**

### **Current:**

- API calls: ~500ms per call
- Cache: 1 hour (3600s)
- Bundle size increase: ~15KB gzipped

### **Optimization Opportunities:**

1. Add Database caching
2. Implement Redis for faster caching
3. Batch API calls
4. Add service worker for offline support
5. Compress API responses

---

## **Testing APIs**

### **Unit Tests**

```typescript
// Example test
describe("GitHub Stats API", () => {
  it("should return user stats", async () => {
    const response = await fetch("/api/github-stats");
    const data = await response.json();
    expect(data.username).toBe("PranavAD36");
  });
});
```

### **Integration Tests**

- Test actual API responses
- Verify data structure
- Check error handling
- Verify caching behavior

---

## **Future API Additions**

- Twitter/X API integration
- CodeWars API integration
- HackerRank API integration
- Blog RSS feed
- Newsletter subscriber count
- GitHub Sponsors count
- Open source contributions breakdown

---

**Last Updated:** 2026-07-14
