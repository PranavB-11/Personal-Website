document.addEventListener("DOMContentLoaded", function () {
    // Get all project boxes
    const projectBoxes = document.querySelectorAll(".project-box");

    // Add click event listener to each project box
    projectBoxes.forEach((box) => {
        box.addEventListener("click", function () {
            
            // Toggle the 'expanded' class on the clicked box
            this.classList.toggle("expanded");


            // Check if the box is expanded or not
            const isExpanded = this.classList.contains("expanded");

            // Adjust the box content visibility based on the 'expanded' state
            const boxContent = this.querySelector(".box-content");
            if (boxContent) {
                boxContent.style.display = isExpanded ? "block" : "none";
            }
        });
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
            console.log("Project Page viewed for: " + duration + " seconds");

            // Optional: You can send this duration to a server for more persistent tracking
            fetch('/logDurationP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: 'projects',
                    duration: duration,
                }),
            });
        }
    });
});