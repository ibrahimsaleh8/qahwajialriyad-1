# Custom Section APIs Integration Guide

This guide details the API endpoints for managing custom sections and cards on the website frontend.

## Database Models

### CustomSection
*   `id`: String (cuid, primary key)
*   `projectId`: String (foreign key to Project)
*   `title`: String (required)
*   `description`: String (required)
*   `cards`: List of `CustomSectionCard`

### CustomSectionCard
*   `id`: String (cuid, primary key)
*   `sectionId`: String (foreign key to CustomSection)
*   `title`: String (required)
*   `description`: String (required)
*   `icon`: String (optional, nullable)

---

## API Endpoints Reference

### 1. Create a Custom Section
Creates a new custom section for a project, optionally with initial cards.

*   **URL:** `/api/dashboard/:projectId/custom-sections`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "title": "Our Features",
      "description": "Here is why we stand out from the rest.",
      "cards": [
        {
          "title": "Fast Delivery",
          "description": "We deliver your coffee within 30 minutes.",
          "icon": "delivery-icon"
        },
        {
          "title": "Premium Quality",
          "description": "Only organic Arabic coffee beans.",
          "icon": "cup-icon"
        }
      ]
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "success": true,
      "message": "Custom section created successfully",
      "data": {
        "id": "sec_123",
        "projectId": "proj_123",
        "title": "Our Features",
        "description": "Here is why we stand out from the rest.",
        "createdAt": "2026-07-10T15:53:27.000Z",
        "updatedAt": "2026-07-10T15:53:27.000Z",
        "cards": [
          {
            "id": "card_1",
            "sectionId": "sec_123",
            "title": "Fast Delivery",
            "description": "We deliver your coffee within 30 minutes.",
            "icon": "delivery-icon",
            "createdAt": "2026-07-10T15:53:27.000Z",
            "updatedAt": "2026-07-10T15:53:27.000Z"
          },
          {
            "id": "card_2",
            "sectionId": "sec_123",
            "title": "Premium Quality",
            "description": "Only organic Arabic coffee beans.",
            "icon": "cup-icon",
            "createdAt": "2026-07-10T15:53:27.000Z",
            "updatedAt": "2026-07-10T15:53:27.000Z"
          }
        ]
      }
    }
    ```

---

### 2. Update a Custom Section
Updates the title and/or description of an existing custom section.

*   **URL:** `/api/dashboard/:projectId/custom-sections/:sectionId`
*   **Method:** `PUT`
*   **Request Body:** (Provide at least one field to update)
    ```json
    {
      "title": "Updated Features Title",
      "description": "Updated section description."
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "message": "Custom section updated successfully",
      "data": {
        "id": "sec_123",
        "projectId": "proj_123",
        "title": "Updated Features Title",
        "description": "Updated section description.",
        "createdAt": "2026-07-10T15:53:27.000Z",
        "updatedAt": "2026-07-10T15:55:00.000Z",
        "cards": [...]
      }
    }
    ```

---

### 3. Delete a Custom Section
Deletes a custom section and automatically cascades delete to all associated cards.

*   **URL:** `/api/dashboard/:projectId/custom-sections/:sectionId`
*   **Method:** `DELETE`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "message": "Custom section deleted successfully"
    }
    ```

---

### 4. Fetch Custom Sections (Public Route)
Retrieves all custom sections with their cards for a given project, sorted by creation date.

*   **URL:** `/api/project/:projectId/custom-sections`
*   **Method:** `GET`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "sec_123",
          "projectId": "proj_123",
          "title": "Updated Features Title",
          "description": "Updated section description.",
          "createdAt": "2026-07-10T15:53:27.000Z",
          "updatedAt": "2026-07-10T15:55:00.000Z",
          "cards": [
            {
              "id": "card_1",
              "sectionId": "sec_123",
              "title": "Fast Delivery",
              "description": "We deliver your coffee within 30 minutes.",
              "icon": "delivery-icon",
              "createdAt": "2026-07-10T15:53:27.000Z",
              "updatedAt": "2026-07-10T15:53:27.000Z"
            }
          ]
        }
      ]
    }
    ```

---

### 5. Create a Card
Creates a new card under a specific custom section.

*   **URL:** `/api/dashboard/:projectId/custom-sections/:sectionId/cards`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "title": "Fresh Roasting",
      "description": "Roasted fresh on order.",
      "icon": "roaster-icon"
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "success": true,
      "message": "Card created successfully",
      "data": {
        "id": "card_3",
        "sectionId": "sec_123",
        "title": "Fresh Roasting",
        "description": "Roasted fresh on order.",
        "icon": "roaster-icon",
        "createdAt": "2026-07-10T15:58:00.000Z",
        "updatedAt": "2026-07-10T15:58:00.000Z"
      }
    }
    ```

---

### 6. Update a Card
Updates a card's fields (title, description, or icon). Only provided fields will be updated.

*   **URL:** `/api/dashboard/:projectId/custom-sections/:sectionId/cards/:cardId`
*   **Method:** `PUT`
*   **Request Body:** (Provide at least one field to update)
    ```json
    {
      "title": "Updated Card Title",
      "icon": null 
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "message": "Card updated successfully",
      "data": {
        "id": "card_3",
        "sectionId": "sec_123",
        "title": "Updated Card Title",
        "description": "Roasted fresh on order.",
        "icon": null,
        "createdAt": "2026-07-10T15:58:00.000Z",
        "updatedAt": "2026-07-10T15:59:00.000Z"
      }
    }
    ```

---

### 7. Delete a Card
Deletes a single card from a section.

*   **URL:** `/api/dashboard/:projectId/custom-sections/:sectionId/cards/:cardId`
*   **Method:** `DELETE`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "message": "Card deleted successfully"
    }
    ```
