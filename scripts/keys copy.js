String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDsfcZ4l77h_AeeAquk5BESGY9nZedLjhA",
    authDomain: "ieee-a5f48.firebaseapp.com",
    databaseURL: "https://ieee-a5f48.firebaseio.com",
    projectId: "ieee-a5f48",
    storageBucket: "",
    messagingSenderId: "1007853756581",
    appId: "1:1007853756581:web:11707a50a352b2ed"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var meetingId = 'J2PtC6Z1sPpcEjhRYCAX'
const person = db.collection('Person');
const assistant = db.collection('Assistant');
const meeting = db.collection('Meeting').doc(meetingId);

const formFields = ["firstname", "lastname", "cell", "code", "email"]

async function getPerson() {
    const Person = await person.get()
    const Assistant = await assistant.where('idMeeting', '==', meetingId).get()
    const Codes = []
    Assistant.forEach((doc) => {
        data = doc.data()
        Codes.push( data.idPerson);
    })
    personList.search('')
    $('#searchPerson').val('')
    console.log(Codes);

    personList.clear()
    await Person.forEach(doc => {
        data = doc.data()
        index = Codes.indexOf(data.code)
        console.log("index of code:", index);
        if((index<0)||(true)){
            personList.add({ id: data.code, name: `${data.firstname} ${data.lastname}`, code: data.code });
        }
        
    })
}


function errorSaving(message) {
    $('#modalMessage')[0].innerHTML = message
    $('#alertModal').modal('toggle')
    $('#guardar')[0].innerHTML = '<i class="fas fa-times"></i>  Error guardando'
    $('#guardar').toggleClass("btn-danger")
    setTimeout(() => {
        $('#guardar')[0].innerHTML = 'Guardar'
        $('#guardar').toggleClass("btn-danger")
    }, 2000)
}
getPerson()

var carreras = ["ADMINISTRACIÓN DE EMPRESAS", "ADMINISTRACIÓN DE EMPRESAS TURÍSTICAS Y HOTELERAS POR CICLOS PROPEDÉUTICOS",
    "ADMINISTRACIÓN DE LA SEGURIDAD Y SALUD EN EL TRABAJO POR CICLOS PROPEDÉUTICOS",
    "ADMINISTRACIÓN PÚBLICA POR CICLOS PROPEDÉUTICOS", "ANTROPOLOGÍA", "BIOLOGÍA", "CINE Y AUDIOVISUALES",
    "CONTADURÍA PÚBLICA", "DERECHO", "ECONOMÍA", "ENFERMERÍA", "INGENIERÍA AGRONÓMICA", "INGENIERÍA AMBIENTAL Y SANITARIA", "INGENIERÍA CIVIL",
    "INGENIERÍA DE SISTEMAS", "INGENIERÍA ELECTRÓNICA", "INGENIERÍA INDUSTRIAL", "INGENIERÍA PESQUERA", "LICENCIATURA EN EDUCACIÓN INFANTIL",
    "LICENCIATURA EN INFORMÁTICA", "MEDICINA", "NEGOCIOS INTERNACIONALES", "ODONTOLOGÍA", "PROFESIONAL EN DEPORTE", "PSICOLOGÍA"]
var optionsSelector = []

carreras.forEach(e => {
    optionsSelector.push(`<option>${e}</option>`)
})

$("#carreerSelector").append(optionsSelector)

