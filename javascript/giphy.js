$(document).ready(function () {

    var topics = ["Hockey", "Football", "Basketball", "Baseball", "Soccer", "Golf", "Volleyball"]
    displayButtons(topics);


    // create buttons for each array item - loop through variable and add buttons
    // click on button, 10 non-animated gifs appear
    // when user clicks on gif, they animate
    // if clicked again, they'll stop animating
    // each gif will display rating under it
    // Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

    // click button, display gifs related
    $(document).on("click", ".sport", function () {
        $("#gifDisplay").empty();
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LnrgzY7g8GFkXcrn9YrMROQXNm8tOCxg&limit=10&q=" + topic
        displayGifs(queryURL);

    })

    $(document).on("click", "#add-sport", function(event) {
        event.preventDefault();
        var newButton = $("#sports-input").val().trim();
        topics.push(newButton);
        displayButtons(topics);
        $("#sports-input").empty();
    })

    $(document).on("click", ".image", function () {
        var animateUrl = $(this).attr("data-animate");
        var stillUrl = $(this).attr("data-still");
        var currentSrc = $(this).attr("src");

        if (currentSrc === stillUrl) {
            $(this).attr("src", animateUrl);
        } else {
            $(this).attr("src", stillUrl);
        }
    })
})

// display gifs
function displayGifs(queryURL) {

    $.get(queryURL)
        .then(function (response) {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                var gif = $("<img>");
                gif.attr("data-still", response.data[i].images.fixed_height_small_still.url);
                gif.attr("data-animate", response.data[i].images.fixed_height_small.url);
                gif.attr("src", response.data[i].images.fixed_height_small_still.url);

                // display ratings
                var rating = response.data[i].rating
                var p = $("<p>").text("Rating: " + rating);
                $("#gifDisplay").append(p);

                gif.addClass("image");
                $("#gifDisplay").append(gif);
            }
        })
}


//   display buttons
function displayButtons(topics) {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.text(topics[i]);
        button.addClass("sport btn btn-primary");
        button.attr("data-name", topics[i]);
        $("#buttons").append(button);
    }
}