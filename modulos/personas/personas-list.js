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
            id: data.code,
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

$("tbody").click(e => {
    let target = e.target
    let parent = $(target).parent()
    let children = parent[0].children
    console.log(children);
    console.log(Object.keys(children));
    var data = {}
    for (let key = 0; key < children.length; key++) {
        keyName = children[key].className
        data[keyName] = children[key].textContent        
        $(`#${keyName}Edit`).val(children[key].textContent)
    }
    idEditPerson = data.id
    console.log(idEditPerson);
    $("#editPersonModal").modal('show')
    console.log($("#editPersonModal"))
})
