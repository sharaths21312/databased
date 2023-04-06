var aud_filter = new Set(["Advanced", "Intermediate", "Beginner"]);
var type_filter = new Set([
  "Seminar",
  "Talk",
  "Competition",
  "Workshop",
  "Hackathon",
  "Other",
]);
function layCards(cards, type_filter, aud_filter) {
  document.getElementById("container").innerHTML = "";
  let card_containers = [];
  let heights = [];
  for (let i = 0; i < 4; i++) {
    const card_container = document.createElement("div");
    card_container.className = "card_container";
    card_containers.push(card_container);
    heights.push(0);
  }

  let NUM_CONTAINERS = Math.max(
    Math.floor(
      document.querySelector("main").getBoundingClientRect().width / 300
    ),
    1
  );
  for (let i = 0; i < NUM_CONTAINERS; i++) {
    document.getElementById("container").appendChild(card_containers[i]);
  }
  cards.forEach(function (card) {
    let aud = card.getElementsByClassName("audTag")[0].getAttribute("data-aud");
    if (!aud_filter.has(aud)) {
      return;
    }

    let typeTagList = card.getElementsByClassName("typeTag");
    let card_types = [...typeTagList].map(function (tag) {
      return tag.getAttribute("data-type");
    });

    let common_types = card_types.filter((x) => type_filter.has(x));
    if (common_types.length == 0) {
      return;
    }

    const min_height = Math.min(...heights.slice(0, NUM_CONTAINERS));
    const min_height_index = heights.indexOf(min_height);
    card_containers[min_height_index].appendChild(card);
    heights[min_height_index] += card.clientHeight;
    console.log(1);
  });
}

var cards = [];
fetch(
  `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Events?maxRecords=1000&view=Grid%20view`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409`,
    },
  }
)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    response.records.forEach(function (row) {
      // let typeString = "";
      // row.fields.Type.forEach(function (type) {
      //     if (type != "") {
      //         typeString += `<span class="typeTag" type="${type}">${type}</span>`;
      //         type_filter.add(type);
      //     }
      // });
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML += `<h2>${row.fields.Name}</h2>`;
      card.innerHTML += `<span data-aud=${row.fields.Audience} class="audTag ${row.fields.Audience}">${row.fields.Audience}</span>`;
      card.innerHTML += `<span data-type=${row.fields.Type} class="typeTag">${row.fields.Type}</span>`;
      card.innerHTML += `<span class="topicTag">${row.fields.Topics}</span>`;
      card.innerHTML += `<span class="dateTag">${row.fields.Date}</span>`;
      card.innerHTML += `<button id="learnMore" onclick="document.getElementById('modal').style.display='flex'">Learn More</button>`;
      card.innerHTML += `<div id="modal" class="modal"><div class="modal-content">
            <span class="close" onclick="document.getElementById('modal').style.display='none'">&times;</span>
            <p class='p'>${row.fields.Description}</p>
            <img src="${row.fields.Files[0].url}" style="width:100%">
            </div>
            </div>`;
      cards.push(card);
    });

    layCards(cards, type_filter, aud_filter);

    type_filter.forEach(function (type) {
      document.querySelector(
        ".filter[data-type=type]"
      ).innerHTML += `<button class="active" data="${type}">${type}</button>`;
    });
    document.querySelectorAll(".filter button").forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        let data_type = this.parentElement.getAttribute("data-type");

        if (this.classList.contains("active")) {
          this.classList.remove("active");
          window[data_type + "_filter"].delete(this.getAttribute("data"));
        } else {
          this.classList.add("active");
          window[data_type + "_filter"].add(this.getAttribute("data"));
        }
      });
    });
    unload();
  });
window.addEventListener(
  "resize",
  function (event) {
    layCards(cards, type_filter, aud_filter);
  },
  true
);
