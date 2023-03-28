var difficulty_filter = new Set(['Hard', 'Medium', 'Easy']);
var topic_filter = new Set();

function layCards(cards, topic_filter, difficulty_filter) {
    document.getElementById("container").innerHTML = "";
    let card_containers = [];
    let heights = [];
    for (let i = 0; i < 4; i++) {
        const card_container = document.createElement("div");
        card_container.className = "card_container";
        card_containers.push(card_container);
        heights.push(0);
    }

    let NUM_CONTAINERS = Math.max(Math.floor(document.querySelector("main").getBoundingClientRect().width / 300), 1);
    for (let i = 0; i < NUM_CONTAINERS; i++) {
        document.getElementById("container").appendChild(card_containers[i]);
    }
    cards.forEach(function (card) {
        let difficulty = card.getElementsByClassName("difficultyTag")[0].getAttribute("difficulty");
        if (!difficulty_filter.has(difficulty)) {
            return;
        };
   
        let topicTagList = card.getElementsByClassName("topicTag");
        let card_topics = [...topicTagList].map(function (tag) {
            return tag.getAttribute("topic");
        });
    
        let common_topics = card_topics.filter(x => topic_filter.has(x));
        if (common_topics.length == 0) {
            return;
        };
        
        const min_height = Math.min(...heights.slice(0, NUM_CONTAINERS));
        const min_height_index = heights.indexOf(min_height);
        card_containers[min_height_index].appendChild(card);
        heights[min_height_index] += card.clientHeight;
    });
};

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
        response.records.forEach(function (row) {
            let topicsString = "";
            row.fields.Topics.forEach(function (topic) {
                if (topic != "") {
                    topicsString += `<span class="topicTag" topic="${topic}">${topic}</span>`;
                    topic_filter.add(topic);
                }
            });

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML += `<h2>${row.fields.Name}</h2>`;
            card.innerHTML += `<span id="difficulty" class="difficultyTag ${row.fields.Difficulty}" difficulty="${row.fields.Difficulty}">${row.fields.Difficulty}</span>`;
            card.innerHTML += topicsString;
            card.innerHTML += `<a href="${row.fields.Link}" target="_blank">Open Problem</a>`;
            cards.push(card);
        });
        layCards(cards, topic_filter, difficulty_filter);

        topic_filter.forEach(function (topic) {
            document.querySelector(
                ".filter[data-type=topic]"
            ).innerHTML += `<button class="active" data="${topic}">${topic}</button>`;
        });
        document.querySelectorAll(".filter button").forEach(function (btn) {
            btn.addEventListener("click", function (event) {
                let data_type = this.parentElement.getAttribute('data-type');

                if (this.classList.contains("active")) {
                    this.classList.remove("active");
                    window[data_type + "_filter"].delete(this.getAttribute('data'));
                } else {
                    this.classList.add("active");
                    window[data_type + "_filter"].add(this.getAttribute('data'));
                }
                window.addEventListener("click", function(btn){
                    layCards(cards, topic_filter, difficulty_filter);
            });
             
             });
    });
});
window.addEventListener('resize', function (event) {
    layCards(cards, topic_filter, difficulty_filter);
}, true);