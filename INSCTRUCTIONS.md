# Base Code

## 📌 Overview
This repository serves as the foundation for all my web projects. It includes a structured setup for both frontend and backend development using **Vite + React** for the frontend and **Node.js + PostgreSQL** for the backend.

## 🚀 Getting Started

### 1️⃣ Clone the repository and create a new repository
```sh
git clone https://github.com/JoaquinCatanzaritiTorrens/base-code.git
cd base-code
```
After cloning the repository, follow these steps to push it to a new repository on GitHub:
#### Rename the project directory (optional but recommended)
On Windows Powershell, use the `Rename-Item` command to rename the directory:

```sh
cd ..
Rename-Item CodigoBaseWeb YOUR-NEW-PROJECT-NAME
cd YOUR-NEW-PROJECT-NAME
```

#### Remove the current Git history
On Windows Powershell, use the `rmdir` command to remove the `.git` folder:

```sh
Remove-Item -Recurse -Force .git
```

#### Initialize a new Git repository

```sh
git init
git branch -M main
```

#### Add the remote URL for your new repository
Go to GitHub and create a new repository. Then, add the new repository as the remote origin:

```sh
git remote add origin https://github.com/JoaquinCatanzaritiTorrens/YOUR-NEW-PROJECT-NAME.git
```

#### Add, commit, and push the changes

```sh
git add .
git commit -m "Initial commit"
git push -u origin main
```

Your project is now set up in a new GitHub repository.


### 2️⃣ Backend Setup
```sh
cd backend
npm install
```

#### ➤ Run the backend
```sh
npm run dev
```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
```

#### ➤ Run the frontend
```sh
npm run dev 
```
### 4️⃣ Docker Compose Setup

To run the entire stack using Docker Compose, follow these steps:

#### ➤ Build and start the containers
```sh
docker-compose up --build
```

#### ➤ Stop the containers
```sh
docker-compose down
```

## 📌 Tech Stack
### 🖥️ Frontend
- **Vite + React**
- TypeScript

### 🛠️ Backend
- **Node.js + Express**
- PostgreSQL
- TypeScript

