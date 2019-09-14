String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

var options = {
    valueNames: ['id', 'name', 'code', 'carreer', 'type', 'membership', 'cell', 'email', 'assistant']
}

var personList = new List('personList', options);

personList.clear()

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