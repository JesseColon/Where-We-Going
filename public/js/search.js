const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const searchCategory = document.getElementById("searchCategory");
const searchZip = document.getElementById("searchZip");
const resultsSection = document.getElementById("resultsSection");

const APIKEY = process.env.API_KEY; 

searchButton.addEventListener("click", async () => {
    const query = searchInput.value;
    const category = searchCategory.value;
    const zip = searchZip.value;

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&segmentName=${category}&postalCode=${zip}&apikey=${APIKEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Clear previous results
        resultsSection.innerHTML = '';

        // Loop through the events and append them to the results section
        data._embedded.events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.innerHTML = `
                <h2>${event.name}</h2>
                <p>${event.dates.start.localDate}</p>
                <a href="${event.url}" target="_blank">More Info</a>
            `;
            resultsSection.appendChild(eventDiv);
        });
    } catch (error) {
        console.error(error);
    }
});
