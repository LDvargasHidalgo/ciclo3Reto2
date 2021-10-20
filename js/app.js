function consultar(){
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        dataType:"json",
        success: function (respose){
            $("#contenidoTabla").empty();
            respose.items.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.email));
                row.append($("<td>").text(element.age));
                row.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-warning btn-block w-100" onclick="actualizarCloud('+element.id+')">Editar</button>'));
                row.append($("<td class='text-center'>").append('<button type="button" class="btn btn-outline-danger btn-block w-100" onclick="eliminar('+element.id+',\''+element.age+'\')">Eliminar</button>'));
               $("#contenidoTabla").append(row);
            });
        },
        error: function(xhr,status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

function crear(){
    var id = $("#id").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var age = $("#age").val();
    
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        dataType:"json",
        data:{
            id:id,
            name:name,
            email:email,
            age:age,
            
        },
        statusCode: {
            201: function(){
                consultar();
            }
        }
    });
}

function actualizar(){
    var id = $("#id").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var age= $("#age").val();
    var data = {
        id:id,
        name:name,
        email:email,
        age:age,
        
        
    }; //Creamos un objeto con los datos a actualizar.
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        dataType:"json",
        data:JSON.stringify(data), //convertimos el objeto a un string para que sea compatible con el formato de la API.
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function(){
                $("#id").val("");
                $("#id").attr("readonly",false);
                $("#name").val("");
                $("#email").val("");
                $("#age").val("");
                consultar();
            }
        }
    });
}

function eliminar(id,name){
    var r = confirm("Segur@ de eliminar la nube: "+id+" con nombre: "+name); //Primero preguntamos si está seguro de eliminar.
    if (r == true) { //Si está seguro, procedemos a eliminar.
        var data = {
            id:id
        }; //Creamos un objeto con los datos a eliminar.
        $.ajax({
            url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/client",
            type:"DELETE",
            dataType:"json",
            data:JSON.stringify(data), //convertimos el objeto a un string para que sea compatible con el formato de la API.
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function(){ //Si la API devuelve un código 204, significa que se eliminó correctamente.
                    consultar(); //Consultamos nuevamente la tabla para actualizarla.
                }
            }
        });
    }
}

function actualizarCloud(id){
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/client/client/?id="+id,
        type:"GET",
        dataType:"json",
        success: function (respose){
            if(respose.items.length>0){
                $("#id").val(respose.items[0].id);
                $("#id").attr("readonly",true);
                $("#name").val(respose.items[0].name);
                $("#email").val(respose.items[0].email);
                $("#age").val(respose.items[0].age);
               
            }else{
                alert("No se encontró el registro.");
            }
        },
        error: function(xhr,status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

$(document).ready(function(){
    consultar();
});