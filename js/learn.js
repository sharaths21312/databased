var difficulty_filter = ['hard', 'medium', 'easy'];
var topic_filter = ['Arrays', 'Greedy'];

function layCards(cards) {
    document.getElementById("container").innerHTML = "";
    let card_containers = [];
    let heights = [];
    for (let i = 0; i < 5; i++) {
        const card_container = document.createElement("div");
        card_container.className = "card_container";
        // card_container.id = "container" + i;
        card_containers.push(card_container);
        heights.push(0);
    }
    // get width of the window, not the entire screen
    let NUM_CONTAINERS = Math.min(Math.floor(window.innerWidth / 300), 5);
    for (let i = 0; i < NUM_CONTAINERS; i++) {
        document.getElementById("container").appendChild(card_containers[i]);
    }
    cards.forEach(function(card){
        const min_height = Math.min(...heights.slice(0, NUM_CONTAINERS));
        const min_height_index = heights.indexOf(min_height);
        card_containers[min_height_index].appendChild(card);
        heights[min_height_index] += card.clientHeight;
    });
}

document.querySelectorAll(".filter button").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        let type = this.parentElement.getAttribute('data-type');

        if (this.classList.contains("active")) {
            this.classList.remove("active");
            window[type + "_filter"].splice(window[type + "_filter"].indexOf(this.getAttribute('data')), 1)

        } else {
            this.classList.add("active");
            window[type + "_filter"].push(this.getAttribute('data'));
        }
    });
});

var cards = [];
fetch(
    `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Learn?maxRecords=1000&view=Grid%20view`,
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409`,
        },
    }
).then(response => {
    return response.json();
})
.then(response => {
    response.records.forEach(function(row){
        let topicsString = "";
        row.fields.Topics.forEach(function(topic){
            topicsString += `<span class="topicTag">${topic}</span>`;
        });

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML += `<h2>${row.fields.Name}</h2>`;
        card.innerHTML += `<span class="difficultyTag ${row.fields.Difficulty}">${row.fields.Difficulty}</span>`;
        card.innerHTML += `<span class="topicTag">${topicsString}</span>`;
        card.innerHTML += `<a href="${row.fields.Link}" target="_blank">Open Problem</a>`;
        cards.push(card);
        // document.getElementById("container").appendChild(card);
    });
})
.then(() => {
    layCards(cards);
});

window.addEventListener('resize', function(event) {
    layCards(cards);
}, true);

function filter_topic()

