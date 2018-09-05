
        var topics = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw"];
        function clear() {
          $("#images").empty();
        }
        function displayGif() {
          clear();
          var input = $(this).attr("data-name");
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=dc6zaTOxFJmzC&limit=10";
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function (response) {
            console.log(response);
            var animals = response.data;
            for (var i = 0; i < animals.length; i++) {
              var rating = (animals[i].rating);
              var image = (animals[i].images.fixed_height_still.url);
              // var imageAnimate = (animals[i].images.fixed_height.url);
              var p = $("<p>").html("Rating: " + rating);
              var img = $("<img>").attr("src", image).addClass("gif").attr('data-state', 'still').attr('data-still', response.data[i].images.fixed_height_still.url).attr('data-animate', response.data[i].images.fixed_height.url);
              var div = $("<div>").append(p, img);
              var br = $("<br><br>");
              $("#images").prepend(div, br);
            }
            $(".gif").on("click", function () {
              var state = $(this).attr("data-state");
              
              if (state === "still") {
                $(this).attr("src", $(this).attr('data-animate'));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr('data-still'));
                $(this).attr("data-state", "still");
              }
            }
            )
          })
          // Prepending the animalImage to the images div
        }
        function renderButtons() {
          // Deleting the movies prior to adding new movies
          // (this is necessary otherwise you will have repeat buttons)
          $("#buttons-view").empty();
          // Looping through the array of movies
          for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("topic-btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            a.addClass("btn btn-secondary");
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
          }
        }
        $("#add-movie").on("click", function (event) {
          event.preventDefault();
          // This line grabs the input from the textbox
          var topic = $("#topic-input").val().trim();
          // Adding movie from the textbox to our array
          topics.push(topic);
          // Calling renderButtons which handles the processing of our movie array
          renderButtons();
        });
        $(document).on("click", ".topic-btn", displayGif);
        renderButtons();