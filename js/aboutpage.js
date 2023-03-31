// pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409

fetch(
    `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Profiles?maxRecords=1000&view=Grid%20view`,
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409`,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.records);
        datas = data.records;
        add_data(data.records);
    });

function add_data(data) {
    for (let i of data) {
        document.getElementById("people-list").appendChild(create_person(i.fields, i.id));
    }
}

function create_person(data, id) {
    let link = document.createElement("a");
    link.className = "profile-link";
    link.href = "/profile.html?id=" + id;
    let div = document.createElement("div");
    div.className = "person-element";
    data.Photo = data.Photo??[{url:""}]; // change second part to default image
    div.innerHTML = `<img class="person-profile" 
        src="${data.Photo[0].url}"> 
        <div class="person-name">${data.Name}</div>`;
    link.appendChild(div);
    return link
}