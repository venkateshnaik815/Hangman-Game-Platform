# How to Run the Hangman Platform in VS Code

This step-by-step guide will walk you through starting all three parts of the application (Database, Backend, and Frontend) entirely within Visual Studio Code.

> [!IMPORTANT]
> **Prerequisites Checklist**
> Before following these steps, ensure that:
> 1. You have completely restarted VS Code after installing Java.
> 2. The Docker Desktop app is open and the whale icon in your system tray says "Engine Running".

---

## Step 1: Open the Project in VS Code
1. Open Visual Studio Code.
2. Go to **File > Open Folder...**
3. Select the `c:\github projects\Hangman Game Platform` folder.

---

## Step 2: Start the Database (PostgreSQL & Redis)
1. In VS Code, open a new terminal by clicking **Terminal > New Terminal** in the top menu (or pressing `` Ctrl + ` ``).
2. Ensure you are in the root directory (`C:\github projects\Hangman Game Platform`).
3. Run the following command:
   ```bash
   docker-compose up -d
   ```
4. *Wait until it says the containers are "Started" or "Running".*

---

## Step 3: Start the Spring Boot Backend
1. In the VS Code terminal panel (bottom of the screen), click the **"+"** icon on the right side to open a **Second Terminal**.
2. Navigate into the backend folder by running:
   ```bash
   cd backend
   ```
3. Start the Java server by running:
   ```bash
   .\gradlew.bat bootRun
   ```
4. *Wait until you see the Spring Boot logo and a message saying "Started BackendApplication in X seconds". The backend is now running on port 8080.*

---

## Step 4: Start the React Frontend
1. In the VS Code terminal panel, click the **"+"** icon again to open a **Third Terminal**.
2. Navigate into the frontend folder by running:
   ```bash
   cd frontend
   ```
3. Start the development server by running:
   ```bash
   npm run dev
   ```
4. *VS Code will output a local URL (usually `http://localhost:5173`).*

> [!TIP]
> **Viewing the App**
> Hold the `Ctrl` key and click the `http://localhost:5173` link in the terminal. VS Code will automatically open your web browser to the running React application!

---

## Stopping the Application
When you are done playing/developing:
1. Go to your frontend terminal and press `Ctrl + C` to stop it.
2. Go to your backend terminal and press `Ctrl + C` to stop it.
3. Go to your first terminal (root directory) and run:
   ```bash
   docker-compose down
   ```
