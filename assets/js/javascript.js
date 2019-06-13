$(document).ready(function () {
//gloabl vars
    var searches = [""];
    var $input = $("#input")
    var $submit = $("#submit")


    function gifSearch(queryURL) {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifDiv = $("<div>");
                var gif = $("<img>").addClass("gif")
                gif.attr("src", results[i].images.fixed_height.url);
                gif.attr("data-still", results[i].images.fixed_height_still.url)
                gif.attr("data-animate", results[i].images.fixed_height.url);
                gif.attr("data-state","still");
                gifDiv.prepend(p);
                gifDiv.prepend(gif);
                $("#gifResults").prepend(gifDiv);
            }

        });
    }

    $submit.on("click", function (event) {
        event.preventDefault();
        var inputVal = $input.val();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            inputVal + "&api_key=45zxSKlTqQdhczN4lZ9kDpkakQAQoWj1&limit=10&rating=g";
            searches.push(inputVal);
        var buttn = $("<button>");
        buttn.attr("val", inputVal).addClass("userSearch");
        buttn.text(inputVal)
        $("#buttons").append(buttn);
        gifSearch(queryURL);
    });

    $("body").on("click",".userSearch", function () {
       var buttnVal = $(this).attr("val");
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       buttnVal + "&api_key=45zxSKlTqQdhczN4lZ9kDpkakQAQoWj1&limit=10&rating=g";
       gifSearch(queryURL);
    })


    // pausing gif code
    var state = $(this).attr("data-state");
    $("body").on("click", ".gif", function() {
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
      });


});