# Employee Directory Web App (FreeMarker + DOM-based JS)

A simple interactive employee directory web application built with:
- FreeMarker template engine for rendering dynamic HTML
- Vanilla JavaScript for client-side search, filter, sorting, pagination
- HTML, CSS for frontend styling

---

---

##  How to Run the Project Locally

###  Prerequisites:
- Java JDK (version 8+)
- FreeMarker library jar (placed inside `lib/` folder)

---

### Step 1: Download FreeMarker Jar

If you haven't yet:
- Download from: https://freemarker.apache.org/
- Place the downloaded `freemarker-2.3.34.jar` inside the `lib/` folder

---

### Step 2: Compile the Server

Open your terminal or command prompt inside the project directory and run:

**On Windows CMD:**
```bash
javac -cp ".;lib/freemarker-2.3.34.jar" EmployeeDirectoryServer.java
```

**On Mac / Linux / Git Bash:**
```bash
javac -cp ".:lib/freemarker-2.3.34.jar" EmployeeDirectoryServer.java
```

### Step 3: Run the Server

Open your terminal or command prompt inside the project directory and run:

**On Windows CMD:**
```bash
javac -cp ".;lib/freemarker-2.3.34.jar" EmployeeDirectoryServer
```

**On Mac / Linux / Git Bash:**
```bash
javac -cp ".:lib/freemarker-2.3.34.jar" EmployeeDirectoryServer
```

**Once the server starts, open your browser and visit:**
```bach
http://localhost:8080/dashboard
```




