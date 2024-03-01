document.addEventListener("DOMContentLoaded", function () {
    // Get the download button element
    var downloadButton = document.querySelector(".download-button a");

    // Check if the click count is stored in localStorage
    var clickCount = localStorage.getItem("downloadButtonClicks") || 0;

    // Display the initial click count
    console.log("Initial click count: " + clickCount);

    // Add a click event listener to the download button
    downloadButton.addEventListener("click", function () {
        // Increment the click count
        clickCount++;
        
        // Update the localStorage with the new click count
        localStorage.setItem("downloadButtonClicks", clickCount);

        // Display the updated click count
        console.log("Download button clicked " + clickCount + " times.");
    });

    var startTime = Math.floor(new Date().getTime() / 1000);

    // Store the timestamp in localStorage
    localStorage.setItem("pageVisitStartTime", startTime);

    // Add an event listener for the "beforeunload" event to calculate the duration
    window.addEventListener("beforeunload", function () {
        // Get the stored timestamp
        var storedStartTime = localStorage.getItem("pageVisitStartTime");

        if (storedStartTime) {
            // Calculate the duration in seconds
            var duration = Math.floor(new Date().getTime() / 1000) - parseInt(storedStartTime);

            // Display the duration (you can modify this based on your needs)
            console.log("Resume Page viewed for: " + duration + " seconds");

            // Optional: You can send this duration to a server for more persistent tracking
        }
    });
});