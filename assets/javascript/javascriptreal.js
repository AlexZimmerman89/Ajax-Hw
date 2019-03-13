// Initial array of movies
var movies = ["Call of Duty", "Battlefield V", "Red Dead Redemption", "GTA"];


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&apikey=uBfYrhmpfk1ALCqbcB34yKoTial8rRsS";



    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {



        // Create a movie div class

        var movieDiv = $("<div class='movie'>");
        for (var i = 0; i < 10; i++) {
            var imageUrl = response.data[i].images.fixed_height.url;
            var imageStillUrl = response.data[i].images.fixed_height_still.url;



            var rating = response.data[i].rating;


            var pOne = $("<p>").html("Rating: " + rating);

            movieDiv.append(pOne);
            var image = $("<img>");

            image.attr('src', imageStillUrl);
            image.attr('alt', 'gif');
            image.attr('data-state', 'still');
            image.attr('data-still', imageStillUrl);
            image.attr('data-animate', imageUrl);

            movieDiv.append(image);




            $("body").on("click", "img", function () {


                var state = $(image).attr("animated", "yes");
                console.log(image);





            })

        }






        // Appending the image
        movieDiv.append(image);

        // Putting the entire movie above the previous movies
        $("#buttons-view").append(movieDiv);
    });



}





// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

function checkState() {
    $('img').on('click', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });
};

