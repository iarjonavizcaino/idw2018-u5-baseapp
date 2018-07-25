$(function () {
    $('#tbUsuarios').DataTable({
        language: {
            //url:"http://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ to _END_ of _TOTAL_",
            "infoEmpty": "No ha datos",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontró",
            "paginate": {
                "first": "<<",
                "last": ">>",
                "next": ">",
                "previous": "<"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        },
        responsive:true,
        ajax: {
            url: "http://localhost:3002/usuarios/v1/usuario/",
            dataSrc: function (datos) {
                console.log(datos.users);
                return datos.users;
            }
        },
        columns: [
            {
                data: "name"
            },
            {
                data: "email"
            },
            {
                data: function (row) {
                    console.log(row._id);
                    var res = `<button id="btnBorrar"
                                class="btn btn-danger btn-xs" 
                                onclick="borrar('${row._id}')">
                                Eliminar
                                </button>`;
                    return res;
                }
            }
        ]
    });
});


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
            url: "http://localhost:3002/usuarios/v1/usuario/",
            type: "POST",
            data: {
                name: name,
                email: email,
                password: password
            }
        }
    )
        .done(
            function (data) {
                alert(JSON.stringify(data));

                $('#txtNombre').val('');
                $('#txtEmail').val('');
                $('#txtPassword').val('');

                $('#tbUsuarios').dataTable().api().ajax.reload();
            }
        )
        .fail(
            function (err) {
                alert(err);
            }
        );
}

function borrar(id) {
    $.ajax({
        url: "http://localhost:3002/usuarios/v1/usuario/" + id,
        type: "delete"
    })
        .done(
            function (data) {
                alert(data.msg);
                $('#tbUsuarios').dataTable().api().ajax.reload();
            }
        )
        .fail(
            function (err) {
                alert(err);
            }
        )
}