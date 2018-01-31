//Inicializando firebase
var config = {
  apiKey: "AIzaSyDAXHqk1lEk-mEbyju9yshokJcMNbTfvY4",
  authDomain: "red-social-4da9d.firebaseapp.com",
  databaseURL: "https://red-social-4da9d.firebaseio.com",
  projectId: "red-social-4da9d",
  storageBucket: "red-social-4da9d.appspot.com",
  messagingSenderId: "218845085134"
};
firebase.initializeApp(config);

// Autenticacion con Google
$('#btn-google').click(function() {
  authGoogle();
})

function authGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  authentication(provider);
}
//creando la base de datos con loa datos del usuario
function saveUser(usuario){
  var usuario = {
    uid:user.uid,
    nombre:user.deisplayName,
    email:user.emal,
    foto:user.photoURL
  }
  firebase.database().ref("user/" + user.uid).set(usuario);
  }

function authentication(provider) {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(result);
    window.location.href='../views/newsfeed.html';
    saveUser(user);
  })

  }).catch(function(error) {
    console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    console.log(email);
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(credential);

  });

}

//Crear el div dinamicamente
$(document).ready(initApp());
 function initApp(){
 }

 //leer la base de datos

 firebase.database().ref("user/" + user.uid).set(usuario)
  .on("child_added", function(s){
    var user = s.val();
    $('#picUser')append("<img class="'circle'" src='"+ user.foto +"'/>");
  })

 $('#post').click(post)
 $('#upload-file').change(function (event){
  var image = $('#image');
  image[0].src = URL.createObjectURL(event.target.files[0]);
 });

 function post(){
  var comment = $('#add-post').val();
  var image = $('#image').attr('src');
  var idModal = Math.floor((Math.random() * 1000) + 1);
  var divPorfile =$(
  '<div class="col s12 m12 profile-post">' +
    '  <div class="col s1 m1 left profile-pic">' +
    '    <img class="circle" src="../assets/images/profile-friend-example.jpg" height="30px" width="30px" alt="">' +
    '  </div>' +
    '  <div class="col s9 m19 right address">' +
    '    <h6>'+ comment +'</h6>' +
    '    </div>' +
    '  </div>' +
    '  <div class="row pic-post-friend">' +
    '    <div class="col s12 m12">' +
    '      <a class="modal-trigger" href="#modal-post-friends-'+ idModal +'">' +
    '         <img class="responsive-img" src="'+ image +'" alt="">' +
    '      </a>' +
    '    </div>' +
    '  </div>' +
    '</div>');
  var modal = $(
    '<div id="modal-post-friends-'+ idModal +'" class="modal">' +
      '  <div class="modal-content">' +
      '    <section class="row post-friends">' +
      '      <div class="col s12 m12 profile-post">' +
      '        <div class="col s12 m12 left address">' +
      '          <h6>Aquí va la dirección del lugar</h6>' +
      '        </div>' +
      '        <div class="row pic-post">' +
      '          <img class="responsive-img" src="'+ image +'" alt="">' +
      '        </div>' +
      '        <div class="row coment-post">' +
      '          <h6>'+ comment +' </h6>' +
      '        </div>' +
      '        <div class="row icon-cost">' +
      '          <li><a href="sass.html"><i class="material-icons">attach_money</i></a></li>' +
      '          <div class="modal-footer">' +
      '            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>' +
      '          </div>' +
      '        </div>' +
      '      </div>' +
      '    </section>' +
      '  </div>' +
      '</div>');
  $('#conteinerPost').append(divPorfile);
  $('#modals').append(modal);
  $('#add-post').val('');
  $('#upload-file').val('');
  $('#image')[0].src = '';
 }
