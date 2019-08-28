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

    if ((formData['firstname'] == "") || (formData['lastname'] == "") || (formData['code'] == "")) {
        errorSaving('No puede dejar los campos de Nombres, Apellidos o Codigo vacios')
        return 0
    }

    try {
        const Assistant = await assistant.where('idMeeting', '==', meetingId).where('idPerson', '==', formData['code']).get()
        console.log('Asistencias: ',Assistant.docs);
        const Person = await person.doc($('#code').val()).get()
        if(Person.exists) name = Person.data().firstname + " " + Person.data().lastname
        
        
        
        console.log('Person and name: ', Person, name);
        
        if (Assistant.docs.length) {
            errorSaving(`Esta asistencia ya fue registrada al codigo "${formData['code']}" ya fue registrado a nombre de: ${name}`)
        } else {
            console.log('La persona existe?: ', Person.exists);
            
            (Person.exists) ? await person.doc($('#code').val()).update({ assistant: +1 }) : await person.doc($('#code').val()).set(formData)
            await assistant.doc().set(formAssistant)
            
            const meetingData = await meeting.get()
            noAssistant = meetingData.data().assistant
            await meeting.update({ assistant: noAssistant+1 })
        }
        
        

    } catch (error) {
        console.log(error);
        errorSaving('Error al guardar en la base de datos, revise su conexion a internet o contacte con el supervisor.')
    }

    $('#guardar')[0].innerHTML = 'Guardar'
    getPerson()
}
