// Fetch event data from the API
async function getEventData(zipCode, distance) {
    const response = await fetch(`/api/events?zipCode=${zipCode}&distance=${distance}`);
    const data = await response.json();
    
    if (response.ok) {
        displayEvents(data);
    } else {
        alert('Error: ' + data);
    }
}

// Function to display events on the page
function displayEvents(events) {
    // Select the element where you'll display your events
    const eventContainer = document.querySelector('#event-container');
    
    // Clear any existing events
    eventContainer.innerHTML = '';
    
    // Iterate through the events and create an element for each one
    for (let event of events) {
        const eventElement = document.createElement('div');
        eventElement.textContent = `${event.name} - ${event.date}`;
        eventContainer.appendChild(eventElement);
    }
}

// Add an event listener for when the user submits their search
document.querySelector('#search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const zipCode = document.querySelector('#zip-code-input').value;
    const distance = document.querySelector('#distance-input').value;
    
    getEventData(zipCode, distance);
});
