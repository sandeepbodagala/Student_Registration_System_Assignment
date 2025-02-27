document.addEventListener("DOMContentLoaded", function () {
    // Get references to the form and table elements
    const form = document.getElementById("studentForm"),
          table = document.getElementById("studentTable");

    // Load students data from localStorage or initialize an empty array
    let students = JSON.parse(localStorage.getItem("students")) || [];


    // Function to save students data in localStorage and update the table display
    function saveAndDisplay() {
        localStorage.setItem("students", JSON.stringify(students)); // Save data to localStorage

        // Render the table headers and student data dynamically
        table.innerHTML = `
            <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>Actions</th>
            </tr>` +
            (students.length ? students.map((s, index) => 
                `<tr>
                    <td>${s.name}</td>
                    <td>${s.id}</td>
                    <td>${s.email}</td>
                    <td>${s.contact}</td>
                    <td>
                        <button class="edit" onclick="editStudent(${index})">Edit</button>
                        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                    </td>
                </tr>`).join("") 
            : "<tr><td colspan='5'>No students added</td></tr>"); // Display message if no students exist
    }

    // Form submission event handler
    form.onsubmit = function (e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Get input values and trim whitespace
        const name = document.getElementById("studentName").value.trim(),
              id = document.getElementById("studentID").value.trim(),
              email = document.getElementById("emailID").value.trim(),
              contact = document.getElementById("contactNo").value.trim();

        // Validate input fields
        if (!name || !id || !email || !contact) {
            alert("All fields are required!");
            return;
        }

        // Additional validation for correct data format
        if (!/^[a-zA-Z\s]+$/.test(name) || !/^\d+$/.test(id) || !/^\d+$/.test(contact) || !/^\S+@\S+\.\S+$/.test(email)) {
            alert("Invalid input data!");
            return;
        }

        // Add student data to the array
        students.push({ name, id, email, contact });
        form.reset(); // Reset form fields
        saveAndDisplay(); // Update localStorage and table display
    };

    // Function to edit a student entry
    window.editStudent = function (index) {
        const student = students[index]; // Retrieve student data
        
        // Populate form fields with the student's existing data
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentID").value = student.id;
        document.getElementById("emailID").value = student.email;
        document.getElementById("contactNo").value = student.contact;

        students.splice(index, 1); // Remove student from the array temporarily
        saveAndDisplay(); // Update display
    };

    // Function to delete a student entry
    window.deleteStudent = function (index) {
        students.splice(index, 1); // Remove student from the array
        saveAndDisplay(); // Update display and localStorage
    };

    // Initial rendering of student data
    saveAndDisplay();
});
