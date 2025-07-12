<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Employee Directory</title>
  <link rel="stylesheet" href="/static/styles.css">
</head>
<body>

<div class="header">
  <h1>Employee Directory</h1>
  <div class="actions">
    <input type="text" placeholder="Search by name or email" id="searchInput">
    <button class="filter-btn">Filter</button>
  </div>
</div>

<div class="controls">
  

  <label>Sort:</label>
  <select id="sortSelect">
    <option value="">--Select--</option>
    <option value="firstname">First Name</option>
    <option value="department">Department</option>
  </select>

  <label>Show:</label>
  <select id="pageSizeSelect">
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value="100">100</option>
  </select>

  <button class="add-btn" onclick="openAddForm()">Add Employee</button>

</div>

<!-- 📌 Employee List -->
<div id="employeeList" class="employee-list">
  <#list employees as emp>
    <div class="employee-card" id="${emp.id}">
      <h3>
        <span class="emp-firstname">${emp.firstName}</span>
        <span class="emp-lastname">${emp.lastName}</span>
      </h3>
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Email:</strong> <span class="emp-email">${emp.email}</span></p>
      <p><strong>Department:</strong> <span class="emp-department">${emp.department}</span></p>
      <p><strong>Role:</strong> <span class="emp-role">${emp.role}</span></p>
      <div class="card-actions">
        <button onclick="openEditForm('${emp.id}')">Edit</button>
        <button onclick="deleteEmployee('${emp.id}')">Delete</button>
      </div>
    </div>
  </#list>
</div>

<!-- Pagination placeholder -->
<div id="paginationControls" class="pagination"></div>

<!-- Form Modal -->
<div id="formModal" class="modal">
  <div class="form-container">
    <h2 id="formTitle">Add Employee</h2>
    <form id="employeeForm">
      <label>First name</label>
      <input type="text" id="firstName" required>

      <label>Last name</label>
      <input type="text" id="lastName" required>

      <label>Email</label>
      <input type="email" id="email" required>

      <label>Department</label>
      <select id="department" required>
        <option value="">--Select--</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
      </select>

      <label>Role</label>
      <select id="role" required>
        <option value="">--Select--</option>
        <option value="Manager">Manager</option>
        <option value="Developer">Developer</option>
        <option value="Analyst">Analyst</option>
      </select>

      <div class="form-actions">
        <button type="button" class="cancel-btn" onclick="closeForm()">Cancel</button>
        <button type="submit" id="formSubmitBtn" class="add-btn">Add</button>
      </div>
    </form>
  </div>
</div>

<!-- Filter Sidebar -->
<div id="filterSidebar" class="sidebar">
  <h3>Filter Employees</h3>

  <label>First Name</label>
  <input type="text" id="filterFirstName">

  <label>Department</label>
  <select id="filterDepartment">
    <option value="">--All--</option>
    <option value="HR">HR</option>
    <option value="IT">IT</option>
    <option value="Finance">Finance</option>
  </select>

  <label>Role</label>
  <select id="filterRole">
    <option value="">--All--</option>
    <option value="Manager">Manager</option>
    <option value="Developer">Developer</option>
    <option value="Analyst">Analyst</option>
  </select>

  <div class="form-actions" style="margin-top: 20px;">
    <button class="add-btn" onclick="applyFilters()">Apply</button>
    <button class="cancel-btn" onclick="resetFilters()">Reset</button>
  </div>
</div>

<footer>
  <p>&copy; 2025 Employee Directory App. All rights reserved.</p>
</footer>

<script src="/static/dashboard.js"></script>

</body>
</html>
