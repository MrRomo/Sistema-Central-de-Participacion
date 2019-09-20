async function registrarAsistente() {
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

    let formAssistant = {
        idPerson: formData['code'],
        idMeeting: meetingId,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date())
    }
    console.log(formData)

    if ((formData['firstname'] == "") || (formData['lastname'] == "")) {
        errorSaving('No puede dejar los campos de Nombres, Apellidos o Codigo vacios')
    }

    try {
        const meetingData = await meeting.get()
        await person.doc().set(formData)
        noAssistant = meetingData.data().assistant
        await meeting.update({ assistant: noAssistant + 1 })

        $('#firstname').val('')
        $('#lastname').val('')
        $('#lastname').val('')
        $('#cell').val('')
        $('#code').val('')
        $('#email').val('')
        $('select').val('')


    } catch (error) {
        console.log(error);
        errorSaving('Error al guardar en la base de datos, revise su conexion a internet o contacte con el supervisor.')
    }

    $('#guardar')[0].innerHTML = 'Guardar'
    getPerson()
}
