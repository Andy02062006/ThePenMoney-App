document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const aadhar = document.getElementById('aadhar').value;
    const password = document.getElementById('password').value;

    // Here you can add validation for Aadhaar and password
    // For now, we assume the login is successful

    alert('Logged in successfully with Aadhaar: ' + aadhar);
    // Redirect to the welcome page
    window.location.href = 'welcome.html';
});
