
const firebaseConfig = {
  apiKey: "AIzaSyCSuukSBNmu-OQ2H4DTkaS6nguxaYD-HKo",
  authDomain: "projetecs93-naosei.firebaseapp.com",
  databaseURL: "https://projetecs93-naosei-default-rtdb.firebaseio.com",
  projectId: "projetecs93-naosei",
  storageBucket: "projetecs93-naosei.appspot.com",
  messagingSenderId: "801705145075",
  appId: "1:801705145075:web:acbfe6982f31b34929bd86"
};
  
    firebase.initializeApp(firebaseConfig);
  
    userName = localStorage.getItem("userName");
    roomName = localStorage.getItem("roomName");

    function send()
    {
          msg = document.getElementById("msg").value;
          firebase.database().ref(roomName).push({name:userName,message:msg,like:0});
          document.getElementById("msg").value = "";
    }

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; 
snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
     childData = childSnapshot.val(); if(childKey != "purpose") 
     {
       firebaseMessageId = childKey;
       messageData = childData;
       name = messageData['name'];
       message = messageData['message'];
       like = messageData['like']

       nameWithTag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
       messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
       like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
       spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
       row = nameWithTag + messageWithTag + like_button + spanWithTag;
       document.getElementById("output").innerHTML += row;

 }
});
});
}

getData();

function updateLike(messageId) {
buttonId = messageId;
likes = document.getElementById(buttonId).value;
updatedLikes = Number(likes) + 1;
firebase.database().ref(roomName).child(messageId).update({ like: updatedLikes });
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
window.location = "index.html";
}