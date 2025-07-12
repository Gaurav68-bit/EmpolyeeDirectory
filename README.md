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

## Features:
- ✅ Add, Edit, Delete Employees
- ✅ Filter by name, department, and role
- ✅ Search by name or email
- ✅ Responsiveness
- ✅ Sort by first name or department
- ✅ DOM-based Pagination
- ✅ Server-side rendering via FreeMarker

## Screenshot of the project
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/d87a6474-7073-4c28-af69-89cb3bd9ae79" />
<img width="1920" height="1200" alt="Screenshot (88)" src="https://github.com/user-attachments/assets/e07d60b3-b891-4eb7-8eb4-5f71a50ebe87" />
<img width="1920" height="1200" alt="Screenshot (87)" src="https://github.com/user-attachments/assets/2f0a04f3-acec-46a8-897d-1686feababed" />


  ## Challenges Faced & How I Overcame Them

1️⃣ **Integrating FreeMarker with a Custom Java HTTP Server**  
When I first set up the FreeMarker template engine with the lightweight Java HTTP Server, I struggled with correctly configuring the template directory and classpath for the jar file.  
**Solution:**  
After consulting the FreeMarker official documentation and adjusting the server code to correctly point to the `templates` directory, I successfully rendered the `.ftl` templates dynamically.

---

2️⃣ **Classpath and Jar Dependency Issues During Compilation**  
While compiling the Java code with the FreeMarker library, I faced errors like `package freemarker.template does not exist` even after downloading the jar.  
**Solution:**  
I realized I wasn't properly including the jar in the `-cp` (classpath) argument. After ensuring the jar was placed in a `lib/` folder and adjusting the compilation command to the compilation succeeded.

---

3️⃣ **Adding DOM-based Pagination with Dynamic Filtering/Search**  
Making pagination work seamlessly alongside dynamic filtering and searching on the front end was tricky because DOM changes needed to be tracked after every action.  
**Solution:**  
I modularized the DOM manipulation logic into a single `applyPagination()` function, which gets called after any CRUD, filter, or search operation to refresh the visible employee cards.

---







