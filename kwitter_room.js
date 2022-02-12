
const firebaseConfig = {
      apiKey: "AIzaSyCkScwiMAqnPqwmQ3UPwM2TSXV1-HOyCIE",
      authDomain: "kwitter-3cff5.firebaseapp.com",
      databaseURL: "https://kwitter-3cff5-default-rtdb.firebaseio.com",
      projectId: "kwitter-3cff5",
      storageBucket: "kwitter-3cff5.appspot.com",
      messagingSenderId: "291404192660",
      appId: "1:291404192660:web:b3b3d8a321814caafccd81",
      measurementId: "G-TGHS8PXWB1"
    };

    firebase.initializeApp(firebaseConfig);
    username = localStorage.getItem('Username');
    document.getElementById('heading').innerHTML = 'Welcome ' + username + '!';

    function AddRoom() {
          room_name = document.getElementById('room_name').value;
          firebase.database().ref('/').child(room_name).update({
                purpose : 'adding room name'
          });

          localStorage.setItem('Room Name', room_name);
          window.location = 'kwitter_page.html';
    }

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      Room_names = childKey;

      console.log('Room Names - ' + Room_names);
      row = "<div class = 'room_name' id = " + Room_names + "onclick = 'redirectToRoomName(this.id)>#" + Room_names + "</div> <hr>"
      document.getElementById('output').innerHTML += row;
      });});}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem('Room Name Redirected', name);
      window.location = 'kwitter_page.html';
}

function Logout() {
      localStorage.removeItem('Username');
      localStorage.removeItem('Room Name');
      window.location = 'index.html';
}

