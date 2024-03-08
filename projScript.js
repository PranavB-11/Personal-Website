document.addEventListener("DOMContentLoaded", function () {

    const projectBoxes = document.querySelectorAll(".project-box");

    projectBoxes.forEach((box) => {
        box.addEventListener("click", function () {
            
            this.classList.toggle("expanded");

            const isExpanded = this.classList.contains("expanded");

            const boxContent = this.querySelector(".box-content");
            if (boxContent) {
                boxContent.style.display = isExpanded ? "block" : "none";
            }
        });
    });

    var startTime = Math.floor(new Date().getTime() / 1000);

    localStorage.setItem("pageVisitStartTime", startTime);

    window.addEventListener("beforeunload", function () {

        var storedStartTime = localStorage.getItem("pageVisitStartTime");

        if (storedStartTime) {

            var duration = Math.floor(new Date().getTime() / 1000) - parseInt(storedStartTime);


            console.log("Project Page viewed for: " + duration + " seconds");

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