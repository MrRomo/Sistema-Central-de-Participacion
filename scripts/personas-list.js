
var options = {
    valueNames: ['id', 'name', 'code', 'carreer', 'type', 'membership', 'cell', 'email', 'assistant']
}

var personList = new List('personList', options);
personList.clear()
personList.add({ id: '21wassd', name: `Ricardo ramos`, code: 21312342, carreer: 'Ingenieria Electronica',
                type: 'Voluntario', membership: 'N/A', cell:300221754, email: 'jricardoromo21@gmail.com', assistant: 215 });
personList.add({ id: '21wsdsd', name: `Juana ramos`, code: 21312122, carreer: 'Ingenieria Sistemas',
                type: 'Miembro', membership: '123213', cell:300221754, email: 'jasjas@gmail.com', assistant: 544});

$('#personList').click(async e=>{
    className = e.target.className.split(' ')

    console.log(className);
    if(!(className.indexOf('checkBtn')<0)){
        
        let parent = $(e.target).parents('tr')
        let child = $(parent).children()
        let code = parseInt(child[0].innerText)
    
        let formAssistant = {
            idPerson: code,
            idMeeting: meetingId,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            updatedAt: firebase.firestore.Timestamp.fromDate(new Date())
        }
        console.log('Register:', formAssistant);
        const meetingData = await meeting.get()
        noAssistant = meetingData.data().assistant

        await assistant.doc().set(formAssistant)        
        await meeting.update({ assistant: noAssistant+1 })
        getPerson()    
    }
    
})
