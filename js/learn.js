var difficulty_filter = ['hard', 'medium', 'easy'];
var topic_filter = ['Arrays', 'Greedy'];

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
        document.querySelector("#container").innerHTML += `<div class="card">
            <h2>${row.fields.Name}</h2>
            <span class="difficultyTag ${row.fields.Difficulty}">${row.fields.Difficulty}</span>
            <span class="topicTag">${topicsString}</span>
            <a href="${row.fields.Link}" target="_blank">Open Problem</a>
        </div>`;
    });
});
window.addEventListener('resize', function(event) {
}, true);

