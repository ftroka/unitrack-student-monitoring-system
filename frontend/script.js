function handleLogin() {
  const role = document.getElementById("role").value;

  if (role === "") {
    alert("Please select a role.");
    return;
  }

  if (role === "student") {
    window.location.href = "student-dashboard.html";
  } else if (role === "instructor") {
    window.location.href = "instructor-dashboard.html";
  } else if (role === "admin") {
    window.location.href = "admin-dashboard.html";
  }
}
async function loadStudents() {
  const tableBody = document.getElementById("studentsTableBody");

  if (!tableBody) {
    return;
  }

  try {
    const response = await fetch("http://localhost:5033/api/students");

    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }

    const students = await response.json();

    tableBody.innerHTML = "";

    if (students.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5">No students found.</td>
        </tr>
      `;
      return;
    }

    students.forEach(student => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${student.studentNumber}</td>
        <td>${student.fullName}</td>
        <td>${student.email}</td>
        <td>${student.program}</td>
        <td>${student.yearOfStudy}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">Could not load students from API.</td>
      </tr>
    `;

    console.error(error);
  }
}

loadStudents();