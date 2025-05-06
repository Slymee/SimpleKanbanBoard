# Kanban Board Application

A simple Kanban board built using Laravel, with a CRUD API for managing tasks, and a frontend implemented with HTML, CSS, and JavaScript. This project helps in tracking tasks through different stages, from "To Do" to "In Progress" to "Done."

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

This is a simple Kanban board application where users can manage their tasks by adding, updating, and deleting tasks. The application allows users to create tasks with attributes such as **title**, **description**, **priority**, and **status**. It also tracks who created and last updated a task.

---

## Features

- **Task Management:** Add, edit, delete, and view tasks.
- **Task Status:** Tasks can be moved through different stages like "To Do", "In Progress", and "Done".
- **Task Priority:** Assign a priority level (e.g., Low, Medium, High) to each task.
- **User Tracking:** Each task records the user who created and last updated it.
- **Simple User Interface:** A minimal UI using HTML, CSS, and JavaScript to interact with the API.

---

## Tech Stack

- **Backend:** Laravel PHP Framework
- **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
- **Database:** MySQL (or PostgreSQL)
- **API:** Laravel RESTful APIs
  
---

## Installation

Follow these steps to set up and run the Kanban board locally.

### Prerequisites

- PHP >= 8.3
- Composer
- Node.js & npm
- MySQL or PostgreSQL (depending on your `.env` configuration)

### Steps to Install

1. **Clone the repository**:

   ```bash
   git clone git@github.com:Slymee/SimpleKanbanBoard.git
   cd SimpleKanbanBoard
   ```
2. **Install PHP Dependencies***
   ```bash
   composer install
   ```
3. **Install JS Dependencies**
   ```bash
   npm install
   ```
4. **Configure Environment File**
   ```bash
   cp .env.example .env
   ```
5. **Setup Database**
   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=kanban_board
   DB_USERNAME=root
   DB_PASSWORD=
   ```
6. **Generate Application Key**
   ```bash
   php artisan key:generate
   ``` 
7. **Run Migration**
   ```bash
   php artisaan migrate
   ``` 
8. **Serve Application**
   ```bash
   php artisan serve
   ```

## API Endpoints

The application provides the following RESTful API endpoints for managing tasks.

### **GET /api/tasks**

- **Description**: Fetch all tasks, sorted by a specified field and order.
- **Query Parameters**:
  - `sort_by` (optional): The field to sort by. Defaults to `title`. Example: `sort_by=priority`
  - `sort_order` (optional): The sort order. Can be `asc` or `desc`. Defaults to `asc`. Example: `sort_order=desc`
- **Response**: Returns a list of tasks in JSON format.

  **Example Response**:
  ```json
  [
    {
        "id": 1,
        "title": "Task 1",
        "description": "Description of Task 1",
        "priority": "High",
        "status": "To Do",
        "created_at": "2023-01-01T00:00:00",
        "updated_at": "2023-01-01T00:00:00"
    },
    {
        "id": 2,
        "title": "Task 2",
        "description": "Description of Task 2",
        "priority": "Medium",
        "status": "In Progress",
        "created_at": "2023-01-02T00:00:00",
        "updated_at": "2023-01-02T00:00:00"
    }
  ]
  ```
  
  ### **POST /api/tasks**

  - **Description**: Description: Create a new task.
  - **Request Body: **:
    ```json
    {
        "title": "New Task",
        "description": "Description of the new task",
        "priority": "Medium",
        "status": "To Do"
    }
    ```

  ### **PUT /api/tasks**

  - **Description**: Update an existing task by its ID.
  - **Request Body: **:
    ```json
    {
        "title": "Updated Task Title",
        "description": "Updated task description",
        "priority": "High",
        "status": "In Progress"
    }
    ```

  ### **DELETE /api/tasks/{id}**

  - **Description**: Delete a task by its ID.
  - **Response: Returns a success message indicating whether the task was deleted successfully.**:
    ```json
    {
        "success": true,
        "message": "Task deleted successfully"
    }

    ```

### Access the App
Once running, visit: [http://localhost:8000](http://localhost:8000)


## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project by [Slymee](https://github.com/Slymee)
