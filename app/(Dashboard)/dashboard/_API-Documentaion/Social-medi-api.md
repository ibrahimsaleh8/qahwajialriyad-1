# Social Media Links API Documentation

This document provides details for the backend APIs managing social media links (Instagram, Facebook, TikTok, Twitter, YouTube) associated with a project.

---

## 1. Create Social Media Links

Create social media links for a project. Returns a conflict error if they already exist.

- **URL:** `/api/dashboard/:projectId/social-media-links`
- **Method:** `POST`
- **Auth Required:** Yes (based on dashboard access route structure)
- **Headers:** 
  - `Content-Type: application/json`

### Request Body
All fields are optional. Any omitted fields will be stored as `null`.

```json
{
  "instagram": "https://instagram.com/username",
  "facebook": "https://facebook.com/page",
  "tiktok": "https://tiktok.com/@username",
  "twitter": "https://twitter.com/username",
  "youtube": "https://youtube.com/@channel"
}
```

### Response

#### `201 Created`
```json
{
  "success": true,
  "message": "Social media links created successfully",
  "data": {
    "id": "cuid_value",
    "projectId": "project_id_value",
    "instagram": "https://instagram.com/username",
    "facebook": "https://facebook.com/page",
    "tiktok": "https://tiktok.com/@username",
    "twitter": "https://twitter.com/username",
    "youtube": "https://youtube.com/@channel",
    "createdAt": "2026-07-10T15:22:42.000Z",
    "updatedAt": "2026-07-10T15:22:42.000Z"
  }
}
```

#### `404 Not Found`
```json
{
  "error": "Project not found"
}
```

#### `409 Conflict`
```json
{
  "error": "Social media links already exist for this project",
  "message": "Use PUT /api/dashboard/:id/social-media-links to update them"
}
```

---

## 2. Update/Upsert Social Media Links

Updates existing links. If no links exist yet, it will create them. Only fields provided in the body will be modified; other fields will remain untouched.

- **URL:** `/api/dashboard/:projectId/social-media-links`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Headers:** 
  - `Content-Type: application/json`

### Request Body
All fields are optional.

```json
{
  "instagram": "https://instagram.com/new_username",
  "tiktok": "https://tiktok.com/@new_username"
}
```

### Response

#### `200 OK`
```json
{
  "success": true,
  "message": "Social media links updated successfully",
  "data": {
    "id": "cuid_value",
    "projectId": "project_id_value",
    "instagram": "https://instagram.com/new_username",
    "facebook": "https://facebook.com/page",
    "tiktok": "https://tiktok.com/@new_username",
    "twitter": "https://twitter.com/username",
    "youtube": "https://youtube.com/@channel",
    "createdAt": "2026-07-10T15:22:42.000Z",
    "updatedAt": "2026-07-10T15:25:00.000Z"
  }
}
```

#### `404 Not Found`
```json
{
  "error": "Project not found"
}
```

---

## 3. Get Social Media Links (Public)

Fetch social media links for a specific project. Useful for rendering social icons on the landing page/frontend site.

- **URL:** `/api/project/:projectId/social-media-links`
- **Method:** `GET`
- **Auth Required:** No

### Response

#### `200 OK`
```json
{
  "success": true,
  "data": {
    "instagram": "https://instagram.com/new_username",
    "facebook": "https://facebook.com/page",
    "tiktok": "https://tiktok.com/@new_username",
    "twitter": "https://twitter.com/username",
    "youtube": "https://youtube.com/@channel"
  }
}
```

#### `404 Not Found`
```json
{
  "error": "Social media links not found for this project"
}
```
