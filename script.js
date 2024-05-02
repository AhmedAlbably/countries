const mode = document.getElementById("mode");
const section = document.getElementsByTagName("section");
const header = document.querySelector("header");
const citiesContainer = document.getElementById("citiesContainer");
const countries = document.getElementById("countries");
const inputSearch = document.getElementById("inputSearch");
const homePage = document.querySelector(".home-page");
const cardDetails = document.querySelector(".show-details");
let card = document.querySelector('.card')
let modes = true;

function toggleMode() {
  document.styleSheets[0].deleteRule(0);
  if (modes) {
    document.styleSheets[0].insertRule(
      `
      :root {
        --section-color: hsl(0, 0%, 98%);
        --header-color: hsl(0, 0%, 100%);
        --input-search: hsl(0, 0%, 100%);
        --select-search: hsl(0, 0%, 100%);
        --font-color: hsl(207, 26%, 17%);
      }
      `
    );
  } else {
    document.styleSheets[0].insertRule(
      `
      :root {
        --section-color: hsl(209, 23%, 22%);
        --header-color: hsl(207, 26%, 17%);
        --input-search: hsl(207, 26%, 17%);
        --select-search: hsl(207, 26%, 17%);
        --font-color: hsl(0, 0%, 100%);
      }
      `
    );
  }
  modes = !modes;
}

mode.addEventListener("click", toggleMode);

function showData() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      
      citiesContainer.innerHTML = "";
      data.forEach((country, i) => {
        citiesContainer.innerHTML += `
        
        <div class="card" onclick = "showDetails(${i})">
          <div class="image">
            <img src="${country.flag}" alt="${country.name} flag">
          </div>
          <h3>${country.name}</h3>
          <p>population: ${country.population}</p>
          <p>region: ${country.region}</p>
          <p>capital: ${country.capital}</p>
        </div>
        `;
      });
    });
}

showData();

function filter() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      
      inputSearch.addEventListener("keyup", function () {
        citiesContainer.innerHTML = "";
        data.forEach((country, i) => {
          if (country.name.toLowerCase().startsWith(this.value.toLowerCase())) {
            citiesContainer.innerHTML += `
            <div class="card" onclick = "showDetails(${i})">
            <div class="image">
            <img src="${country.flag}" alt="${country.name} flag">
            </div>
          <h3>${country.name}</h3>
          <p>population: ${country.population}</p>
          <p>region: ${country.region}</p>
          <p>capital: ${country.capital}</p>
          </div>
            `;
          } else if (this.value == "") {
            showData();
          }
        });
      });
    });
}

filter();

function dropMenu() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name;
        option.innerText = country.name;
        countries.appendChild(option);
      });

      let select = document.querySelector("select");
      select.addEventListener("change", function () {
        let selectedOption = this.options[this.selectedIndex].text;
        inputSearch.value = "";
        citiesContainer.innerHTML = "";
        data.forEach((country, i) => {
          if (country.name == selectedOption) {
            citiesContainer.innerHTML += `
          <div class="card" onclick = "showDetails(${i})">
            <div class="image">
            <img src="${country.flag}" alt="${country.name} flag">
            </div>
          <h3>${country.name}</h3>
          <p>population: ${country.population}</p>
          <p>region: ${country.region}</p>
          <p>capital: ${country.capital}</p>
          </div>
            `;
          }
        });
      });
    });
}

dropMenu(); 

function showDetails(i) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((country, index) => {
        if (i === index) {
          cardDetails.innerHTML = 
          `
          <button id="back"  onclick="back()">Back</button>
        <div class"card-details">
          <div class="image">
          <img src="${country.flag}" alt="${country.name} flag">
          </div>
          <h3>${country.nativeName}</h3>
          <p>population: ${country.population}</p>
          <p>region: ${country.region}</p>
          <p>subregion: ${country.subregion}</p>
          <p>capital: ${country.capital}</p>
          <p>top level domain: ${country.topLevelDomain}</p>
          <p>currencies: ${country.currencies[0].name}</p>
          <p>languages: ${country.languages.map((lang) => {
          return `${lang.name}`;
          })}</p>
          <p>border countries: ${country.borders.map((border) => {
            return `${border}`;
          })}
        </div>
        `;
        const anotherPage =window.location.href = './Details.html'
        cardDetails = anotherPage
        }

      });
    });
}



function back() {
  homePage.style.display = "block";
  cardDetails.style.display = "none";
}

