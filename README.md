# Frontend - Angular Application

This is the frontend of a web application built using **Angular 20**. It interacts with a backend API (typically running on `http://localhost:3000`). Please ensure the backend server is up and running **before** starting this frontend project.

---

## 📋 Prerequisites

Make sure the following tools are installed on your system:

- **Node.js** (v16 or higher): [https://nodejs.org](https://nodejs.org)
- **Angular CLI** (v20+):  
  Install globally with:
  ```bash
  npm install -g @angular/cli
🚀 Getting Started
Follow the steps below to get the frontend project running:

🔁 1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
Replace your-username/your-frontend-repo with the actual GitHub repository URL.

📦 2. Install Project Dependencies
bash
Copy
Edit
npm install
⚙️ 3. Ensure Backend is Running
Before starting the frontend, ensure that the backend server is already running.

If you're using the backend provided here, you can start it like this:

bash
Copy
Edit
cd ../backend
npm install
npm run dev
By default, the backend should be available at http://localhost:3000.

🌐 4. (Optional) Configure API URL
If your frontend calls the backend API, update the base URL in:

ts
Copy
Edit
src/environments/environment.ts
Example:

ts
Copy
Edit
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
▶️ 5. Start the Frontend Server
bash
Copy
Edit
npm start
Open your browser and visit:

arduino
Copy
Edit
http://localhost:4200
The Angular app will reload automatically on code changes.

📁 Project Structure
bash
Copy
Edit
.
├── src/
│   ├── app/                      # Angular components and modules
│   ├── assets/                   # Static assets
│   ├── environments/             # Environment configs
│   └── index.html                # Main HTML file
├── angular.json                  # Angular CLI configuration
├── package.json                  # Scripts and dependencies
└── README.md                     # This file
