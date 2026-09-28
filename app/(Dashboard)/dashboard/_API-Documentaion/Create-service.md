# Create Service API Documentation

This document describes the API endpoint to create a new service under a project's services section.

---

## 1. Create a New Service

Create a new service item for a project. The service is automatically grouped under the project's services section.

- **URL:** `/api/dashboard/:projectId/create-service`
- **Method:** `POST`
- **Auth Required:** Yes
- **Headers:** 
  - `Content-Type: application/json`

### Route Parameters
- `projectId` (string): The ID of the project to add the service to.

### Request Body
All three fields (`title`, `description`, `icon`) are required.

```json
{
  "title": "Premium Coffee Service",
  "description": "Premium Arabic coffee served by professional hospitality experts.",
  "icon": "coffee-icon-name"
}
```

### Response

#### `201 Created`
```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "service": {
      "id": "service_cuid_value",
      "sectionId": "services_section_cuid_value",
      "title": "Premium Coffee Service",
      "description": "Premium Arabic coffee served by professional hospitality experts.",
      "icon": "coffee-icon-name",
      "createdAt": "2026-07-10T15:32:23.000Z",
      "updatedAt": "2026-07-10T15:32:23.000Z"
    }
  }
}
```

#### `400 Bad Request`
Missing required fields, or missing project ID in the route parameter.
```json
{
  "error": "Missing required fields",
  "message": "title, description, and icon are required"
}
```

#### `404 Not Found`
If the project or its services section does not exist. A services section must exist before creating individual services.
```json
{
  "error": "Services section not found for this project",
  "message": "Create a services section before adding individual services"
}
```

#### `500 Internal Server Error`
```json
{
  "error": "Failed to create service",
  "message": "Detailed database or server error message"
}
```
