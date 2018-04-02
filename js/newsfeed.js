var usuario = localStorage.getItem('usuario');
usuario= JSON.parse(usuario)
console.log(usuario);

firebase.database().ref("user/" + usuario.uid).set(usuario);

$('#prueba').html(usuario.nombre);
$('#prueba2').attr('src', usuario.foto);
