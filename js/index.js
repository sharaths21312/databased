fetch(
  `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Events?maxRecords=6&view=Grid%20view`,
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
      if (!row.fields.Files) {
        var imgSrc = ["../img/Backgrounds/Ngaruroro.png"];
      } else {
        var imgSrc = row.fields.Files.map(function (e) {
          return e.url;
        });
      }
      var cardDiv = document.createElement("div");
      cardDiv.innerHTML = `
          <div class="eventCardImg" style="background-image: url(${
            imgSrc[0]
          })"></div>
          <div class="eventCardContent">
              <span class="eventCardDate">${new Date(
                row.fields.Date
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}</span>
              <h2 class="eventCardTitle">${row.fields.Name}</h2>
              <span class="eventCardType">${row.fields.Type}</span>
          </div>`;
      document.querySelector("#eventsGrid").appendChild(cardDiv);

      var imgTags = "";
      imgSrc.forEach(function (e) {
        imgTags += `<img src="${e}">`;
      });
      var topicTags = "";
      if (row.fields.Topics) {
        row.fields.Topics.forEach(function (e) {
          topicTags += `<span class="modalTopic">${e}</span>`;
        });
      }
      cardDiv.addEventListener("click", function () {
        document.querySelector("#eventModal").style.display = "block";
        document.querySelector("#eventModal .imagesContainer").innerHTML =
          imgTags;
        document.querySelector(
          "#eventModal .modalImg"
        ).style.backgroundImage = `url(${imgSrc[0]})`;
        document.querySelector("#eventModal .imagesButtons").innerHTML =
          `<button onClick="eventsModalImage(this)"></button>`.repeat(
            imgSrc.length
          );
        document
          .querySelector("#eventModal .imagesButtons button")
          .classList.add("active");
        document.querySelector("#eventModal .modalHeading").innerHTML =
          row.fields.Name;
        document.querySelector(
          "#eventModal .modalDate"
        ).innerHTML = `<span class="material-symbols-outlined">
          event_available
          </span> ${new Date(row.fields.Date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}`;
        document.querySelector(
          "#eventModal .modalPlace"
        ).innerHTML = `<span class="material-symbols-outlined">
          location_on
          </span> ${row.fields.Location}`;
        document.querySelector("#eventModal .modalType").innerHTML =
          row.fields.Type;
        document.querySelector("#eventModal .modalAudience").innerHTML =
          row.fields.Audience;
        document.querySelector("#eventModal .modalTopics").innerHTML =
          topicTags;
        document.querySelector("#eventModal .modalDescription").innerHTML =
          row.fields.Description;
      });
    });
    tryUnload();
  });

function eventsModalImage(e) {
  var i = Array.from(
    document.querySelectorAll("#eventModal .imagesButtons button")
  ).indexOf(e);
  e.addEventListener("click", function () {
    document
      .querySelector("#eventModal .imagesButtons button.active")
      .classList.remove("active");
    e.classList.add("active");
    document.querySelector(
      "#eventModal .modalImg"
    ).style.backgroundImage = `url(${
      document.querySelectorAll("#eventModal .imagesContainer img")[i].src
    })`;
  });
}

document
  .querySelector("#closeEventModal")
  .addEventListener("click", function () {
    document.querySelector("#eventModal").style.display = "none";
  });

function loadBlogs({ feed }) {
  var i = 0;
  feed.entry.forEach(function (entry) {
    if (i == 3) return;
    var categoryTags = "";
    if (entry.category) {
      entry.category.forEach(function (category) {
        categoryTags += `<span>${category.term}</span>`;
      });
    }
    var authorImg = entry.author[0].gd$image.src;
    if(authorImg.indexOf("http") == -1) authorImg = "http://" + authorImg;

    if(entry.media$thumbnail){
      var thumbSrc = entry.media$thumbnail.url;
      console.log(thumbSrc);
      thumbSrc = thumbSrc.split("/s72-")[0] + "/s600-c/" + thumbSrc.split("/s72-")[1].split('/')[1];
    }
    else{
      var thumbSrc = "img/Backgrounds/Doubs.png";
    }

    document.querySelectorAll("#blogsGrid .row")[i % 2].innerHTML += `
    <a href="${entry.link[0].href}">
      <div
        class="img-container"
        style="background-image: url(${thumbSrc})"
      ></div>
      <h2>${entry.title.$t}</h2>
      <p class="blogCategories">${categoryTags}</p>
      <p class="blogAuthor"><img src="${authorImg}"> <span>${entry.author[0].name.$t}</span></p>
    </a>`;
    i += 1;
  });

  tryUnload();
}


var UNLOAD_TRIAL = 0;
function tryUnload() {
  UNLOAD_TRIAL += 1;
  if (UNLOAD_TRIAL == 2) {
    unload();
  }
}