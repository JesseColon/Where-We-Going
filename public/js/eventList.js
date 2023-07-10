
// Get the event container element
const eventContainer = document.querySelector(".event-container");

// Fetch events from the backend
fetch('/api/events')
  .then(response => response.json())
  .then(events => {
    events.forEach(event => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("event-card");

      // Create HTML structure for event card
      eventCard.innerHTML = `
        <div class="event-image">
          <img src="${event.image}" alt="Event Image">
        </div>
        <div class="event-details">
          <h3>${event.title}</h3>
          <p>${event.date} | ${event.time}</p>
          <p>${event.location}</p>
          <p>Attendees: ${event.attendees}</p>
          <p>${event.description}</p>
        </div>
      `;

      // Append event card to the event container
      eventContainer.appendChild(eventCard);
    });
  })
  .catch(error => {
    console.log(error);
    // Handle error if needed
  });

