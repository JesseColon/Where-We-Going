const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const searchCategory = document.getElementById("searchCategory");
const resultsSection = document.getElementById("resultsSection");

const locationType = document.getElementById("locationType");
const locationInputField = document.getElementById("locationInputField");
const locationInput = document.getElementById("locationInput");
const stateCodeInputField = document.getElementById("stateCodeInputField");
const stateCodeInput = document.getElementById("stateCodeInput");
const countryCodeInputField = document.getElementById("countryCodeInputField");
const countryCodeInput = document.getElementById("countryCodeInput");

if (stateCodeInput) {
    fetch('../states.json')
        .then(response => response.json())
        .then(states => {
            for (const code in states) {
                const option = document.createElement('option');
                option.value = code;
                option.text = states[code];
                stateCodeInput.appendChild(option);
            }
        });
}
if (countryCodeInput) {
    fetch('../countries.json')
        .then(response => response.json())
        .then(countries => {
            for (const code in countries) {
                const option = document.createElement('option');
                option.value = code;
                option.text = countries[code];
                countryCodeInput.appendChild(option);
            }
        });
}

if (locationType) {
    locationType.addEventListener("change", () => {
        if (locationType.value) {
            if (locationType.value === "stateCode") {
                stateCodeInputField.style.display = "block";
                locationInputField.style.display = "none";
                radiusInputField.style.display = "none";
            } else {
                stateCodeInputField.style.display = "none";
                locationInputField.style.display = "block";
                if (locationType.value === "postalCode" || locationType.value === "city") {
                    radiusInputField.style.display = "block";
                } else {
                    radiusInputField.style.display = "none";
                }
            }
        } else {
            locationInputField.style.display = "none";
            stateCodeInputField.style.display = "none";
            radiusInputField.style.display = "none";
        }
    });
}


if (searchButton) {
    searchButton.addEventListener("click", async () => {
        const query = searchInput.value;
        const category = searchCategory.value;
        const radius = radiusInput.value;

        let locationValue;
        if (locationType.value === "stateCode") {
            locationValue = stateCodeInput.value;
        } else if (locationType.value === "countryCode") {
            locationValue = countryCodeInput.value;
        } else {
            locationValue = locationInput.value;
        }


        let locationParam = '';
        if (locationType.value) {
            locationParam = `${locationType.value}=${locationValue}`;
        }

        // let radiusParam = '';
        // if (radius && (locationType.value === "postalCode" || locationType.value === "city")) {
        //     radiusParam = `&radius=${radius}`;
        // }

        try {
           const response = await fetch(`/api/search?keyword=${query}&segmentName=${category}&${locationParam}`);
            const data = await response.json();

            // Clear previous results
            resultsSection.innerHTML = '';

            // Check if data._embedded exists before trying to access data._embedded.events
            if (data._embedded) {
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
            } else {
                resultsSection.innerHTML = '<p>No events found for the given search parameters.</p>';
            }
        } catch (error) {
            console.error(error);
        }
    });
}
