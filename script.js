$(document).ready(function() {
  $(function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var yyyy = today.getFullYear();

    today = dd + " " + month[mm] + " " + yyyy;
    $("#currentDate").text("Today, " + today);
  });
  var city = [];
  $(".main").hide();
  $(".forecast").hide();
  $(".footer").hide();
  $("#send").click(function(e) {
    e.preventDefault();
    var grad = $("#grad_value").val();
    if (grad !== "") {
      $.ajax({
        type: "GET",
        url:
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          grad +
          "&appid=6440188aff2876c70eb66a0dd2f8ff08&units=metric",
        dataType: "jsonp",
        success: function(podaci) {
          $(".main").show();
          city.push(grad);
          $("#weather")
            .empty()
            .text(podaci.weather[0].description);
          $("#grad")
            .empty()
            .text(podaci.name);
          $("#temperatura")
            .empty()
            .text(podaci.main.temp + "°C");
          $("#pressure")
            .empty()
            .append("Pressure: " + podaci.main.pressure + " hPa");
          $("#humidity")
            .empty()
            .append("Humidity: " + podaci.main.humidity + " %");
          $("#minTemp")
            .empty()
            .append("Min temperature: " + podaci.main.temp_min + "°C");
          $("#maxTemp")
            .empty()
            .append("Max temperature: " + podaci.main.temp_max + "°C");
          $("#windSpeed")
            .empty()
            .append("Wind Speed: " + podaci.wind.speed + " m/s");
          $("#windDirection")
            .empty()
            .append("Wind Direction: " + podaci.wind.deg + "°");
          $("#ikon").attr(
            "src",
            "http://openweathermap.org/img/w/" + podaci.weather[0].icon + ".png"
          );
          $("html, body").animate(
            {
              scrollTop: $(".main").offset().top
            },
            1000
          );
        }
      });
    } else $("#grad_value").attr("placeholder", "Please enter field");
  });

  $(function() {
    var imgArray = ["https://wallpaperplay.com/walls/full/c/8/4/14767.jpg"],
      randomNumber = Math.floor(Math.random() * imgArray.length),
      baseUrl = "url('" + imgArray[randomNumber] + "')";
    $(".intro").css("background-image", baseUrl);
  });

  $("#gumb").click(function(e) {
    e.preventDefault();
    var grad2 = city.slice(-1)[0];
    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        grad2 +
        "&appid=9dcd8991f9f548f9d28bc5cf37a80c4e&units=metric",
      dataType: "jsonp",
      success: function(podaci) {
        $("#forecastWeather").empty();
        $(".forecast").show();
        $(".footer").show();
        var table = "";
        for (var i = 6; i < podaci.list.length; i += 8) {
          table += "<tr>";
          table += "<td>" + podaci.list[i].dt_txt.split(" ")[0];
          table +=
            "<td><img src='http://openweathermap.org/img/w/" +
            podaci.list[i].weather[0].icon +
            ".png'></td>";
          table += "<td>" + podaci.list[i].main.temp + "</td>";
          table += "<td>" + podaci.list[i].weather[0].description + "</td>";
          table += "<td>" + podaci.list[i].main.temp_min + "°C</td>";
          table += "<td>" + podaci.list[i].main.temp_max + "°C</td>";
          table += "<td>" + podaci.list[i].main.pressure + "hPa</td>";
          table += "<td>" + podaci.list[i].main.humidity + "%</td>";
          table += "<td>" + podaci.list[i].wind.speed + "m/s</td>";
          table += "<td>" + podaci.list[i].wind.deg + "°</td>";
          table += "</tr>";
        }
        $("#forecastWeather").append(
          "<thead><tr><td>Date</td><td>Weather</td><td>Temperature</td><td>Description</td><td>Min temp</td><td>Max Temp</td><td>Pressure</td><td>Humidity</td><td>Wind Speed</td><td>Wind Direction</td></tr></thead>"
        );
        $("#forecastWeather").append(table);
        $("#nextFiveDays")
          .empty()
          .append("5 Day Forecast for " + podaci.city.name);
        $("html, body").animate(
          {
            scrollTop: $(".forecast").offset().top
          },
          1000
        );
      }
    });
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $("#scroll").fadeIn();
    } else {
      $("#scroll").fadeOut();
    }
  });
  $("#scroll").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      600
    );
    $(".forecast").hide(2000);
    return false;
  });
});
