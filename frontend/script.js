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

async function loadInstructorDashboard() {
  const coursesTableBody = document.getElementById("coursesTableBody");
  const assignmentsTableBody = document.getElementById("assignmentsTableBody");
  const totalCourses = document.getElementById("totalCourses");
  const totalAssignments = document.getElementById("totalAssignments");

  if (!coursesTableBody || !assignmentsTableBody) {
    return;
  }

  try {
    const coursesResponse = await fetch("http://localhost:5033/api/courses");
    const assignmentsResponse = await fetch("http://localhost:5033/api/assignments");

    if (!coursesResponse.ok || !assignmentsResponse.ok) {
      throw new Error("Failed to fetch instructor dashboard data");
    }

    const courses = await coursesResponse.json();
    const assignments = await assignmentsResponse.json();

    totalCourses.textContent = courses.length;
    totalAssignments.textContent = assignments.length;

    coursesTableBody.innerHTML = "";

    if (courses.length === 0) {
      coursesTableBody.innerHTML = `
        <tr>
          <td colspan="4">No courses found.</td>
        </tr>
      `;
    } else {
      courses.forEach(course => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${course.courseCode}</td>
          <td>${course.courseName}</td>
          <td>${course.credits}</td>
          <td>${course.instructorName}</td>
        `;

        coursesTableBody.appendChild(row);
      });
    }

    assignmentsTableBody.innerHTML = "";

    if (assignments.length === 0) {
      assignmentsTableBody.innerHTML = `
        <tr>
          <td colspan="4">No assignments found.</td>
        </tr>
      `;
    } else {
      assignments.forEach(assignment => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${assignment.title}</td>
          <td>${assignment.description}</td>
          <td>${new Date(assignment.deadline).toLocaleDateString()}</td>
          <td>${assignment.status}</td>
        `;

        assignmentsTableBody.appendChild(row);
      });
    }
  } catch (error) {
    coursesTableBody.innerHTML = `
      <tr>
        <td colspan="4">Could not load courses from API.</td>
      </tr>
    `;

    assignmentsTableBody.innerHTML = `
      <tr>
        <td colspan="4">Could not load assignments from API.</td>
      </tr>
    `;

    console.error(error);
  }
}

loadInstructorDashboard();

async function loadAdminDashboard() {
  const usersTableBody = document.getElementById("usersTableBody");
  const totalUsers = document.getElementById("totalUsers");
  const totalStudentUsers = document.getElementById("totalStudentUsers");
  const totalInstructorUsers = document.getElementById("totalInstructorUsers");

  if (!usersTableBody) {
    return;
  }

  try {
    const response = await fetch("http://localhost:5033/api/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    usersTableBody.innerHTML = "";

    totalUsers.textContent = users.length;
    totalStudentUsers.textContent = users.filter(user => user.role === "Student").length;
    totalInstructorUsers.textContent = users.filter(user => user.role === "Instructor").length;

    if (users.length === 0) {
      usersTableBody.innerHTML = `
        <tr>
          <td colspan="3">No users found.</td>
        </tr>
      `;
      return;
    }

    users.forEach(user => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
      `;

      usersTableBody.appendChild(row);
    });
  } catch (error) {
    usersTableBody.innerHTML = `
      <tr>
        <td colspan="3">Could not load users from API.</td>
      </tr>
    `;

    console.error(error);
  }
}

loadAdminDashboard();