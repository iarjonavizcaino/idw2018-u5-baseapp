function guardar() {
    //var name = document.getElementById("txtNombre").value;
    var name = $('#txtNombre').val();
    //$('#txtNombre').val('Mi nombre');
    var email = $('#txtEmail').val();
    var password = $('#txtPassword').val();

    console.log(name);
    console.log(email);
    console.log(password);

    $.ajax(
        {
            url:"http://localhost:3002/usuarios/v1/usuario/",
            type:"POST",
            data: {
                name:name,
                email:email,
                password:password
            }
        }
    )
    .done(
        function(data) {
            alert(JSON.stringify(data));
        }
    )
    .fail(
        function(err) {
            alert(err);
        }
    );
}