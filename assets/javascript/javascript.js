// Initial array of animals
var animals = ['Call of Duty', 'Red Dead Redemption', 'Battlefield V', 'Resident Evil'];

// ========================================================

function displayGif() {

    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    $.ajax({ url: queryURL, method: 'GET' }).done(function (response) {

        console.log(response);

        $("#animalsView").empty();
        for (var i = 0; i < response.data.length; i++) {

            var rating = response.data[i].rating;
            var imageUrl = response.data[i].images.fixed_height.url;
            var imageStillUrl = response.data[i].images.fixed_height_still.url;

            var image = $("<img>");
            var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

            image.attr("data-title", "easter egg");
            image.attr('src', imageStillUrl);
            image.attr('alt', 'gif');
            image.attr('data-state', 'still');
            image.attr('data-still', imageStillUrl);
            image.attr('data-animate', imageUrl);
            console.log(image);


            $('#animalsView').prepend(image, ratingText);
            checkState();
        }
    });
}

function renderButtons() {

    $('#buttonsView').empty();

    for (var i = 0; i < animals.length; i++) {

        var newButton = $('<button class="btn btn-danger">') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        newButton.addClass('animal'); // Added a class 
        newButton.attr('data-name', animals[i]); // Added a data-attribute
        newButton.text(animals[i]); // Provided the initial button text
        $('#buttonsView').append(newButton); // Added the button to the HTML
    }
}

$('#addAnimal').on('click', function () {

    var animal = $('#animal-input').val().trim();

    animals.push(animal);

    renderButtons();

    return false;
})


$(document).on('click', '.animal', displayGif);

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