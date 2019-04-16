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
    
    $(document).on("click", ".image", function () {
        var animateUrl = $(this).attr("data-animate");
        console.log(animateUrl);
        var stillUrl = $(this).attr("data-still");
        console.log(stillUrl);
        var currentSrc = $(this).attr("src");
        console.log(currentSrc);

        if(currentSrc === stillUrl){
            $(this).attr("src", animateUrl);
        } else {
            $(this).attr("src", stillUrl);
        }
    })
})

// display gifs
function displayGifs(url) {

    $.get(url)
        .then(function (response) {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                var gif = $("<img>");
                gif.attr("data-still", response.data[i].images.fixed_height_small_still.url);
                gif.attr("data-animate", response.data[i].images.fixed_height_small.url);
                gif.attr("src", response.data[i].images.fixed_height_small_still.url);
                
                gif.addClass("image");
                $("#gifDisplay").append(gif);
            }
        })
}

//   display buttons
function displayButtons(topics) {
    for (var i = 0; i < topics.length; i++) {
        console.log(topics[i])
        var button = $("<button>");
        button.text(topics[i]);
        button.addClass("sport");
        button.attr("data-name", topics[i]);
        $("#buttons").append(button);
    }
}