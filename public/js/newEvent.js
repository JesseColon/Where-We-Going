// here i would like to make a front end js file that will create a new event

const newEventFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#event-title').value.trim();
    const description = document.querySelector('#event-description').value.trim();
    const date = document.querySelector('#event-date').value.trim();
    const time = document.querySelector('#event-time').value.trim();
    const location = document.querySelector('#event-location').value.trim();
    const attendees = parseInt(document.querySelector('#attendees').value.trim(), 10);

    if (title && description && date && time && location) {
        const response = await fetch('/api/events/new', {
            method: 'POST',
            body: JSON.stringify({ title, description, date, time, location, attendees }),
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
    res.redirect('/dashboard');
}