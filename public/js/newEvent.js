// here i would like to make a front end js file that will create a new event

const newEventFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#event-name').value.trim();
    const description = document.querySelector('#event-description').value.trim();
    const date = document.querySelector('#event-date').value.trim();
    const time = document.querySelector('#event-time').value.trim();
    const location = document.querySelector('#event-location').value.trim();

    if (name && description && date && time && location) {
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({ name, description, date, time, location }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create event');
        }
    }
}