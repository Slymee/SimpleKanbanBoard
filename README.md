# Kanban Board Application

A simple Kanban board built using Laravel, with a CRUD API for managing tasks, and a frontend implemented with HTML, CSS, and JavaScript. This project helps in tracking tasks through different stages, from "To Do" to "In Progress" to "Done."

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

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

   php artisan key:generate
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
   
