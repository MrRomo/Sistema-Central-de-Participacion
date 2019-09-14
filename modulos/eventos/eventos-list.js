String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

var options = {
    valueNames: ['id', 'title_conference', 'type', 'date', 'location', 'assistants']
}

var eventList = new List('eventList', options);
eventList.clear()

async function getEvent() {
    const Event = await meeting.get()
    eventList.clear()
    await Event.forEach(doc => {
        data = doc.data()
        let current_datetime = new Date(data.date.seconds*1000)
        let formatted_date = current_datetime.getDate() + " / " + (current_datetime.getMonth() + 1) + " / " + current_datetime.getFullYear()
        date = current_datetime
        eventList.add({
            id: data.id, title_conference: data.title.capitalize(), date: formatted_date , type: data.type.capitalize(), location: data.location,
            assistants: data.assistant
        });
    })
}

getEvent()