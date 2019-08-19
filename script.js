
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
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

const person = db.collection('Person');
const formFields = ["firstname", "lastname", "cell", "code", "email"]
const formData = {
    firstname: null,
    lastname: null,
    cell: null,
    code: null,
    email: null
}

async function guardar() {
    $('#guardar')[0].innerHTML = ' <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>  Guardando'
    
    formFields.forEach(x =>{
        formData[x] = ($(`#${x}`).val() == "") ? " " : $(`#${x}`).val()
    })


    if ((formData['firstname'] == "")||(formData['lastname']  == "")||(formData['code']  == "")){
        errorGuardando()
        return 0
    }
    formData['firstname'] = formData['firstname'].capitalize()
    formData['lastname'] = formData['lastname'].capitalize()
    console.log(formData);
    
    await db.collection("Person").doc($('#code').val()).set(formData)
    .then(function() {
        console.log("Document written with ID: ")
        console.log("primero")        
    })
    .catch(function(error) {
        errorGuardando()
        console.error("Error adding document: ", error)
    })
    
    $('#guardar')[0].innerHTML = 'Guardar'  
    
}

var options = {
    valueNames: [ 'id', 'name','code' ]
};

// Init list
var personList = new List('personList', options);

// Sets callbacks to the buttons in the list
var checkBtns = $('.check')

async function getPerson(){
    const Person = await person.get()
    await Person.forEach(doc => {
        data = doc.data()
        personList.add({ id: data.code, name: `${data.firstname} ${data.lastname}`  , code: data.code });
    });
   
}

getPerson()

function errorGuardando() {
    $('#guardar')[0].innerHTML = '<i class="fas fa-times"></i>  Error guardando'
    $('#guardar').toggleClass("btn-danger")
    setTimeout(()=>{
        $('#guardar')[0].innerHTML = 'Guardar'  
        $('#guardar').toggleClass("btn-danger")
    },2000)
}

refreshCallbacks();


function refreshCallbacks() {
    // Needed to add new buttons to jQuery-extended object
    checkBtns = $(checkBtns.selector);
  
    checkBtns.click(function() {
        var itemId = $(this).closest('tr').find('.id').text();
        var itemValues = personList.get('id', itemId)[0].values();
        console.log(itemId);
        console.log(itemValues);
        
    });
}

function check() {
    console.log(this.data);
    console.log("CHECKING");
}
  