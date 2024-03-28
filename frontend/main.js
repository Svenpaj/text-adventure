// This is the main JavaScript file for the frontend
document.addEventListener('DOMContentLoaded', function () {
  // This ensures the DOM is fully loaded before executing the script
  
  // Get the button element
  var startBtn = document.getElementById('start-btn');

  // Add event listener to the button
  startBtn.addEventListener('click', function () {
      // Your code to handle the button click goes here
      console.log('Button clicked!');
    alert('Your adventure begins now!');
    // For example, you can redirect to another page
    // window.location.href = 'adventure.html';
  });
});
