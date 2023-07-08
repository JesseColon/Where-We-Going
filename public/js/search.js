const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const searchCategory = document.getElementById("searchCategory");
const searchZip = document.getElementById("searchZip");
const resultsSection = document.getElementById("resultsSection");

const locationType = document.getElementById("locationType");
const locationInputField = document.getElementById("locationInputField");
const stateCodeInputField = document.getElementById("stateCodeInputField"); // Add this line

locationType.addEventListener("change", () => {
    if (locationType.value) {
        locationInputField.style.display = "block";
        if (locationType.value === "stateCode") {
            stateCodeInputField.style.display = "block"; 
            locationInputField.style.display = "none";
        } else {
            stateCodeInputField.style.display = "none"; 
            locationInputField.style.display = "block";
        }
    } else {
        locationInputField.style.display = "none";
        stateCodeInputField.style.display = "none"; 
    }
});

fetch('../states.json')
    .then(response => response.json())
    .then(states => {
        const stateCodeInput = document.getElementById('stateCodeInput');
        for (const code in states) {
            const option = document.createElement('option');
            option.value = code;
            option.text = states[code];
            stateCodeInput.appendChild(option);
        }
    });

    searchButton.addEventListener("click", async () => {
        const query = searchInput.value;
        const category = searchCategory.value;
        const zip = searchZip.value;
    
        let locationValue;
        if (locationType.value === "stateCode") {
            const stateCodeInput = document.getElementById("stateCodeInput");
            locationValue = stateCodeInput ? stateCodeInput.value : '';
        } else {
            const locationInput = document.getElementById("locationInput");
            locationValue = locationInput ? locationInput.value : '';
        }
    
        try {
            const response = await fetch(`/api/search?keyword=${query}&segmentName=${category}&${locationType.value}=${locationValue}`);
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
    
    
