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