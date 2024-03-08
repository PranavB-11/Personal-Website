document.addEventListener("DOMContentLoaded", function () {

    var startTime = Math.floor(new Date().getTime() / 1000);

    localStorage.setItem("pageVisitStartTime", startTime);

    var linksClicked = {
        linkedInClicked: false,
        instagramClicked: false,
        githubClicked: false
    };

    function setLinkClick(link) {
        if (link) {
            linksClicked[link] = true;
        }
    }

    document.getElementById("linkedin-link").addEventListener("click", function () {
        setLinkClick("linkedInClicked");
    });

    document.getElementById("instagram-link").addEventListener("click", function () {
        setLinkClick("instagramClicked");
    });

    document.getElementById("github-link").addEventListener("click", function () {
        setLinkClick("githubClicked");
    });

    window.addEventListener("beforeunload", function () {
        var storedStartTime = localStorage.getItem("pageVisitStartTime");

        if (storedStartTime) {
            var duration = Math.floor(new Date().getTime() / 1000) - parseInt(storedStartTime);

           
            console.log("Main Page viewed for: " + duration + " seconds");

            console.log('Links Clicked:', linksClicked);

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
