
var giphies = [];

function renderButtons() {

        $("#giphies-view").empty();

        for (var i = 0; i < giphies.length; i++) {
          var a = $("<button>");
          a.addClass("giphy");
          a.attr("data-name", giphies[i]);
          a.text(giphies[i]);
          $("#giphies-view").append(a);
        }
      };

        $("#add-giphy").on("click", function(event) {
          event.preventDefault();

          var giphy = $("#giphy-input").val().trim();
          giphies.push(giphy);
          $("#giphy-form")[0].reset();
          renderButtons();
        });

$(document).on("click", "button", function() {
  var gif = $(this).attr("data-name");
console.log(gif);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=yLqbUMyxlxr22VOQW7oJ60ySj4sLjt7O&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        console.log(response);
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height.url);
            // gifImage.attr("src",
            // results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr(JSON.stringify('data-state="still"'));

             // + ' ' + 'data-state= + "still"' + ' ' + 'class= + "gif"';

            gifDiv.append(gifImage);

            $("#gifs-appear-here").prepend(gifDiv);

            $(document).on("click", "gif", function() {
              // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
              var state = $(this).attr("data-state");
              // If the clicked image's state is still, update its src attribute to what its data-animate value is.
              // Then, set the image's data-state to animate
              // Else set src to the data-still value
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
          }
        });

    // gifImage.attr("src", results[i].images.fixed_height_still.url);
    // $('.gif').giplayer();
});
