


async function getAllData() {
    batch = {
        meeting: await getQuery(meeting),
        assistant: await getQuery(assistant),
        person: await getQuery(person)
        // personTest: await getQuery(personTest)
    }
    console.log(batch);
    return batch
}

async function getQuery(database){
    data = []
    await database.get().then(snapshot => {
        snapshot.forEach(doc => {
            value = doc.data()
            value.id = doc.id
            data.push(value)
        })
    })
    return data
}

async function savePersonNewId(batch) {
    let person = batch.person
    person.forEach(async e=> {
        await personTest.doc().set(e)
        .then(result=>{
            console.log(`Person ${e.firstname} saved¡`);
        })
        .catch(e=>{
            console.log('An error ocurred', e);
        })
    })
}


async function saveAssistantNewIdPerson(batch){
    let assistant = batch.assistant
    let person = batch.personTest

    newAssistan = []
    assistant.forEach(e => {
        id = parseInt(e.idPerson)
        data = person.find(x => x.code === id);
        if(data){
            e.idPerson = data.id
            newAssistan.push(e)
        }
    })
    newAssistan.forEach(async e=> {
        await assistantTest.doc().set(e)
        .then(result=>{
            console.log(`Asistant ${e.id} saved¡`);
        })
        .catch(e=>{
            console.log('An error ocurred', e);
        })
    })


}


async function returnToDataBase(batch){
    let people = batch.person
    let assistants = batch.assistant
    // people.forEach(async e=> {
    //     e.assistant = 1
    //     await person.doc(e.id).set(e)
    //     .then(result=>{
    //         console.log(`Person ${e.firstname} saved¡`);
    //     })
    //     .catch(e=>{
    //         console.log('An error ocurred', e);
    //     })
    // })

    assistants.forEach(async e=> {
        await assistant.doc(e.id).set(e)
        .then(result=>{
            console.log(`Asistant ${e.id} saved¡`);
        })
        .catch(e=>{
            console.log('An error ocurred', e);
        })
    })

}


async function searchAsistantError(batch){
    let people = batch.person
    let assistants = batch.assistant
    let c = 0
    assistants.forEach(e => {
        id = (e.idPerson)
        data = people.find(x => x.id === id);
        console.log(data, c++)
    })
}

async function RUNSCRIPT(){
    batch = await getAllData()
    searchAsistantError(batch) 
    // returnToDataBase(batch)  
    // await saveAssistantNewIdPerson(batch)
    // await savePersonNewId(batch)
}




RUNSCRIPT()
