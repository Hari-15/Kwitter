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
user_name = localStorage.getItem('Username');
room_name = localStorage.getItem('Room Name');


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         
         console.log(firebase_message_id);
         console.log(message_data);
         name1 = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         
         name_with_tag = "<h4>" + name1 + "<image class = 'user_tick' src = 'tick.png'> </h4>" ;
         message_with_tag = '<h4 class = "message_h4">' + message + '</h4>' ;
         check_button = '<button class = "btn btn-warning id = "' + firebase_message_id + 'value = "' + like + 'onclick = "updateLike(this.id)"' ;
         span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like : " + like + "</h4>" ;

         row = name_with_tag + message_with_tag + check_button + span_with_tag ;
         document.getElementById('output').innerHTML += row ;
      } });  }); }
getData();

function Logout() {
      localStorage.removeItem('Username');
      localStorage.removeItem('Room Name');
      window.location = 'index.html';
}

function Send() {
      message = document.getElementById('message').value;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : message,
            like : 0
      });
      document.getElementById('message').value = '';
}

function updateLike(message_id) {
      console.log('clicked on like button - ' + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updatedLike = Number(likes) + 1;
      console.log(updateLike);

      firebase.database().ref(room_name).child(message_id).update({
            like : updatedLike 
      });
}