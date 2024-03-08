document.addEventListener("DOMContentLoaded", function () {
    // Get the current timestamp in seconds
    var startTime = Math.floor(new Date().getTime() / 1000);

    // Store the timestamp in localStorage
    localStorage.setItem("pageVisitStartTime", startTime);

    // Create an object to track link clicks
    var linksClicked = {
        linkedInClicked: false,
        instagramClicked: false,
        githubClicked: false
    };

    // Function to set link click based on the condition
    function setLinkClick(link) {
        if (link) {
            linksClicked[link] = true;
        }
    }

    // Add click event listeners to the LinkedIn and Instagram links
    document.getElementById("linkedin-link").addEventListener("click", function () {
        setLinkClick("linkedInClicked");
    });

    document.getElementById("instagram-link").addEventListener("click", function () {
        setLinkClick("instagramClicked");
    });

    document.getElementById("github-link").addEventListener("click", function () {
        setLinkClick("githubClicked");
    });

    // Add an event listener for the "beforeunload" event to calculate the duration
    window.addEventListener("beforeunload", function () {
        // Get the stored timestamp
        var storedStartTime = localStorage.getItem("pageVisitStartTime");

        if (storedStartTime) {
            // Calculate the duration in seconds
            var duration = Math.floor(new Date().getTime() / 1000) - parseInt(storedStartTime);

            // Display the duration
            console.log("Main Page viewed for: " + duration + " seconds");

            // Log the links clicked
            console.log('Links Clicked:', linksClicked);

            // Send duration and linksClicked to the server
            fetch('/logData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: 'index',
                    duration: duration,
                    linksClicked: linksClicked,
                }),
            });
        }
    });
});
