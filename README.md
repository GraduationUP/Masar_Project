# Project Structure

This document outlines the basic structure of the project, which separates the frontend (built with Next.js) and the backend (built with Laravel).

## `FRONT-END` Folder

This folder contains the entire Next.js application, responsible for the user interface and user experience.

**Key Contents:**

* `package.json`: Lists dependencies and scripts for the Next.js application.
* `next.config.js`: Configuration file for Next.js.
* `pages/`: Contains the React components that define the different routes of the application.
* `components/`: Houses reusable UI components.
* `public/`: Stores static assets like images, fonts, etc.
* `styles/`: Contains CSS modules or global stylesheets for styling the application.
* `utils/`: Utility functions and helper scripts.
* `.env.local`: Environment variables specific to the frontend development.
* `README.md`: Frontend-specific documentation.

## `BACKEND` Folder

This folder contains the entire Laravel application, responsible for the application logic, data management, and API endpoints.

**Key Contents:**

* `artisan`: Laravel command-line interface script.
* `app/`: Contains the core logic of the application, including models, controllers, middleware, etc.
* `bootstrap/`: Contains the framework bootstrapping scripts.
* `config/`: Configuration files for various Laravel services.
* `database/`: Contains database migrations, seeds, and factories.
* `public/`: The entry point for the backend application (often used for serving static assets if the backend handles them).
* `routes/`: Defines the application's routes (API endpoints).
* `storage/`: Stores application-specific files like logs and cache.
* `tests/`: Contains automated tests for the application.
* `vendor/`: Contains Composer dependencies.
* `.env`: Environment variables for the backend application.
* `composer.json`: Lists dependencies and scripts for the Laravel application.
* `README.md`: Backend-specific documentation.

## Project Root

The root directory of the project contains files and folders relevant to the overall project, such as:

* `project_structure.md` (this file)
* `.gitignore`: Specifies intentionally untracked files that Git should ignore.
* `LICENSE`: Information about the project's license.
* Potential shared documentation or setup instructions.
