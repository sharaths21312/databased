let get_data = async function (id) {
    fetch(
        `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Profiles/${id}`,
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
            return data;
        });
}

let filldata = async function () {
    args = location.href.split("?")[1].split("=");
    if (args[0] == 'id') {
        fetch(
            `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Profiles/${args[1]}`,
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
                console.log(data)
                if (!data ?? False) {
                    console.error("no data found from airtable")
                    return;
                }
                document.getElementById("profile-name").innerText = data.fields.Name;
                document.getElementById("profile-photo").src = data.fields.Photo[0].url;
                document.getElementById("profile-bio").innerText = data.fields.Bio;
                document.getElementById("profile-email").innerText = data.fields.Email;
                document.getElementById("error-message").style.display = "none";
            });
    }
}

filldata()