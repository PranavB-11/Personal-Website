document.addEventListener("DOMContentLoaded", function () {
    // Get the current timestamp in seconds
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
            console.log("Main Page viewed for: " + duration + " seconds");

            // Optional: You can send this duration to a server for more persistent tracking
        }
    });
});
