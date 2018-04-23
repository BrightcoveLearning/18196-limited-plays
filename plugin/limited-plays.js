videojs.registerPlugin('limitedPlays', function() {

    // Function to read the browser cookie
    var read_cookie = function (key) {
        var result;
        return (result = new RegExp('(^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? result[2] : null;
    }

    // Initialize variables and read the browser cookie associate with Brightcove video views
    var myPlayer = this,
        videoStart = 0,
        currentPosition,
        cookie = read_cookie("BC_views");

    // Define an error message for when the user has reached the max number of views
    myPlayer.errors({
        "errors": {
            "-3": {
                "headline": "You've reached your maximum views.",
                "type": "USER_MAX_VIEWS",
                "message": "Please come back tomorrow."
            }
        }
    });

    // Display the cookie value
    document.getElementById("cookieDisplay1").innerHTML = cookie;
    // If the cookie value is greater than or equal to 2, then display the custom error message
    if (cookie != null && cookie >= 2) {
        // Wait for the player to be loaded before displaying the message
        myPlayer.on("loadedmetadata", function () {
            myPlayer.error({
              code: '-3',
              dismiss: false
            });
        })
    }

    // Each time the user plays the video, increment the browser cookie
    myPlayer.one("play", function () {
        var d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        cookie++;
        document.cookie = "BC_views=" + cookie + ";expires=" + d.toUTCString();
    });

});
