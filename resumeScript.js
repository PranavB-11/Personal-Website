document.addEventListener("DOMContentLoaded", function () {
    var startTime = Math.floor(new Date().getTime() / 1000);
    localStorage.setItem("pageVisitStartTime", startTime);

    window.addEventListener("beforeunload", function () {
        var storedStartTime = localStorage.getItem("pageVisitStartTime");

        if (storedStartTime) {
            var duration = Math.floor(new Date().getTime() / 1000) - parseInt(storedStartTime);

            var clickCount = localStorage.getItem("downloadButtonClicks") || 0;
            clickCount++;

            localStorage.setItem("downloadButtonClicks", clickCount);

            console.log("Download button clicked " + clickCount + " times.");
            console.log("Resume Page viewed for: " + duration + " seconds");

            fetch('/logDurationR', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    duration: duration,
                    downloadButtonClicks: clickCount,
                }),
            });
        }
    });
});
