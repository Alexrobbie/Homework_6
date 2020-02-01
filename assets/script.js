var cityName="";
var citystorage=[];
var onclick="\"out()\"";
function tst(a) {
    console.log(a.innerHTML);
}
function out(a)  {
    cityName=a.innerHTML;
    var ln=0;
    var lt=0;
    console.log(cityName);
    $.ajax({url:"https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&APPID=46b1f5cf6cf2894bcfe8b8ad6d542da8",method:"GET"}).then(function(result) {
    
    $(".info").remove();
    $("#weather").append("<div class=info>Temperature: "+result.main.temp+"F</div>");
    $("#weather").append("<div class=info>Humidity: "+result.main.humidity+"%</div>");
    $("#weather").append("<div class=info>Wind Speed: "+result.wind.speed+"MPH</div>");
    ln=result.coord.lon;
    lt=result.coord.lat;
    $.ajax({url:"https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&APPID=46b1f5cf6cf2894bcfe8b8ad6d542da8",method:"GET"}).then(function(result) {
    console.log(result);
    var forecastCounter=1;
    for (i=0;i<40;i=i+8) {
        var TempF=result.list[i].main.temp;
        console.log(TempF+"F");
        var Hum=result.list[i].main.humidity
        console.log(Hum+"%");
        var rain=result.list[i].weather[0].main
        console.log(rain);

        var day=result.list[i].dt_txt;day=day.slice(0,10);
        console.log(day);
        var iconcode = result.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon'+forecastCounter).attr('src', iconurl);
        $("#forecast"+forecastCounter).append("<div class=info>"+day+"</div>");
        $("#forecast"+forecastCounter).append("<div class=info>"+TempF+"F</div>");
        $("#forecast"+forecastCounter).append("<div class=info>"+rain+"</div>");
        $("#forecast"+forecastCounter).append("<div class=info>"+Hum+"% Humidity</div>");
        forecastCounter++;
        $(".icon").css("opacity","1");
    }
});
    setTimeout(function(){
        $.ajax({url:"https://api.openweathermap.org/data/2.5/uvi?lat="+lt+"&lon="+ln+"&APPID=46b1f5cf6cf2894bcfe8b8ad6d542da8",method:"GET"}).then(function(result) {
        $("#weather").append("<div class=info>UV Index: "+result.value+"</div>");
    });
},100);
});
}

function btn() {
    cityName=$("#city").val();
    citystorage.push(cityName);
    localStorage.setItem('cities',JSON.stringify(citystorage));
    $("#placeBtn").prepend("<br><button class=city onclick="+"\"out(this)\""+">"+cityName+"</button>")
    
}

function load() {
    if(localStorage.getItem('cities')!=null) {
        citystorage=JSON.parse(localStorage.getItem('cities'));
        for(i=0;i<citystorage.length;i++) {
        $("#placeBtn").prepend("<br><button class=city onclick="+"\"out(this)\""+">"+citystorage[i]+"</button>")
        }
    }
    
}
function clr() {
    console.log("Got here")
    citystorage=[];
    localStorage.clear();
    $("#placeBtn").empty();
}
load();
