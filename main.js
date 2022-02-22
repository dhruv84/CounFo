const btn = document.querySelector(".header_form-btn");
const form = document.querySelector(".header_input");
const btn_preview = document.querySelector(".btn_preview");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    document.querySelector(".navbar").classList.add("navbar_scroll");
  } else {
    document.querySelector(".navbar").classList.remove("navbar_scroll");
  }
});

class Alert {
  constructor(message) {
    this.message = message;
    this.doc = document.body;
  }

  renderAlert() {
    if (document.querySelector(".alert_message")) return;

    const markup = `<p class="alert_message">${this.message}</p>`;

    this.doc.insertAdjacentHTML("afterbegin", markup);

    setTimeout(() => {
      document.querySelector(".alert_message").classList.add("move_up");
    }, 2000);

    setTimeout(() => {
      document.querySelector(".alert_message").remove();
    }, 2100);
  }
}

if (btn) {
  btn.addEventListener("click", async () => {
    try {
      const name = form.value;
      if (!name) return;

      document.querySelector(".loading").style.display = "block";

      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.json();
      const passData = name === "china" ? data[2] : data[0];
      const markup = renderMarkup(passData);

      document.querySelector(".loading").style.display = "none";

      document.body.insertAdjacentHTML("beforeend", markup);

      document.querySelector(".toPreview").style.display = "block";
      document.querySelector(".country").scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      document.querySelector(".loading").style.display = "none";

      new Alert("Something went wrong, please try again!").renderAlert();
    }
  });
}

function renderMarkup(country) {
  console.log(country);
  const languages = Object.keys(country.languages);

  if (document.querySelector(".country")) {
    document.querySelector(".country").remove();
  }
  // <img class="country_flag" src="${country.flags.png}" alt="flag" />

  return `
    <div id="country" class="country">
      <img class="country_img" src="${
        country.coatOfArms.svg
      }" alt="coat of arm" />
      <div class="country_info">
        <p class="country_title">${country.name.common}</p>
        <div class="country_items">
          <div class="country_info-sec">
          <p><span class="list_dot"></span>Capital</p>
          <p class="text-color">${country.capital[0]}</p>
          </div>
          <div class="country_info-sec">
            <p><span class="list_dot"></span>Region</p>
            <p class="text-color">${country.region}</p>
          </div>
          <div class="country_info-sec">
            <p><span class="list_dot"></span>Sub Region</p>
            <p class="text-color">${country.subregion}</p>
          </div>
          <div class="country_info-sec">
            <p><span class="list_dot"></span>Language</p>
            <p class="text-color">${languages.map(
              (language) => country.languages[language]
            )}</p>
          </div>
          <div class="country_info-sec">
            <p><span class="list_dot"></span>Latitude</p>
            <p class="text-color">${country.latlng[0]}</p>
          </div>
          <div class="country_info-sec">
            <p><span class="list_dot"></span>Longitude</p>
            <p class="text-color">${country.latlng[1]}</p>
          </div>
          <div class="country_info-sec">
            <p><span class="list_dot"></span>Borders</p>
            <p class="text-color">${
              country.borders.length > 5
                ? `${country.borders[0]}, ${country.borders[1]}, ${country.borders[2]}, ${country.borders[3]}, ${country.borders[4]}`
                : country.borders
            }</p>
          </div>
          <div class="country_info-sec">
            <p><span class="list_dot"></span>Time Zone</p>
            <p class="text-color">${country.timezones[0]}</p>
          </div>
        </div>
      </div>
      <a class="toHeader" href="#header">Search</a>
    </div>
  `;
}
