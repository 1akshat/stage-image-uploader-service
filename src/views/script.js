// views/script.js
document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('upload-form');
    const loader = document.getElementById('loader');
    const success = document.getElementById('success');
  
    uploadForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Show loader
      loader.classList.remove('d-none');
  
      // Simulate delay (replace this with actual AJAX request)
      setTimeout(function () {
        // Hide loader
        loader.classList.add('d-none');
  
        // Show success message
        success.classList.remove('d-none');
      }, 2000); // Simulated delay of 2 seconds (adjust as needed)
    });
  });
  