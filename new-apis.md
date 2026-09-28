# Page Section API Documentation

This document describes the **Page Section** endpoints added to the Qahwajige backend.

---

## Data Model

| Field                | Type                          | Required | Description                                                      |
|----------------------|-------------------------------|----------|------------------------------------------------------------------|
| `id`                 | `string` (CUID)               | auto     | Unique identifier                                                |
| `projectId`          | `string`                      | auto     | The owning project (from URL param)                              |
| `title`              | `string`                      | ✅       | Section heading                                                  |
| `contentType`        | `"CONTENT"` \| `"KEYWORDS"`   | ✅       | Determines section type (default: `CONTENT`)                     |
| `content`            | `string \| null`              | ❌       | Plain text/HTML content — used when `contentType = CONTENT`      |
| `image`              | `string \| null`              | ❌       | Image URL for the section                                        |
| `keyword`            | `string \| null`              | ⚠️       | Target keyword — **required** when `contentType = KEYWORDS`      |
| `keywordDescription` | `string \| null`              | ❌       | Description of the keyword — used when `contentType = KEYWORDS`  |
| `createdAt`          | `DateTime`                    | auto     | Creation timestamp                                               |
| `updatedAt`          | `DateTime`                    | auto     | Last update timestamp                                            |

> **Content Type rules:**
> - `CONTENT` — fill `content` (and optionally `image`). `keyword` / `keywordDescription` are ignored.
> - `KEYWORDS` — `keyword` is **required**. `keywordDescription` is optional. `content` is ignored.

---

## Endpoints

### 1. Create a Page Section

**`POST /api/dashboard/:id/page-sections`**

Creates a new page section belonging to the given project.

#### URL Parameters

| Param | Description       |
|-------|-------------------|
| `id`  | Project ID (CUID) |

#### Request Body

```json
{
  "title": "Why Choose Arabic Coffee?",
  "contentType": "CONTENT",
  "content": "Arabic coffee is a symbol of hospitality...",
  "image": "https://example.com/coffee.jpg"
}
```

| Field                | Type     | Required | Notes                                          |
|----------------------|----------|----------|------------------------------------------------|
| `title`              | `string` | ✅       |                                                |
| `contentType`        | `string` | ❌       | `CONTENT` (default) or `KEYWORDS`              |
| `content`            | `string` | ❌       | Use when `contentType = CONTENT`               |
| `image`              | `string` | ❌       | Image URL                                      |
| `keyword`            | `string` | ⚠️       | Required when `contentType = KEYWORDS`         |
| `keywordDescription` | `string` | ❌       | Use when `contentType = KEYWORDS`              |

#### Responses

**`201 Created`**
```json
{
  "success": true,
  "message": "Page section created successfully",
  "data": {
    "id": "clx...",
    "projectId": "clx...",
    "title": "Why Choose Arabic Coffee?",
    "contentType": "CONTENT",
    "content": "Arabic coffee is a symbol of hospitality...",
    "image": "https://example.com/coffee.jpg",
    "keyword": null,
    "keywordDescription": null,
    "createdAt": "2026-08-25T18:00:00.000Z",
    "updatedAt": "2026-08-25T18:00:00.000Z"
  }
}
```

**`400 Bad Request`** — Missing `title`, invalid `contentType`, or missing `keyword` when type is `KEYWORDS`

**`404 Not Found`** — Project not found

---

### 2. Update a Page Section

**`PUT /api/dashboard/:id/page-sections/:sectionId`**

Updates one or more fields of a page section.

#### URL Parameters

| Param       | Description          |
|-------------|----------------------|
| `id`        | Project ID (CUID)    |
| `sectionId` | Page Section ID (CUID) |

#### Request Body

Send only the fields you want to update:

```json
{
  "contentType": "KEYWORDS",
  "keyword": "قهوة عربية",
  "keywordDescription": "خدمة القهوة العربية الأصيلة في الرياض"
}
```

#### Responses

**`200 OK`**
```json
{
  "success": true,
  "message": "Page section updated successfully",
  "data": { "...updatedSection": "..." }
}
```

**`400 Bad Request`** — No fields provided, or invalid `contentType`

**`404 Not Found`** — Section not found for this project

---

### 3. Delete a Page Section

**`DELETE /api/dashboard/:id/page-sections/:sectionId`**

Permanently deletes a page section.

#### URL Parameters

| Param       | Description          |
|-------------|----------------------|
| `id`        | Project ID (CUID)    |
| `sectionId` | Page Section ID (CUID) |

#### Responses

**`200 OK`**
```json
{
  "success": true,
  "message": "Page section deleted successfully"
}
```

**`404 Not Found`** — Section not found for this project

---

### 4. Get All Page Sections

**`GET /api/project/:id/page-sections`**

Returns all page sections for a project, ordered by creation date (oldest first).

> Public route — no authentication required.

#### URL Parameters

| Param | Description       |
|-------|-------------------|
| `id`  | Project ID (CUID) |

#### Response

**`200 OK`**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "projectId": "clx...",
      "title": "Why Choose Arabic Coffee?",
      "contentType": "CONTENT",
      "content": "Arabic coffee is a symbol of hospitality...",
      "image": "https://example.com/coffee.jpg",
      "keyword": null,
      "keywordDescription": null,
      "createdAt": "2026-08-25T18:00:00.000Z",
      "updatedAt": "2026-08-25T18:00:00.000Z"
    },
    {
      "id": "cly...",
      "projectId": "clx...",
      "title": "Top Searched Keywords",
      "contentType": "KEYWORDS",
      "content": null,
      "image": null,
      "keyword": "قهوة عربية الرياض",
      "keywordDescription": "خدمة القهوة العربية الأصيلة في الرياض للمناسبات",
      "createdAt": "2026-08-25T18:05:00.000Z",
      "updatedAt": "2026-08-25T18:05:00.000Z"
    }
  ]
}
```

---

### 5. Get a Single Page Section

**`GET /api/project/:id/page-sections/:sectionId`**

Returns a single page section by ID.

> Public route — no authentication required.

#### URL Parameters

| Param       | Description          |
|-------------|----------------------|
| `id`        | Project ID (CUID)    |
| `sectionId` | Page Section ID (CUID) |

#### Responses

**`200 OK`**
```json
{
  "success": true,
  "data": { "...section": "..." }
}
```

**`404 Not Found`** — Section not found for this project

---

## Error Format

All error responses follow this shape:

```json
{
  "error": "Short error label",
  "message": "Human-readable explanation"
}
```

---

## Summary Table

| Method   | URL                                                  | Auth | Description              |
|----------|------------------------------------------------------|------|--------------------------|
| `POST`   | `/api/dashboard/:id/page-sections`                   | ❌   | Create a page section    |
| `PUT`    | `/api/dashboard/:id/page-sections/:sectionId`        | ❌   | Update a page section    |
| `DELETE` | `/api/dashboard/:id/page-sections/:sectionId`        | ❌   | Delete a page section    |
| `GET`    | `/api/project/:id/page-sections`                     | ❌   | Get all page sections    |
| `GET`    | `/api/project/:id/page-sections/:sectionId`          | ❌   | Get a single page section|

> **Note:** Dashboard write routes (`POST`, `PUT`, `DELETE`) follow the same path prefix as `customSection`. Add `authenticateAdmin` middleware if you want to protect them in the future.

---

## Changes to `GET /api/project/:id/main-data`

### 1. `customSections` — Added `image` field

The `customSections` select now includes the `image` field:

```ts
customSections: {
  select: {
    id: true,
    title: true,
    description: true,
    cards: true,
    image: true,  // ✅ NEW
  },
},
```

Each item in `customSections[]` now includes:

| Field         | Type             | Description                  |
| ------------- | ---------------- | ---------------------------- |
| `id`          | `string`         | Section ID                   |
| `title`       | `string`         | Section title                |
| `description` | `string \| null` | Section description          |
| `cards`       | `Json`           | Cards data                   |
| `image`       | `string \| null` | ✅ NEW — Optional image URL  |

---

### 2. `pageSections` — New include

`pageSections` is now fetched and returned at the top level of the response:

```ts
pageSections: {
  select: {
    id: true,
    title: true,
    image: true,
    content: true,
    contentType: true,
    keyword: true,
    keywordDescription: true,
  },
},
```

| Field                | Type                      | Description                             |
| -------------------- | ------------------------- | --------------------------------------- |
| `id`                 | `string`                  | Section ID                              |
| `title`              | `string`                  | Section title                           |
| `image`              | `string \| null`          | Optional image URL                      |
| `content`            | `string \| null`          | Section content text                    |
| `contentType`        | `"CONTENT" \| "KEYWORDS"` | Type of content in this section         |
| `keyword`            | `string \| null`          | Primary keyword                         |
| `keywordDescription` | `string \| null`          | Description associated with the keyword |

The response shape now includes `pageSections` at the top level:

```json
{
  "...",
  "customSections": [{ "id": "...", "title": "...", "description": "...", "cards": {}, "image": "..." }],
  "showContactSection": true,
  "pageSections": [
    {
      "id": "...",
      "title": "...",
      "image": "...",
      "content": "...",
      "contentType": "CONTENT",
      "keyword": null,
      "keywordDescription": null
    }
  ]
}
```

---

---

# Custom Section API Documentation

This document describes the **Custom Section** and **Custom Section Card** endpoints in the Qahwajige backend.

> **Change:** The `CustomSection` model now includes an `image` field (`String?`), added in a recent schema migration.

---

## Data Models

### CustomSection

| Field         | Type                  | Required | Description                                  |
|---------------|-----------------------|----------|----------------------------------------------|
| `id`          | `string` (CUID)       | auto     | Unique identifier                            |
| `projectId`   | `string`              | auto     | The owning project (from URL param)          |
| `title`       | `string`              | ✅       | Section heading                              |
| `description` | `string`              | ✅       | Section body text                            |
| `image`       | `string \| null`      | ❌       | ✅ NEW — Optional image URL for the section  |
| `cards`       | `CustomSectionCard[]` | ❌       | Related cards (nested)                       |
| `createdAt`   | `DateTime`            | auto     | Creation timestamp                           |
| `updatedAt`   | `DateTime`            | auto     | Last update timestamp                        |

### CustomSectionCard

| Field         | Type             | Required | Description           |
|---------------|------------------|----------|-----------------------|
| `id`          | `string` (CUID)  | auto     | Unique identifier     |
| `sectionId`   | `string`         | auto     | Parent section ID     |
| `title`       | `string`         | ✅       | Card heading          |
| `description` | `string`         | ✅       | Card body text        |
| `icon`        | `string \| null` | ❌       | Icon identifier / URL |
| `createdAt`   | `DateTime`       | auto     | Creation timestamp    |
| `updatedAt`   | `DateTime`       | auto     | Last update timestamp |

---

## Custom Section Endpoints

### 1. Create a Custom Section

**`POST /api/dashboard/:id/custom-sections`**

Creates a new custom section for the given project. Cards can be supplied inline.

#### URL Parameters

| Param | Description       |
|-------|-------------------|
| `id`  | Project ID (CUID) |

#### Request Body

```json
{
  "title": "Our Story",
  "description": "A brief history of our brand.",
  "image": "https://example.com/story.jpg",
  "cards": [
    { "title": "Quality", "description": "Top-grade ingredients", "icon": "star" }
  ]
}
```

| Field         | Type     | Required | Notes                                      |
|---------------|----------|----------|--------------------------------------------|
| `title`       | `string` | ✅       |                                            |
| `description` | `string` | ✅       |                                            |
| `image`       | `string` | ❌       | ✅ NEW — Optional image URL                |
| `cards`       | `array`  | ❌       | Array of `{ title, description, icon? }`  |

#### Responses

**`201 Created`**
```json
{
  "success": true,
  "message": "Custom section created successfully",
  "data": {
    "id": "clx...",
    "projectId": "clx...",
    "title": "Our Story",
    "description": "A brief history of our brand.",
    "image": "https://example.com/story.jpg",
    "createdAt": "2026-08-25T18:00:00.000Z",
    "updatedAt": "2026-08-25T18:00:00.000Z",
    "cards": [
      {
        "id": "clx...",
        "sectionId": "clx...",
        "title": "Quality",
        "description": "Top-grade ingredients",
        "icon": "star",
        "createdAt": "2026-08-25T18:00:00.000Z",
        "updatedAt": "2026-08-25T18:00:00.000Z"
      }
    ]
  }
}
```

**`400 Bad Request`** — Missing `title` or `description`

**`404 Not Found`** — Project not found

---

### 2. Update a Custom Section

**`PUT /api/dashboard/:id/custom-sections/:sectionId`**

Updates the `title`, `description`, and/or `image` of an existing custom section.

#### URL Parameters

| Param       | Description              |
|-------------|--------------------------|
| `id`        | Project ID (CUID)        |
| `sectionId` | Custom Section ID (CUID) |

#### Request Body

Send only the fields you want to update:

```json
{
  "image": "https://example.com/new-image.jpg"
}
```

| Field         | Type     | Required | Notes        |
|---------------|----------|----------|--------------|
| `title`       | `string` | ❌       |              |
| `description` | `string` | ❌       |              |
| `image`       | `string` | ❌       | ✅ NEW field |

#### Responses

**`200 OK`**
```json
{
  "success": true,
  "message": "Custom section updated successfully",
  "data": { "...updatedSection": "..." }
}
```

**`400 Bad Request`** — No fields provided (must supply at least one of `title`, `description`, `image`)

**`404 Not Found`** — Section not found for this project

---

### 3. Delete a Custom Section

**`DELETE /api/dashboard/:id/custom-sections/:sectionId`**

Permanently deletes a custom section and all its cards (cascade delete).

#### URL Parameters

| Param       | Description              |
|-------------|--------------------------|
| `id`        | Project ID (CUID)        |
| `sectionId` | Custom Section ID (CUID) |

#### Responses

**`200 OK`**
```json
{
  "success": true,
  "message": "Custom section deleted successfully"
}
```

**`404 Not Found`** — Section not found for this project

---

### 4. Get All Custom Sections

**`GET /api/project/:id/custom-sections`**

Returns all custom sections (with their cards) for a project, ordered by creation date (oldest first).

> Public route — no authentication required.

#### URL Parameters

| Param | Description       |
|-------|-------------------|
| `id`  | Project ID (CUID) |

#### Response

**`200 OK`**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "projectId": "clx...",
      "title": "Our Story",
      "description": "A brief history of our brand.",
      "image": "https://example.com/story.jpg",
      "createdAt": "2026-08-25T18:00:00.000Z",
      "updatedAt": "2026-08-25T18:00:00.000Z",
      "cards": []
    }
  ]
}
```

---

## Custom Section Card Endpoints

### 5. Create a Card

**`POST /api/dashboard/:id/custom-sections/:sectionId/cards`**

Adds a new card to an existing custom section.

#### URL Parameters

| Param       | Description              |
|-------------|--------------------------|
| `id`        | Project ID (CUID)        |
| `sectionId` | Custom Section ID (CUID) |

#### Request Body

```json
{
  "title": "Quality",
  "description": "Top-grade ingredients",
  "icon": "star"
}
```

| Field         | Type     | Required | Notes           |
|---------------|----------|----------|-----------------|
| `title`       | `string` | ✅       |                 |
| `description` | `string` | ✅       |                 |
| `icon`        | `string` | ❌       | Icon identifier |

#### Responses

**`201 Created`**
```json
{
  "success": true,
  "message": "Card created successfully",
  "data": {
    "id": "clx...",
    "sectionId": "clx...",
    "title": "Quality",
    "description": "Top-grade ingredients",
    "icon": "star",
    "createdAt": "2026-08-25T18:00:00.000Z",
    "updatedAt": "2026-08-25T18:00:00.000Z"
  }
}
```

**`400 Bad Request`** — Missing `title` or `description`

**`404 Not Found`** — Custom section not found for this project

---

### 6. Update a Card

**`PUT /api/dashboard/:id/custom-sections/:sectionId/cards/:cardId`**

Updates the `title`, `description`, and/or `icon` of a card.

#### URL Parameters

| Param       | Description              |
|-------------|--------------------------|
| `id`        | Project ID (CUID)        |
| `sectionId` | Custom Section ID (CUID) |
| `cardId`    | Card ID (CUID)           |

#### Request Body

Send only the fields you want to update:

```json
{
  "icon": "trophy"
}
```

#### Responses

**`200 OK`**
```json
{
  "success": true,
  "message": "Card updated successfully",
  "data": { "...updatedCard": "..." }
}
```

**`400 Bad Request`** — No fields provided (must supply at least one of `title`, `description`, `icon`)

**`404 Not Found`** — Card not found for this section / project

---

### 7. Delete a Card

**`DELETE /api/dashboard/:id/custom-sections/:sectionId/cards/:cardId`**

Permanently deletes a single card from a custom section.

#### URL Parameters

| Param       | Description              |
|-------------|--------------------------|
| `id`        | Project ID (CUID)        |
| `sectionId` | Custom Section ID (CUID) |
| `cardId`    | Card ID (CUID)           |

#### Responses

**`200 OK`**
```json
{
  "success": true,
  "message": "Card deleted successfully"
}
```

**`404 Not Found`** — Card not found for this section / project

---

## Error Format

All error responses follow this shape:

```json
{
  "error": "Short error label",
  "message": "Human-readable explanation"
}
```

---

## Summary Table

| Method   | URL                                                           | Auth | Description             |
|----------|---------------------------------------------------------------|------|-------------------------|
| `POST`   | `/api/dashboard/:id/custom-sections`                          | ❌   | Create a custom section |
| `PUT`    | `/api/dashboard/:id/custom-sections/:sectionId`               | ❌   | Update a custom section |
| `DELETE` | `/api/dashboard/:id/custom-sections/:sectionId`               | ❌   | Delete a custom section |
| `GET`    | `/api/project/:id/custom-sections`                            | ❌   | Get all custom sections |
| `POST`   | `/api/dashboard/:id/custom-sections/:sectionId/cards`         | ❌   | Add a card to a section |
| `PUT`    | `/api/dashboard/:id/custom-sections/:sectionId/cards/:cardId` | ❌   | Update a card           |
| `DELETE` | `/api/dashboard/:id/custom-sections/:sectionId/cards/:cardId` | ❌   | Delete a card           |

> **Note:** All write routes follow the `/api/dashboard/` prefix. Add `authenticateAdmin` middleware to protect them when needed.
