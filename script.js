document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var username = document.getElementById("name").value;
    var password = document.getElementById("pass").value;

    // Check if username and password are correct
    if (username === "Tahiat" && password === "Sam") {
        // Redirect to the dashboard page
        window.location.href = "../Dahsboard/dash.html";
    } else {
        alert("Incorrect username or password. Please try again.");
    }
});
