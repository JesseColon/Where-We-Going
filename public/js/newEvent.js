const newEventFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const date = document.querySelector('#date').value.trim();
    const time = document.querySelector('#time').value.trim();
    const location = document.querySelector('#location').value.trim();
    const attendees = parseInt(document.querySelector('#attendees').value.trim(), 10);
    const image = document.querySelector('#image').value.trim();

    if (title && description && date && time && location && !isNaN(attendees) && image) {
      const response = await fetch('/api/events/new', {
        method: 'POST',
        body: JSON.stringify({ title, description, date, time, location, attendees, image }),
        headers: { 'Content-Type': 'application/json' },
      });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create event');
        }
    }
}

const newEventForm = document.querySelector('.new-form');
if (newEventForm) {
    newEventForm.addEventListener('submit', newEventFormHandler);
}
