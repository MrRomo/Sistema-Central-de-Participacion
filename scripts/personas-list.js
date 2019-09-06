String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

var options = {
    valueNames: ['id', 'name', 'code', 'carreer', 'type', 'membership', 'cell', 'email', 'assistant']
}

var personList = new List('personList', options);
personList.clear()
personList.add({
    id: '21wassd', name: `Ricardo ramos`, code: 21312342, carreer: 'Ingenieria Electronica',
    type: 'Voluntario', membership: 'N/A', cell: 300221754, email: 'jricardoromo21@gmail.com', assistant: 215
});
personList.add({
    id: '21wsdsd', name: `Juana ramos`, code: 21312122, carreer: 'Ingenieria Sistemas',
    type: 'Miembro', membership: '123213', cell: 300221754, email: 'jasjas@gmail.com', assistant: 544
});

async function getPerson() {
    const Person = await person.get()
    personList.clear()
    await Person.forEach(doc => {
        data = doc.data()
        personList.add({
            id: data.code, name: `${data.firstname} ${data.lastname}`.capitalize(), code: data.code,
            carreer: data.carreer, type: data.type, membership: data.membership,
            cell: data.cell, email: data.email, assistant: data.assistant
        });

    })
}

getPerson()