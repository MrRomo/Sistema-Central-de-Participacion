String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

var options = {
    valueNames: ['id', 'firstname', 'lastname', 'code', 'carreer', 'type', 'membership', 'cell', 'email', 'assistant']
}

var personList = new List('personList', options);

personList.clear()

var idEditPerson = ''


async function getPerson() {
    const Person = await person.get()
    personList.clear()
    await Person.forEach(doc => {
        data = doc.data()
        personList.add({
            id: data.id,
            firstname: `${data.firstname}`.capitalize(),
            lastname: `${data.lastname}`.capitalize(),
            code: data.code,
            carreer: `${data.carreer}`.capitalize(),
            type: data.type,
            membership: data.membership,
            cell: data.cell,
            email: data.email,
            assistant: data.assistant
        });

    })
}

getPerson()

$("tbody").click(async e => {
    let target = e.target
    let parent = $(target).parent()
    let children = parent[0].children
    console.log(children);

    let data = {}
    for (let key = 0; key < children.length; key++) {
        keyName = children[key].className
        data[keyName] = children[key].textContent
        $(`#${keyName}Edit`).val(children[key].textContent)
    }
    idEditPerson = data.id

    let idMeeting = []
    let allMeetings = []

    console.log(data);

    let result = await assistant.where('idPerson', '==', data.id).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(doc => {
                idMeeting.push(doc.data().idMeeting)
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    console.log('Searching meetings', idMeeting);

    idMeeting.forEach(async id => {
        meet = await meeting.where(firebase.firestore.FieldPath.documentId(), '==', id).get()
        meet.forEach(e=>{
            if (!e.empty) {
                data = e.data()
                data.id = e.id
                allMeetings.push(data)
            }
        })
    })

    console.log(allMeetings);

    $("#profilePersonModal").modal('show')
})
