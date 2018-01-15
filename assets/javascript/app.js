
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
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=yLqbUMyxlxr22VOQW7oJ60ySj4sLjt7O&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var gifImage = $("<img>");

            // gifImage.attr("src", results[i].images.fixed_height.url);
            gifImage.attr("src",
            results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-still", "still");
            gifImage.attr("class", "gif");

            gifDiv.append(gifImage);

            $("#gifs-appear-here").prepend(gifDiv);

            $(document).on("click", "img.gif", function() {

              var state = $(this).attr("data-state");

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
});
