# AI Articles API — Frontend Integration Guide

> All AI endpoints are **admin-only** and require a valid JWT token (via cookie or `Authorization` header).  
> Base path: `/api/admin/articles`

---

## Authentication

Every request to these endpoints must include the admin token in one of two ways:

| Method | How |
|--------|-----|
| **Cookie** | The `token` cookie set automatically after `POST /api/admin/login` |
| **Header** | `Authorization: Bearer <token>` |

If the token is missing or invalid the API returns `401 Unauthorized`.

---

## Endpoints

### 1. Generate Article with AI

**`POST /api/admin/articles/ai-generate`**

Generates a full Arabic SEO article from a title and category using OpenAI. The article is saved as a **DRAFT** and returned immediately.

#### Request Body

```json
{
  "title": "أفضل خدمات القهوة العربية في الرياض",
  "categoryId": "clx1abc2def3ghi4jkl",
  "description": "اكتب عن خدمات القهوة العربية للمناسبات الرسمية والخاصة"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | ✅ | Raw article title (used as the AI prompt seed) |
| `categoryId` | `string` | ✅ | ID of an existing `Category` record |
| `description` | `string` | ❌ | Optional extra context / instructions for the AI |

#### Success Response — `201 Created`

```json
{
  "success": true,
  "message": "Article generated and saved as draft.",
  "data": {
    "id": "clx1abc2def3ghi4jkl",
    "title": "أفضل خدمات القهوة العربية للمناسبات في الرياض",
    "content": "<h2>مقدمة</h2><p>...</p>",
    "description": "اكتب عن خدمات القهوة العربية للمناسبات الرسمية والخاصة",
    "keywords": ["قهوة عربية", "ضيافة الرياض", "مناسبات"],
    "status": "DRAFT",
    "categoryId": "clx1abc2def3ghi4jkl",
    "projectId": "clx0prj...",
    "createdAt": "2026-08-16T18:00:00.000Z",
    "updatedAt": "2026-08-16T18:00:00.000Z",
    "category": {
      "id": "clx1abc2def3ghi4jkl",
      "name": "خدمات الضيافة",
      "slug": "خدمات-الضيافة"
    }
  }
}
```

#### What the AI produces

- **Improved title** — SEO-optimised Arabic title
- **Content** — Full article body as clean semantic HTML (minimum 600 words), using `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<strong>`, `<blockquote>` — ready to be inserted into a Tiptap editor
- **Keywords** — 5–10 Arabic SEO keywords array

#### Error Responses

| Status | Reason |
|--------|--------|
| `400` | `title` is missing |
| `400` | `categoryId` is missing |
| `400` | `description` is not a string |
| `401` | Missing or invalid token |
| `404` | Category not found |
| `502` | OpenAI returned an unexpected response |
| `500` | Internal server error |

---

### 2. Improve Existing Article with AI

**`POST /api/admin/articles/:id/ai-improve`**

Takes an existing article by ID, sends its current content to OpenAI for SEO improvements, and **overwrites** the article's `content` and `keywords` in-place. Returns the updated article.

#### URL Parameters

| Param | Type | Description |
|-------|------|-------------|
| `id` | `string` | The article's database ID |

#### Request Body

_No body required._ The endpoint reads the article from the database automatically.

#### Success Response — `200 OK`

```json
{
  "success": true,
  "message": "Article content improved.",
  "data": {
    "id": "clx1abc2def3ghi4jkl",
    "title": "أفضل خدمات القهوة العربية للمناسبات في الرياض",
    "content": "<h2>مقدمة محسّنة</h2><p>...</p>",
    "keywords": ["قهوة عربية فاخرة", "ضيافة سعودية", "مناسبات الرياض"],
    "status": "DRAFT",
    "categoryId": "clx1abc2def3ghi4jkl",
    "projectId": "clx0prj...",
    "createdAt": "2026-08-16T18:00:00.000Z",
    "updatedAt": "2026-08-16T18:05:00.000Z",
    "category": {
      "id": "clx1abc2def3ghi4jkl",
      "name": "خدمات الضيافة",
      "slug": "خدمات-الضيافة"
    }
  }
}
```

#### What the AI does

- Identifies search intent from title + content
- Rewrites content for better SEO, readability and structure
- Outputs clean semantic HTML (same allowed tags as ai-generate)
- Updates the keywords array (5–10 improved Arabic SEO keywords)
- **Does NOT change the title**
- **Does NOT invent prices, statistics or business claims**

#### Error Responses

| Status | Reason |
|--------|--------|
| `401` | Missing or invalid token |
| `404` | Article not found |
| `502` | OpenAI returned an unexpected response |
| `500` | Internal server error |

---

## Frontend Integration Examples

### Using `fetch`

```ts
const BASE = "/api/admin/articles";

// Generate
async function generateArticle(title: string, categoryId: string, description?: string) {
  const res = await fetch(`${BASE}/ai-generate`, {
    method: "POST",
    credentials: "include",           // sends the token cookie automatically
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, categoryId, description }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();                  // { success, message, data: Article }
}

// Improve
async function improveArticle(articleId: string) {
  const res = await fetch(`${BASE}/${articleId}/ai-improve`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();                  // { success, message, data: Article }
}
```

### Using `axios`

```ts
import axios from "axios";

const api = axios.create({ baseURL: "/api/admin/articles", withCredentials: true });

// Generate
const { data } = await api.post("/ai-generate", { title, categoryId, description });

// Improve
const { data } = await api.post(`/${articleId}/ai-improve`);
```

---

## Content Field Notes

The `content` field returned by both endpoints is **raw semantic HTML**, not Markdown.  
It can be loaded directly into a Tiptap editor:

```ts
editor.commands.setContent(article.content);
```

---

## Environment Variables Required

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI secret key |
| `OPENAI_MODEL` | The model to use (e.g. `gpt-4o`, `o4-mini`) |
| `JWT_SECRET` | Secret used to sign/verify admin JWTs |
| `DATABASE_URL` | PostgreSQL connection string |
