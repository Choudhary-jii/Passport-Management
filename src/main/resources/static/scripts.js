//// Declare these variables at the top of the script (global scope)
//let currentPage = 1;
//const perPage = 10;
//const baseUrl = window.location.origin + '/myapp'; // Base URL with context path
//
//// Wait for the DOM content to be fully loaded before running the code
//document.addEventListener("DOMContentLoaded", function () {
//    // Load the first page with 10 items initially
//    loadPagination(currentPage, perPage);
//
//    // Add event listener for the new user form submission
//    document.getElementById("create-user-form").addEventListener("submit", async (event) => {
//        event.preventDefault();
//
//        const person = {
//            name: document.getElementById("clientname").value,
//            mobileNumber: document.getElementById("clientnumber").value,
//            pspExpMonth: parseInt(document.getElementById("passportexpirymonth").value),
//            pspExpYear: parseInt(document.getElementById("passportexpiryyear").value),
//            pspIssueMonth: parseInt(document.getElementById("passportissuemonth").value),
//            pspIssueYear: parseInt(document.getElementById("passportissueyear").value)
//        };
//
//        try {
//            const response = await fetch(`${baseUrl}/api/addPerson`, {
//                method: "POST",
//                headers: { "Content-Type": "application/json" },
//                body: JSON.stringify(person)
//            });
//
//            if (response.ok) {
//                alert('User added successfully');
//                resetForm();
//                loadPagination(currentPage, perPage); // Refresh the list after adding a new user
//            } else {
//                alert('Failed to create user');
//            }
//        } catch (error) {
//            console.error('Error adding user:', error);
//        }
//    });
//
//    // Event listener for searching by name
//    document.getElementById("findByNameForm").addEventListener("submit", async (event) => {
//        event.preventDefault();
//
//        const name = document.getElementById("personName").value;
//
//        try {
//            const response = await fetch(`${baseUrl}/api/person/name/${name}`);
//
//            if (response.ok) {
//                const data = await response.json();
//                renderTable(data); // Display results in table
//            } else {
//                alert('User not found');
//            }
//        } catch (error) {
//            console.error('Error searching by name:', error);
//        }
//    });
//
//    // Event listener for searching by expiry
//    document.getElementById("findByExpiryForm").addEventListener("submit", async (event) => {
//        event.preventDefault();
//
//        const month = parseInt(document.getElementById("expiryMonth").value);
//        const year = parseInt(document.getElementById("expiryYear").value);
//
//        try {
//            const response = await fetch(`${baseUrl}/api/valid?month=${month}&year=${year}`);
//
//            if (response.ok) {
//                const data = await response.json();
//                renderTable(data); // Display results in table
//            } else {
//                alert('No users found with this expiry date');
//            }
//        } catch (error) {
//            console.error('Error searching by expiry:', error);
//        }
//    });
//
//    // Function to handle pagination next and previous buttons
//    document.getElementById("prev-page").addEventListener("click", function() {
//        if (currentPage > 1) {
//            currentPage--;
//            loadPagination(currentPage, perPage);
//        }
//    });
//
//    document.getElementById("next-page").addEventListener("click", function() {
//        currentPage++;
//        loadPagination(currentPage, perPage);
//    });
//});
//
//// Function to load paginated data
//async function loadPagination(pageNumber, pageSize) {
//    const endpoint = `${baseUrl}/api/pagination/${pageNumber}/${pageSize}`;
//
//    try {
//        const response = await fetch(endpoint);
//        if (!response.ok) {
//            throw new Error(`Error: ${response.statusText}`);
//        }
//
//        const data = await response.json();
//        console.log('Pagination Data:', data);
//        renderTable(data.content); // Adjusted for paginated response
//    } catch (error) {
//        console.error('Pagination API error:', error);
//    }
//}
//
//// Function to render the table with user data
//function renderTable(people) {
//    const tbody = document.getElementById("users-table").getElementsByTagName("tbody")[0];
//    tbody.innerHTML = "";
//
//    people.forEach(person => {
//        const row = document.createElement("tr");
//        row.innerHTML = `
//            <td>${person.id}</td>
//            <td>${person.name}</td>
//            <td>${person.mobileNumber}</td>
//            <td>${person.pspExpMonth}</td>
//            <td>${person.pspExpYear}</td>
//            <td>${person.pspIssueMonth}</td>
//            <td>${person.pspIssueYear}</td>
//            <td>
//                <button class='btn btn-sm btn-info' onclick='openEditModal(${JSON.stringify(person)})'>Edit</button>
//                <button class='btn btn-sm btn-danger' onclick='deletePerson(${person.id})'>Delete</button>
//            </td>`;
//
//        tbody.appendChild(row);
//    });
//}
//
//// Function to reset the form
//function resetForm() {
//    document.getElementById("create-user-form").reset();
//}
//
//// Function to open the edit modal and populate fields
//function openEditModal(person) {
//    // Populate the fields in the edit modal
//    document.getElementById("edit-clientname").value = person.name;
//    document.getElementById("edit-clientnumber").value = person.mobileNumber;
//    document.getElementById("edit-passportexpirymonth").value = person.pspExpMonth;
//    document.getElementById("edit-passportexpiryyear").value = person.pspExpYear;
//    document.getElementById("edit-passportissuemonth").value = person.pspIssueMonth;
//    document.getElementById("edit-passportissueyear").value = person.pspIssueYear;
//    document.getElementById("editModal").dataset.userId = person.id;
//
//    // Show the modal
//    $('#editModal').modal('show');
//}
//
//// Save the edited data
//document.getElementById("save-changes").addEventListener("click", async () => {
//    const userId = document.getElementById("editModal").dataset.userId;
//    const updatedUser = {
//        id: userId,
//        clientName: document.getElementById("edit-clientname").value,
//        clientNumber: document.getElementById("edit-clientnumber").value,
//        passportExpiryMonth: parseInt(document.getElementById("edit-passportexpirymonth").value),
//        passportExpiryYear: parseInt(document.getElementById("edit-passportexpiryyear").value),
//        passportIssueMonth: parseInt(document.getElementById("edit-passportissuemonth").value),
//        passportIssueYear: parseInt(document.getElementById("edit-passportissueyear").value)
//    };
//
//    try {
//        const response = await fetch(`${baseUrl}/api/update/${userId}`, {
//            method: "PUT",
//            headers: { "Content-Type": "application/json" },
//            body: JSON.stringify(updatedUser)
//        });
//
//        if (response.ok) {
//            alert('User updated successfully');
//            $('#editModal').modal('hide');
//            loadPagination(currentPage, perPage); // Refresh the table after updating data
//        } else {
//            alert('Failed to update user');
//        }
//    } catch (error) {
//        console.error('Error updating user:', error);
//    }
//});
//}



//// Declare these variables at the top of the script (global scope)
//let currentPage = 1;
//const perPage = 10;
//const baseUrl = window.location.origin + '/myapp'; // Base URL with context path
//
//// Wait for the DOM content to be fully loaded before running the code
//document.addEventListener("DOMContentLoaded", function () {
//    // Load the first page with 10 items initially
//    loadPagination(currentPage, perPage);
//
//    // Add event listener for the new user form submission
//    document.getElementById("create-user-form").addEventListener("submit", async (event) => {
//        event.preventDefault();
//
//        const person = {
//            name: document.getElementById("clientname").value,
//            mobileNumber: document.getElementById("clientnumber").value,
//            pspExpMonth: parseInt(document.getElementById("passportexpirymonth").value),
//            pspExpYear: parseInt(document.getElementById("passportexpiryyear").value),
//            pspIssueMonth: parseInt(document.getElementById("passportissuemonth").value),
//            pspIssueYear: parseInt(document.getElementById("passportissueyear").value)
//        };
//
//        try {
//            const response = await fetch(`${baseUrl}/api/addPerson`, {
//                method: "POST",
//                headers: { "Content-Type": "application/json" },
//                body: JSON.stringify(person)
//            });
//
//            if (response.ok) {
//                alert('User added successfully');
//                resetForm();
//                loadPagination(currentPage, perPage); // Refresh the list after adding a new user
//            } else {
//                alert('Failed to create user');
//            }
//        } catch (error) {
//            console.error('Error adding user:', error);
//        }
//    });
//
//    // Event listener for searching by name
//    document.getElementById("findByNameForm").addEventListener("submit", async (event) => {
//        event.preventDefault();
//
//        const name = document.getElementById("personName").value;
//
//        try {
//            const response = await fetch(`${baseUrl}/api/person/name/${name}`);
//
//            if (response.ok) {
//                const data = await response.json();
//                renderTable(data); // Display results in table
//            } else {
//                alert('User not found');
//            }
//        } catch (error) {
//            console.error('Error searching by name:', error);
//        }
//    });
//
//    // Event listener for searching by expiry
//    document.getElementById("findByExpiryForm").addEventListener("submit", async (event) => {
//        event.preventDefault();
//
//        const month = parseInt(document.getElementById("expiryMonth").value);
//        const year = parseInt(document.getElementById("expiryYear").value);
//
//        try {
//            const response = await fetch(`${baseUrl}/api/valid?month=${month}&year=${year}`);
//
//            if (response.ok) {
//                const data = await response.json();
//                renderTable(data); // Display results in table
//            } else {
//                alert('No users found with this expiry date');
//            }
//        } catch (error) {
//            console.error('Error searching by expiry:', error);
//        }
//    });
//
//    // Function to handle pagination next and previous buttons
//    document.getElementById("prev-page").addEventListener("click", function() {
//        if (currentPage > 1) {
//            currentPage--;
//            loadPagination(currentPage, perPage);
//        }
//    });
//
//    document.getElementById("next-page").addEventListener("click", function() {
//        currentPage++;
//        loadPagination(currentPage, perPage);
//    });
//});
//
//// Function to load paginated data
//async function loadPagination(pageNumber, pageSize) {
//    const endpoint = `${baseUrl}/api/pagination/${pageNumber}/${pageSize}`;
//
//    try {
//        const response = await fetch(endpoint);
//        if (!response.ok) {
//            throw new Error(`Error: ${response.statusText}`);
//        }
//
//        const data = await response.json();
//        console.log('Pagination Data:', data);
//        renderTable(data.content); // Adjusted for paginated response
//    } catch (error) {
//        console.error('Pagination API error:', error);
//    }
//}
//
//// Function to render the table with user data
//function renderTable(people) {
//    const tbody = document.getElementById("users-table").getElementsByTagName("tbody")[0];
//    tbody.innerHTML = "";
//
//    people.forEach(person => {
//        const row = document.createElement("tr");
//        row.innerHTML = `
//            <td>${person.id}</td>
//            <td>${person.name}</td>
//            <td>${person.mobileNumber}</td>
//            <td>${person.pspExpMonth}</td>
//            <td>${person.pspExpYear}</td>
//            <td>${person.pspIssueMonth}</td>
//            <td>${person.pspIssueYear}</td>
//            <td>
//                <button class='btn btn-sm btn-info' onclick='openEditModal(${JSON.stringify(person)})'>Edit</button>
//                <button class='btn btn-sm btn-danger' onclick='deletePerson(${person.id})'>Delete</button>
//            </td>`;
//
//        tbody.appendChild(row);
//    });
//}
//
//// Function to reset the form
//function resetForm() {
//    document.getElementById("create-user-form").reset();
//}
//
//// Function to open the edit modal and populate fields
//function openEditModal(person) {
//    // Populate the fields in the edit modal
//    document.getElementById("edit-clientname").value = person.name;
//    document.getElementById("edit-clientnumber").value = person.mobileNumber;
//    document.getElementById("edit-passportexpirymonth").value = person.pspExpMonth;
//    document.getElementById("edit-passportexpiryyear").value = person.pspExpYear;
//    document.getElementById("edit-passportissuemonth").value = person.pspIssueMonth;
//    document.getElementById("edit-passportissueyear").value = person.pspIssueYear;
//    document.getElementById("editModal").dataset.userId = person.id;
//
//    // Show the modal
//    $('#editModal').modal('show');
//}
//
//
//
//async function deletePerson(id) {
//    try {
//        const response = await fetch(`${baseUrl}/api/delete/${id}`, { method: "DELETE" });
//
//        if (response.ok) {
//            const userConfirmed = confirm('Are you sure you want to delete?');
//            if (userConfirmed) {
//                const message = await response.text(); // Get the confirmation message from backend
//                alert(message); // Show the confirmation message from the backend
//
//                // Refresh the pagination after deletion
//                loadPagination(currentPage, perPage);
//            }
//        } else {
//            alert('Failed to delete user');
//        }
//    } catch (error) {
//        console.error('Error deleting user:', error);
//    }
//}
//
//
//
//// Save the edited data
//document.getElementById("save-changes").addEventListener("click", async () => {
//    const userId = document.getElementById("editModal").dataset.userId;
//    const updatedUser = {
//        id: userId,
//        clientName: document.getElementById("edit-clientname").value,
//        clientNumber: document.getElementById("edit-clientnumber").value,
//        passportExpiryMonth: parseInt(document.getElementById("edit-passportexpirymonth").value),
//        passportExpiryYear: parseInt(document.getElementById("edit-passportexpiryyear").value),
//        passportIssueMonth: parseInt(document.getElementById("edit-passportissuemonth").value),
//        passportIssueYear: parseInt(document.getElementById("edit-passportissueyear").value)
//    };
//
//    try {
//        const response = await fetch(`${baseUrl}/api/update/${userId}`, {
//            method: "PUT",
//            headers: { "Content-Type": "application/json" },
//            body: JSON.stringify(updatedUser)
//        });
//
//        if (response.ok) {
//            alert('User updated successfully');
//            $('#editModal').modal('hide');
//            loadPagination(currentPage, perPage); // Refresh the table after updating data
//        } else {
//            alert('Failed to update user');
//        }
//    } catch (error) {
//        console.error('Error updating user:', error);
//    }
//});






// Declare these variables at the top of the script (global scope)
let currentPage = 1;
const perPage = 10;
const baseUrl = window.location.origin + '/myapp'; // Base URL with context path

// Wait for the DOM content to be fully loaded before running the code
document.addEventListener("DOMContentLoaded", function () {
    // Load the first page with 10 items initially
    loadPagination(currentPage, perPage);

    // Add event listener for the new user form submission
    document.getElementById("create-user-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const person = {
            name: document.getElementById("clientname").value,
            mobileNumber: document.getElementById("clientnumber").value,
            pspExpMonth: parseInt(document.getElementById("passportexpirymonth").value),
            pspExpYear: parseInt(document.getElementById("passportexpiryyear").value),
            pspIssueMonth: parseInt(document.getElementById("passportissuemonth").value),
            pspIssueYear: parseInt(document.getElementById("passportissueyear").value)
        };

        try {
            const response = await fetch(`${baseUrl}/api/addPerson`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(person)
            });

            if (response.ok) {
                alert('User added successfully');
                resetForm();
                loadPagination(currentPage, perPage); // Refresh the list after adding a new user
            } else {
                alert('Failed to create user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred while adding the user.');
        }
    });

    // Event listener for searching by name
    document.getElementById("findByNameForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("personName").value;

        try {
            const response = await fetch(`${baseUrl}/api/person/name/${name}`);

            if (response.ok) {
                const data = await response.json();
                renderTable(data); // Display results in table
            } else {
                alert('User not found');
            }
        } catch (error) {
            console.error('Error searching by name:', error);
            alert('An error occurred while searching by name.');
        }
    });

    // Event listener for searching by expiry
    document.getElementById("findByExpiryForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const month = parseInt(document.getElementById("expiryMonth").value);
        const year = parseInt(document.getElementById("expiryYear").value);

        try {
            const response = await fetch(`${baseUrl}/api/valid?month=${month}&year=${year}`);

            if (response.ok) {
                const data = await response.json();
                renderTable(data); // Display results in table
            } else {
                alert('No users found with this expiry date');
            }
        } catch (error) {
            console.error('Error searching by expiry:', error);
            alert('An error occurred while searching by expiry date.');
        }
    });

    // Function to handle pagination next and previous buttons
    document.getElementById("prev-page").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            loadPagination(currentPage, perPage);
        }
    });

    document.getElementById("next-page").addEventListener("click", function() {
        currentPage++;
        loadPagination(currentPage, perPage);
    });
});

// Function to load paginated data
async function loadPagination(pageNumber, pageSize) {
    const endpoint = `${baseUrl}/api/pagination/${pageNumber}/${pageSize}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Pagination Data:', data);
        renderTable(data.content); // Adjusted for paginated response
    } catch (error) {
        console.error('Pagination API error:', error);
        alert('An error occurred while loading the paginated data.');
    }
}

// Function to render the table with user data
function renderTable(people) {
    const tbody = document.getElementById("users-table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    people.forEach(person => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.mobileNumber}</td>
            <td>${person.pspExpMonth}</td>
            <td>${person.pspExpYear}</td>
            <td>${person.pspIssueMonth}</td>
            <td>${person.pspIssueYear}</td>
            <td>
                <button class='btn btn-sm btn-info' onclick='openEditModal(${JSON.stringify(person)})'>Edit</button>
                <button class='btn btn-sm btn-danger' onclick='deletePerson(${person.id})'>Delete</button>
            </td>`;

        tbody.appendChild(row);
    });
}

// Function to reset the form
function resetForm() {
    document.getElementById("create-user-form").reset();
}

// Function to open the edit modal and populate fields
function openEditModal(person) {
    // Populate the fields in the edit modal
    document.getElementById("edit-clientname").value = person.name;
    document.getElementById("edit-clientnumber").value = person.mobileNumber;
    document.getElementById("edit-passportexpirymonth").value = person.pspExpMonth;
    document.getElementById("edit-passportexpiryyear").value = person.pspExpYear;
    document.getElementById("edit-passportissuemonth").value = person.pspIssueMonth;
    document.getElementById("edit-passportissueyear").value = person.pspIssueYear;
    document.getElementById("editModal").dataset.userId = person.id;

    // Show the modal (Ensure jQuery and Bootstrap are loaded)
    $('#editModal').modal('show');
}

async function deletePerson(id) {
    const userConfirmed = confirm('Are you sure you want to delete this user?');
    if (!userConfirmed) return; // Cancel delete if not confirmed

    try {
        const response = await fetch(`${baseUrl}/api/delete/${id}`, { method: "DELETE" });

        if (response.ok) {
            const message = await response.text(); // Get the confirmation message from backend
            alert(message); // Show the confirmation message from the backend
            loadPagination(currentPage, perPage); // Refresh the pagination after deletion
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user.');
    }
}

//// Save the edited data
//document.getElementById("save-changes").addEventListener("click", async () => {
//    const userId = document.getElementById("editModal").dataset.userId;
//    const updatedUser = {
//        id: userId,
//        name: document.getElementById("edit-clientname").value,
//        mobileNumber: document.getElementById("edit-clientnumber").value,
//        pspExpMonth: parseInt(document.getElementById("edit-passportexpirymonth").value),
//        pspExpYear: parseInt(document.getElementById("edit-passportexpiryyear").value),
//        pspIssueMonth: parseInt(document.getElementById("edit-passportissuemonth").value),
//        pspIssueYear: parseInt(document.getElementById("edit-passportissueyear").value)
//    };
//
//    try {
//        const response = await fetch(`${baseUrl}/api/update/${userId}`, {
//            method: "PUT",
//            headers: { "Content-Type": "application/json" },
//            body: JSON.stringify(updatedUser)
//        });
//
//        if (response.ok) {
//            alert('User updated successfully');
//            $('#editModal').modal('hide');
//            loadPagination(currentPage, perPage); // Refresh the table after updating data
//        } else {
//            alert('Failed to update user');
//        }
//    } catch (error) {
//        console.error('Error updating user:', error);
//        alert('An error occurred while updating the user.');
//    }
//});


//// Save the edited data
//document.addEventListener("DOMContentLoaded", () => {
//    const saveButton = document.getElementById("save-changes");
//    if (!saveButton) {
//        console.error("Save button not found. Check if 'save-changes' ID exists in the DOM.");
//        return;
//    }
//    console.log("Save button found, adding event listener.");
//
//    saveButton.addEventListener("click", async () => {
//        console.log("Save button clicked.");
//
//        const userId = document.getElementById("editModal").dataset.userId;
//        if (!userId) {
//            console.error("User ID not found in 'editModal' dataset.");
//            return;
//        }
//        console.log("User ID:", userId);
//
//        const updatedUser = {
//            id: userId,
//            clientName: document.getElementById("edit-clientname").value,
//            clientNumber: document.getElementById("edit-clientnumber").value,
//            passportExpiryMonth: parseInt(document.getElementById("edit-passportexpirymonth").value),
//            passportExpiryYear: parseInt(document.getElementById("edit-passportexpiryyear").value),
//            passportIssueMonth: parseInt(document.getElementById("edit-passportissuemonth").value),
//            passportIssueYear: parseInt(document.getElementById("edit-passportissueyear").value)
//        };
//
//        console.log("Updated user data:", updatedUser);
//
//        try {
//            const response = await fetch(`${baseUrl}/api/update/${userId}`, {
//                method: "PUT",
//                headers: { "Content-Type": "application/json" },
//                body: JSON.stringify(updatedUser)
//            });
//
//            console.log("Response status:", response.status);
//
//            if (response.ok) {
//                alert('User updated successfully');
//                $('#editModal').modal('hide');
//                console.log("Data updated successfully, modal hidden.");
//                loadPagination(currentPage, perPage); // Refresh the table after updating data
//            } else {
//                alert('Failed to update user');
//                console.error("Failed to update user. Status:", response.status);
//            }
//        } catch (error) {
//            console.error('Error updating user:', error);
//        }
//    });
//});




// Save the edited data
document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.getElementById("save-changes");
    if (!saveButton) {
        console.error("Save button not found. Check if 'save-changes' ID exists in the DOM.");
        return;
    }
    console.log("Save button found, adding event listener.");

    saveButton.addEventListener("click", async () => {
        console.log("Save button clicked.");

        // Collect user ID and other input data from the modal
        const userId = document.getElementById("editModal").dataset.userId;
        if (!userId) {
            console.error("User ID not found in 'editModal' dataset.");
            return;
        }
        console.log("User ID:", userId);

        const updatedUser = {
            id: parseInt(userId),
            name: document.getElementById("edit-clientname").value,
            mobileNumber: parseInt(document.getElementById("edit-clientnumber").value),
            pspExpMonth: parseInt(document.getElementById("edit-passportexpirymonth").value),
            pspExpYear: parseInt(document.getElementById("edit-passportexpiryyear").value),
            pspIssueMonth: parseInt(document.getElementById("edit-passportissuemonth").value),
            pspIssueYear: parseInt(document.getElementById("edit-passportissueyear").value),
            dataCreationDate: document.getElementById("edit-data-creation-date")?.value || null // Ensure this matches your data format
        };

        console.log("Updated user data:", updatedUser);

        try {
            const response = await fetch(`${baseUrl}/api/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser)
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                alert('User updated successfully');
                $('#editModal').modal('hide');
                console.log("Data updated successfully, modal hidden.");
                loadPagination(currentPage, perPage); // Refresh the table after updating data
            } else {
                alert('Failed to update user');
                console.error("Failed to update user. Status:", response.status);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    });
});
