// background image download function
async function downloadBackground() {
    let searchQuery = document.getElementsByClassName('search-query')[0].value.trim();
    let urlImage = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=town&${searchQuery}&client_id=e34189ae187e8dc5d9267764526130431bca2accce797c8784643857a532d8fd`;

    let response = await fetch(urlImage);
    if (response.ok) {
        let answer = await response.json();

        let bodyElement = document.getElementsByTagName("body")[0];
        bodyElement.setAttribute("style", "background-image: url('" + answer.urls.full + "')");
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

// Function to determine the current date and time
function clock() {
    let now = new Date();
    let dayNames = new Array("Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon");

    let d = new Date();
    let month_num = d.getMonth()
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();

    let month = new Array("January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December");

    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;

    let date_time = dayNames[now.getDay()] + " " + day + " " + month[month_num] + " " + hours + ":" + minutes;
    if (document.layers) {
        document.layers.doc_time.document.write(date_time);
        document.layers.doc_time.document.close();
    }
    else document.getElementById("doc_time").innerHTML = date_time;
    setTimeout("clock()", 1000);
}

//location function
function geoFindMe() {
    let mapMe = document.getElementById("map");

    if (!navigator.geolocation) {
        mapMe.Text = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    async function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        async function location() {
            let regionURL = "https://ipinfo.io?token=673bde2b3e36b6";
            let response = await fetch(regionURL);
            let answer = await response.json();
            if (response.ok) {
                let town = answer.city;
                let country = answer.country;
                document.getElementsByClassName("town")[0].innerText = town;
                document.getElementsByClassName("country")[0].innerText = country;
            }
        }
          
            mapMe.innerHTML = "Longitude is " + longitude + " Latitude is " + latitude;

            mapboxgl.accessToken = "pk.eyJ1Ijoia2l0YXJiaXQiLCJhIjoiY2s0MTgyMnFlMDEwYzNvbnExamc3bHgwZyJ9.nvfsyZ4PQNOUEY_yrSBoEg";
            let map = new mapboxgl.Map({
                container: 'map',
                center: [longitude, latitude],
                zoom: 10,
                style: "mapbox://styles/mapbox/satellite-streets-v11"
            });
            location();
    }  
            function error() {
                mapMe.innerText = "Unable to retrieve your location";
            }
            navigator.geolocation.getCurrentPosition(success, error);

            async function determineСurrentTemperature() {
              let temperatureURL = `https://api.darksky.net/forecast/051855bba4117eb3b5ad1ff6ff6ea85e/${latitude},${longitude}`;
              let response = await fetch(temperatureURL);
              let answer = await response.json();
              if (response.ok) {
                  let currentTemperature = answer.temperature;
                  document.getElementsByClassName("temperature-data")[0].innerText = currentTemperature;
                  debugger;
              }
          }
          determineСurrentTemperature();
        }
  clock();
  geoFindMe()

 
