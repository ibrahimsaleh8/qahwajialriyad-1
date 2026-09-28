# API Changes — Article Keywords Support

## Overview

The `keywords` field has been added to the Article create and update endpoints. Keywords are SEO-relevant strings (tags) associated with an article and are now persisted to the database and returned when fetching an article by title.

---

## Changed Endpoints

### 1. `POST /api/article` — Create Article

**What changed:** `keywords` is now accepted in the request body as an optional array of strings. If not provided, the article is created with an empty keywords array.

#### Request Body

| Field         | Type       | Required | Description                                          |
|---------------|------------|----------|------------------------------------------------------|
| `projectId`   | `string`   | ✅ Yes   | ID of the project this article belongs to            |
| `title`       | `string`   | ✅ Yes   | Article title (must be unique)                       |
| `content`     | `string`   | No       | Article body (HTML or plain text)                    |
| `coverImage`  | `string`   | No       | URL of the cover image                               |
| `categorySlug`| `string`   | No       | Slug of the target category (defaults to `خدمات-الضيافة`) |
| `keywords`    | `string[]` | No       | List of SEO keywords for the article                 |

#### Example Request

```json
POST /api/article
Content-Type: application/json

{
  "projectId": "clx123abc",
  "title": "أفضل مطاعم الرياض",
  "content": "<p>محتوى المقالة هنا...</p>",
  "categorySlug": "مطاعم",
  "keywords": ["مطاعم الرياض", "أفضل مطاعم", "أكل شعبي"]
}
```

#### Example Response

```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "article": {
      "id": "clx456def",
      "title": "أفضل مطاعم الرياض",
      "content": "<p>محتوى المقالة هنا...</p>",
      "coverImage": null,
      "keywords": ["مطاعم الرياض", "أفضل مطاعم", "أكل شعبي"],
      "status": "DRAFT",
      "projectId": "clx123abc",
      "categoryId": "clx789ghi",
      "createdAt": "2026-08-16T21:00:00.000Z",
      "updatedAt": "2026-08-16T21:00:00.000Z",
      "category": {
        "id": "clx789ghi",
        "name": "مطاعم",
        "slug": "مطاعم"
      }
    }
  }
}
```

---

### 2. `PUT /api/article/:articleId` — Update Article

**What changed:** `keywords` is now accepted in the request body as an optional array of strings. If provided, it **replaces** the existing keywords entirely. If omitted, the existing keywords are left unchanged.

#### Request Body

| Field         | Type       | Required | Description                                          |
|---------------|------------|----------|------------------------------------------------------|
| `title`       | `string`   | No       | New article title                                    |
| `content`     | `string`   | No       | New article body                                     |
| `coverImage`  | `string`   | No       | New cover image URL (`null` to remove)               |
| `categorySlug`| `string`   | No       | Slug of the new category                             |
| `keywords`    | `string[]` | No       | Replacement list of SEO keywords                     |

> **Note:** `keywords` follows a **replace** strategy — passing an empty array `[]` will clear all keywords. Omitting the field leaves keywords unchanged.

#### Example Request

```json
PUT /api/article/clx456def
Content-Type: application/json

{
  "keywords": ["مطاعم الرياض", "مأكولات سعودية", "وجبات عائلية", "أسعار معقولة"]
}
```

#### Example Response

```json
{
  "success": true,
  "message": "Article updated successfully",
  "data": {
    "article": {
      "id": "clx456def",
      "title": "أفضل مطاعم الرياض",
      "keywords": ["مطاعم الرياض", "مأكولات سعودية", "وجبات عائلية", "أسعار معقولة"],
      "category": {
        "id": "clx789ghi",
        "name": "مطاعم",
        "slug": "مطاعم"
      }
    }
  }
}
```

---

### 3. `GET /api/article/title/:title` — Get Article by Title

**What changed:** No code changes were required. The `keywords` field is a scalar column on the `Article` model and is returned automatically in the response.

#### Example Response

```json
{
  "success": true,
  "data": {
    "article": {
      "id": "clx456def",
      "title": "أفضل مطاعم الرياض",
      "content": "<p>محتوى المقالة هنا...</p>",
      "coverImage": null,
      "keywords": ["مطاعم الرياض", "أفضل مطاعم", "أكل شعبي"],
      "status": "DRAFT",
      "projectId": "clx123abc",
      "categoryId": "clx789ghi",
      "createdAt": "2026-08-16T21:00:00.000Z",
      "updatedAt": "2026-08-16T21:00:00.000Z",
      "category": {
        "id": "clx789ghi",
        "name": "مطاعم",
        "slug": "مطاعم"
      }
    }
  }
}
```

---

## Behaviour Summary

| Endpoint                          | `keywords` behaviour                                             |
|-----------------------------------|------------------------------------------------------------------|
| `POST /api/article`               | Optional. Defaults to `[]` if omitted.                          |
| `PUT /api/article/:articleId`     | Optional. Replaces existing keywords if provided; skipped if omitted. |
| `GET /api/article/title/:title`   | Always returned in the response (no change needed).             |

---

## Files Modified

| File | Change |
|------|--------|
| [`src/routes.ts`](./src/routes.ts) | Added `keywords` to `POST /api/article` and `PUT /api/article/:articleId` |
