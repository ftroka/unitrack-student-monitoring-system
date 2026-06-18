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