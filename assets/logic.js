var topics = ["sherlock", "the hobbit", "psych", "star wars", "supernatural", "monk", "stranger things", "the office"];
function displayGifs(){


var search = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KgQT1tWQR2eNZWO3gasRCdTbaZwSrbIu&q=" + search + "&limit=10&offset=0&rating=PG-13&lang=en"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      for (var i = 0; i < response.data.length; i++){

    var gifDiv = $("<div class='gifs-view'>");
    gifDiv.addClass("col-md-4 responsive");
    var stillImgUrl = response.data[i].images.fixed_height_still.url;
    var animateImgUrl = response.data[i].images.fixed_height.url;

    // var imgURL = response.data.original;

    var imgURL = $("<img>").attr("src", stillImgUrl);
    imgURL.attr("data-still",stillImgUrl);
    imgURL.attr("data-animate", animateImgUrl);
    imgURL.attr("data-state", "still");
    imgURL.addClass("gif");
    

    var ratingData = response.data[i].rating;
    var ratingView = $("<p>").text("Rating: " + ratingData);
    gifDiv.append(imgURL, ratingView);

    $("#Gifs").prepend(gifDiv);

    console.log(response);
      };
  });
}

function renderButtons(){
    $("#Gifbtn").empty();

    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var btn = $("<button>");
        // Adding a class of movie-btn to our button
        btn.addClass("gif-btn btn btn-info");
        // Adding a data-attribute
        btn.attr("data-name", topics[i]);
        // Providing the initial button text
        btn.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#Gifbtn").append(btn);
      }
    }

    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var search = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(search);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      function startStopGifs(){
          var state = $(this).attr("data-state");
          if (state === "still"){
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");

          }else{
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            };
          };

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".gif-btn", displayGifs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(document).on("click", ".gif", startStopGifs);


 
  // Things we need
  //1 an array of topics to populate into buttons to query gifs
  //dynamically create those buttons into the DOM
  //Probably will need on click listeners
  //will need a for loop to loop through the array
  //need a search bar so user can create a new button to search gifs
  //