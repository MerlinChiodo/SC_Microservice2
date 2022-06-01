export async function sendCalendarEntry(){
    fetch('/event/sendCalendarEntry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event_id: 2002,
            event_name: "New Calendar Entry",
            service_name: "stadtbus",
            title: "Bus Event",
            short_description: "Smarte Events im Stadtbus",
            long_description: "Lorem Ipsum",
            event_on: "2019-10-12T07:20:50.52Z" })
    }).then(async (response) => {
        if (response.ok) {
            let result = await response.json();

        }
    }).catch(error => {
            console.error(error);
    })
}


