# Create Why Us Feature API Documentation

This document describes the API endpoint to create a new "Why Us" feature for a project.

---

## Endpoint Details

- **URL:** `/api/dashboard/:id/create-why-us-feature`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **URL Parameters:**
  - `id` (string, required): The ID of the Project.

---

## Request Body

The request body must be a JSON object containing the following fields:

| Field         | Type   | Required | Description                                                  |
| :------------ | :----- | :------- | :----------------------------------------------------------- |
| `title`       | string | Yes      | The title of the feature (e.g., "Premium Beans").            |
| `description` | string | Yes      | A brief description explaining this feature.                 |
| `icon`        | string | Yes      | The icon name or identifier class (e.g., "coffee", "award"). |

### Request Example

```json
{
  "title": "High Quality",
  "description": "We source our coffee directly from sustainable organic farms.",
  "icon": "CoffeeIcon"
}
```

---

## Response Schema

### 1. Success Response (`201 Created`)

Returned when the feature is successfully created.

```json
{
  "success": true,
  "message": "Why Us feature created successfully",
  "data": {
    "feature": {
      "id": "clxb1abc200003567xyz89abc",
      "sectionId": "clxb0xyz100003567abc12def",
      "title": "High Quality",
      "description": "We source our coffee directly from sustainable organic farms.",
      "icon": "CoffeeIcon",
      "createdAt": "2026-07-10T15:40:00.000Z",
      "updatedAt": "2026-07-10T15:40:00.000Z"
    }
  }
}
```

### 2. Bad Request (`400 Bad Request`)

Returned if the project `id` is missing in the route, or if any required fields (`title`, `description`, `icon`) are missing from the request body.

```json
{
  "error": "Missing required fields",
  "message": "title, description, and icon are required"
}
```

### 3. Not Found (`404 Not Found`)

Returned if the Why Us section does not exist for the specified project. The section must be configured first before individual features can be added.

```json
{
  "error": "Why Us section not found for this project",
  "message": "Create a Why Us section before adding individual features"
}
```

### 4. Internal Server Error (`500 Internal Server Error`)

Returned if a database or server-side error occurs.

```json
{
  "error": "Failed to create why us feature",
  "message": "Detailed error message here"
}
```
