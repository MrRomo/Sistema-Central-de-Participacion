async function registrarPersona() {
    $('#guardar')[0].innerHTML = ' <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>  Guardando'
    var checked = $('#interest')[0].checked
    console.log(checked)

    let formData = {
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        lastname: $('#lastname').val(),
        cell: parseInt($('#cell').val()),
        code: parseInt($('#code').val()),
        email: $('#email').val(),
        interest: checked,
        carreer: $('select').val(),
        assistant: 0,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date())
    }

    if ((formData['firstname'] == "") || (formData['lastname'] == "") || (formData['code'] == "")) {
        errorSaving('No puede dejar los campos de Nombres, Apellidos o Codigo vacios')
        return 0
    }

    try {
        const Person = await person.doc($('#code').val()).get()
        if (Person.exists) name = Person.data().firstname + " " + Person.data().lastname

        console.log('Person and name: ', Person, name);

        (Person.exists) ? errorSaving('Esta persona ya existe: ' + Person.data().firstname + " " + Person.data().lastname ): await person.doc($('#code').val()).set(formData)
    } catch (error) {
        console.log(error);
        errorSaving('Error al guardar en la base de datos, revise su conexion a internet o contacte con el supervisor.')
    }

    $('#guardar')[0].innerHTML = 'Guardar'
}
