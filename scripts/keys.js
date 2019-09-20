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
const person = db.collection('Person');
const assistant = db.collection('Assistant');
const meeting = db.collection('Meeting');
// test collection
const personTest = db.collection('Person_test');
const assistantTest = db.collection('Assistant_test');
const meetingTest = db.collection('Meeting_test');
