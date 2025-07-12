let editCard = null;
let currentPage = 1;
let pageSize = 10;

// OPEN ADD FORM
function openAddForm() {
  document.getElementById("formTitle").innerText = "Add Employee";
  document.getElementById("formSubmitBtn").innerText = "Add";
  clearForm();
  editCard = null;
  document.getElementById("formModal").style.display = "block";
}

// OPEN EDIT FORM
function openEditForm(empId) {
  const card = document.getElementById(empId);
  if (!card) return;

  document.getElementById("formTitle").innerText = "Edit Employee";
  document.getElementById("formSubmitBtn").innerText = "Save";

  document.getElementById("firstName").value = card.querySelector(".emp-firstname").innerText;
  document.getElementById("lastName").value = card.querySelector(".emp-lastname").innerText;
  document.getElementById("email").value = card.querySelector(".emp-email").innerText;
  document.getElementById("department").value = card.querySelector(".emp-department").innerText;
  document.getElementById("role").value = card.querySelector(".emp-role").innerText;

  editCard = card;
  document.getElementById("formModal").style.display = "block";
}

// ADD / EDIT FORM SUBMIT
document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value;
  const role = document.getElementById("role").value;

  if (editCard) {
    editCard.querySelector(".emp-firstname").innerText = firstName;
    editCard.querySelector(".emp-lastname").innerText = lastName;
    editCard.querySelector(".emp-email").innerText = email;
    editCard.querySelector(".emp-department").innerText = department;
    editCard.querySelector(".emp-role").innerText = role;
    alert("Employee updated!");
  } else {
    const newId = "E" + (document.querySelectorAll(".employee-card").length + 1).toString().padStart(3, '0');

    const card = document.createElement("div");
    card.className = "employee-card";
    card.id = newId;
    card.innerHTML = `
      <h3><span class="emp-firstname">${firstName}</span> <span class="emp-lastname">${lastName}</span></h3>
      <p><strong>ID:</strong> ${newId}</p>
      <p><strong>Email:</strong> <span class="emp-email">${email}</span></p>
      <p><strong>Department:</strong> <span class="emp-department">${department}</span></p>
      <p><strong>Role:</strong> <span class="emp-role">${role}</span></p>
      <div class="card-actions">
        <button onclick="openEditForm('${newId}')">Edit</button>
        <button onclick="deleteEmployee('${newId}')">Delete</button>
      </div>
    `;
    document.getElementById("employeeList").appendChild(card);
    alert("Employee added!");
  }

  closeForm();
  applyPagination();
});

//  DELETE EMPLOYEE
function deleteEmployee(empId) {
  if (confirm("Are you sure you want to delete this employee?")) {
    const card = document.getElementById(empId);
    if (card) card.remove();
    applyPagination();
  }
}

//  CLOSE AND RESET FORM
function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

function clearForm() {
  document.getElementById("employeeForm").reset();
}

//  FILTER SIDEBAR TOGGLE
document.querySelector(".filter-btn").addEventListener("click", () => {
  document.getElementById("filterSidebar").classList.toggle("open");
});

//  APPLY FILTERS
function applyFilters() {
  const firstNameFilter = document.getElementById("filterFirstName").value.trim().toLowerCase();
  const departmentFilter = document.getElementById("filterDepartment").value;
  const roleFilter = document.getElementById("filterRole").value;

  document.querySelectorAll(".employee-card").forEach(card => {
    const firstName = card.querySelector(".emp-firstname").innerText.toLowerCase();
    const department = card.querySelector(".emp-department").innerText;
    const role = card.querySelector(".emp-role").innerText;

    const matchesFirstName = !firstNameFilter || firstName.includes(firstNameFilter);
    const matchesDepartment = !departmentFilter || department === departmentFilter;
    const matchesRole = !roleFilter || role === roleFilter;

    card.style.display = (matchesFirstName && matchesDepartment && matchesRole) ? "block" : "none";
  });

  document.getElementById("filterSidebar").classList.remove("open");
  applyPagination();
}

//  RESET FILTERS
function resetFilters() {
  document.getElementById("filterFirstName").value = "";
  document.getElementById("filterDepartment").value = "";
  document.getElementById("filterRole").value = "";

  document.querySelectorAll(".employee-card").forEach(card => card.style.display = "block");
  document.getElementById("filterSidebar").classList.remove("open");
  applyPagination();
}

//  SEARCH EMPLOYEES
document.getElementById("searchInput").addEventListener("keyup", () => {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();

  document.querySelectorAll(".employee-card").forEach(card => {
    const fullName = `${card.querySelector(".emp-firstname").innerText} ${card.querySelector(".emp-lastname").innerText}`.toLowerCase();
    const email = card.querySelector(".emp-email").innerText.toLowerCase();

    const match = fullName.includes(query) || email.includes(query);
    card.style.display = match ? "block" : "none";
  });

  applyPagination();
});

//  SORT EMPLOYEES
document.getElementById("sortSelect").addEventListener("change", () => {
  const sortBy = document.getElementById("sortSelect").value;
  const container = document.getElementById("employeeList");
  const cards = Array.from(container.querySelectorAll(".employee-card"));

  if (sortBy) {
    cards.sort((a, b) => {
      let valA = a.querySelector(`.emp-${sortBy}`).innerText;
      let valB = b.querySelector(`.emp-${sortBy}`).innerText;
      return valA.localeCompare(valB);
    });

    cards.forEach(card => container.appendChild(card));
  }

  applyPagination();
});

//  PAGE SIZE SELECT
document.getElementById("pageSizeSelect").addEventListener("change", (e) => {
  pageSize = parseInt(e.target.value);
  currentPage = 1;
  applyPagination();
});

//  APPLY PAGINATION
function applyPagination() {
  const cards = Array.from(document.querySelectorAll(".employee-card")).filter(card => card.style.display !== "none");
  const totalItems = cards.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  cards.forEach((card, index) => {
    card.style.display = (index >= startIndex && index < endIndex) ? "block" : "none";
  });

  renderPaginationControls(totalPages);
}

//  RENDER PAGINATION CONTROLS
function renderPaginationControls(totalPages) {
  let paginationDiv = document.getElementById("paginationControls");
  if (!paginationDiv) {
    paginationDiv = document.createElement("div");
    paginationDiv.id = "paginationControls";
    paginationDiv.className = "pagination";
    document.body.appendChild(paginationDiv);
  }
  paginationDiv.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = (i === currentPage) ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      applyPagination();
    };
    paginationDiv.appendChild(btn);
  }
}

//  INITIAL PAGINATION ON PAGE LOAD
applyPagination();
