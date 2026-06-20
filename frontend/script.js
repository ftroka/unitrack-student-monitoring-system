const API_BASE_URL = "http://localhost:5033/api";

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
    const response = await fetch(`${API_BASE_URL}/students`);

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

async function loadInstructorDashboard() {
  const coursesTableBody = document.getElementById("coursesTableBody");
  const assignmentsTableBody = document.getElementById("assignmentsTableBody");
  const totalCourses = document.getElementById("totalCourses");
  const totalAssignments = document.getElementById("totalAssignments");

  if (!coursesTableBody || !assignmentsTableBody) {
    return;
  }

  try {
    const coursesResponse = await fetch(`${API_BASE_URL}/courses`);
    const assignmentsResponse = await fetch(`${API_BASE_URL}/assignments`);

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
          <td colspan="5">No courses found.</td>
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
          <td>
            <button class="delete-button" onclick="deleteCourse(${course.id})">
              Delete
            </button>
          </td>
        `;

        coursesTableBody.appendChild(row);
      });
    }

    assignmentsTableBody.innerHTML = "";

    if (assignments.length === 0) {
      assignmentsTableBody.innerHTML = `
        <tr>
          <td colspan="5">No assignments found.</td>
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
          <td>
            <button class="delete-button" onclick="deleteAssignment(${assignment.id})">
              Delete
            </button>
          </td>
        `;

        assignmentsTableBody.appendChild(row);
      });
    }
  } catch (error) {
    coursesTableBody.innerHTML = `
      <tr>
        <td colspan="5">Could not load courses from API.</td>
      </tr>
    `;

    assignmentsTableBody.innerHTML = `
      <tr>
        <td colspan="5">Could not load assignments from API.</td>
      </tr>
    `;

    console.error(error);
  }
}

async function loadAdminDashboard() {
  const usersTableBody = document.getElementById("usersTableBody");
  const totalUsers = document.getElementById("totalUsers");
  const totalStudentUsers = document.getElementById("totalStudentUsers");
  const totalInstructorUsers = document.getElementById("totalInstructorUsers");

  if (!usersTableBody) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users`);

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
          <td colspan="4">No users found.</td>
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
    <td>
      <button class="delete-button" onclick="deleteUser(${user.id})">
        Delete
      </button>
    </td>
  `;

  usersTableBody.appendChild(row);
});
  } catch (error) {
    usersTableBody.innerHTML = `
      <tr>
        <td colspan="4">Could not load users from API.</td>
      </tr>
    `;

    console.error(error);
  }
}

async function loadStudentAcademicDashboard() {
  const gradesTableBody = document.getElementById("studentGradesTableBody");
  const assignmentsTableBody = document.getElementById("studentAssignmentsTableBody");
  const averageGrade = document.getElementById("averageGrade");
  const studentAssignmentsCount = document.getElementById("studentAssignmentsCount");
  const passedGradesCount = document.getElementById("passedGradesCount");

  if (!gradesTableBody || !assignmentsTableBody) {
    return;
  }

  try {
    const gradesResponse = await fetch(`${API_BASE_URL}/grades`);
    const assignmentsResponse = await fetch(`${API_BASE_URL}/assignments`);

    if (!gradesResponse.ok || !assignmentsResponse.ok) {
      throw new Error("Failed to fetch student academic data");
    }

    const grades = await gradesResponse.json();
    const assignments = await assignmentsResponse.json();

    gradesTableBody.innerHTML = "";
    assignmentsTableBody.innerHTML = "";

    if (grades.length > 0) {
      const totalGrade = grades.reduce((sum, grade) => sum + grade.value, 0);
      const average = totalGrade / grades.length;

      averageGrade.textContent = average.toFixed(1);
      passedGradesCount.textContent = grades.filter(grade => grade.status === "Passed").length;
    } else {
      averageGrade.textContent = "0";
      passedGradesCount.textContent = "0";
    }

    studentAssignmentsCount.textContent = assignments.length;

    if (grades.length === 0) {
      gradesTableBody.innerHTML = `
        <tr>
          <td colspan="5">No grades found.</td>
        </tr>
      `;
    } else {
      grades.forEach(grade => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${grade.studentId}</td>
        <td>${grade.courseId}</td>
        <td>${grade.value}</td>
         <td>${grade.status}</td>
         <td>
            <button class="delete-button" onclick="deleteGrade(${grade.id})">
        Delete
            </button>
             </td>
        `;

        gradesTableBody.appendChild(row);
        });
    }

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
    gradesTableBody.innerHTML = `
      <tr>
        <td colspan="5">Could not load grades from API.</td>
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

async function createStudent(event) {
  event.preventDefault();

  const message = document.getElementById("studentFormMessage");

  const student = {
    fullName: document.getElementById("studentFullName").value,
    email: document.getElementById("studentEmail").value,
    studentNumber: document.getElementById("studentNumber").value,
    program: document.getElementById("studentProgram").value,
    yearOfStudy: Number(document.getElementById("yearOfStudy").value)
  };

  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    if (!response.ok) {
      throw new Error("Failed to create student");
    }

    message.textContent = "Student added successfully.";

    document.getElementById("studentFullName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentNumber").value = "";
    document.getElementById("studentProgram").value = "";
    document.getElementById("yearOfStudy").value = "";

    loadAdminStudents();
  } catch (error) {
    message.textContent = "Could not add student.";
    console.error(error);
  }
}

async function createCourse(event) {
  event.preventDefault();

  const message = document.getElementById("courseFormMessage");

  const course = {
    courseName: document.getElementById("courseName").value,
    courseCode: document.getElementById("courseCode").value,
    credits: Number(document.getElementById("courseCredits").value),
    instructorName: document.getElementById("instructorName").value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(course)
    });

    if (!response.ok) {
      throw new Error("Failed to create course");
    }

    message.textContent = "Course added successfully.";

    document.getElementById("courseName").value = "";
    document.getElementById("courseCode").value = "";
    document.getElementById("courseCredits").value = "";
    document.getElementById("instructorName").value = "";

    loadInstructorDashboard();
  } catch (error) {
    message.textContent = "Could not add course.";
    console.error(error);
  }
}

async function createAssignment(event) {
  event.preventDefault();

  const message = document.getElementById("assignmentFormMessage");

  const assignment = {
    courseId: Number(document.getElementById("assignmentCourseId").value),
    title: document.getElementById("assignmentTitle").value,
    description: document.getElementById("assignmentDescription").value,
    deadline: document.getElementById("assignmentDeadline").value,
    status: document.getElementById("assignmentStatus").value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(assignment)
    });

    if (!response.ok) {
      throw new Error("Failed to create assignment");
    }

    message.textContent = "Assignment added successfully.";

    document.getElementById("assignmentCourseId").value = "";
    document.getElementById("assignmentTitle").value = "";
    document.getElementById("assignmentDescription").value = "";
    document.getElementById("assignmentDeadline").value = "";
    document.getElementById("assignmentStatus").value = "";

    loadInstructorDashboard();
  } catch (error) {
    message.textContent = "Could not add assignment.";
    console.error(error);
  }
}

async function createGrade(event) {
  event.preventDefault();

  const message = document.getElementById("gradeFormMessage");

  const grade = {
    studentId: Number(document.getElementById("gradeStudentId").value),
    courseId: Number(document.getElementById("gradeCourseId").value),
    value: Number(document.getElementById("gradeValue").value),
    status: document.getElementById("gradeStatus").value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/grades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(grade)
    });

    if (!response.ok) {
      throw new Error("Failed to create grade");
    }

    message.textContent = "Grade added successfully.";

    document.getElementById("gradeStudentId").value = "";
    document.getElementById("gradeCourseId").value = "";
    document.getElementById("gradeValue").value = "";
    document.getElementById("gradeStatus").value = "";
  } catch (error) {
    message.textContent = "Could not add grade.";
    console.error(error);
  }
}

async function loadAdminStudents() {
  const tableBody = document.getElementById("adminStudentsTableBody");

  if (!tableBody) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students`);

    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }

    const students = await response.json();

    tableBody.innerHTML = "";

    if (students.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6">No students found.</td>
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
        <td>
          <button class="delete-button" onclick="deleteStudent(${student.id})">
            Delete
          </button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">Could not load students.</td>
      </tr>
    `;

    console.error(error);
  }
}

async function deleteStudent(id) {
  const confirmDelete = confirm("Are you sure you want to delete this student?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete student");
    }

    loadAdminStudents();
  } catch (error) {
    alert("Could not delete student.");
    console.error(error);
  }
}

async function deleteCourse(id) {
  const confirmDelete = confirm("Are you sure you want to delete this course?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete course");
    }

    loadInstructorDashboard();
  } catch (error) {
    alert("Could not delete course.");
    console.error(error);
  }
}

async function deleteAssignment(id) {
  const confirmDelete = confirm("Are you sure you want to delete this assignment?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/assignments/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete assignment");
    }

    loadInstructorDashboard();
  } catch (error) {
    alert("Could not delete assignment.");
    console.error(error);
  }
}


async function deleteGrade(id) {
  const confirmDelete = confirm("Are you sure you want to delete this grade?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/grades/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete grade");
    }

    loadStudentAcademicDashboard();
  } catch (error) {
    alert("Could not delete grade.");
    console.error(error);
  }
}

async function deleteUser(id) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    loadAdminDashboard();
  } catch (error) {
    alert("Could not delete user.");
    console.error(error);
  }
}

loadStudents();
loadInstructorDashboard();
loadAdminDashboard();
loadStudentAcademicDashboard();
loadAdminStudents();