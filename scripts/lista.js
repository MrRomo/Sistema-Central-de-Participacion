var options = {
    valueNames: ['id', 'name', 'code']
}

var personList = new List('personList', options);


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
