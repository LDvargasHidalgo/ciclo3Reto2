function consultar(){
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        dataType:"json",
        success: function (respose){
            $("#contenidoTabla").empty();
            respose.items.forEach(element => {
                var row = $("<tr>");
                console.log(element);
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.messagetext));
                row.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-warning btn-block w-100" onclick="actualizarCloud('+element.id+')">Editar</button>'));
                row.append($("<td class='text-center'>").append('<button type="button" class="btn btn-outline-danger btn-block w-100" onclick="eliminar('+element.id+',\''+element.messageText+'\')">Eliminar</button>'));
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
    var messagetext = $("#messagetext").val();
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        dataType:"json",
        data:{
            id:id,
            messagetext:messagetext,            
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
    var messagetext = $("#messagetext").val();
   
    var data = {
        id:id,
        messagetext:messagetext,
        
    }; //Creamos un objeto con los datos a actualizar.
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        dataType:"json",
        data:JSON.stringify(data), //convertimos el objeto a un string para que sea compatible con el formato de la API.
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function(){
                $("#id").val("");
               /*  que el campo id sea solo lectura en actuaizar */ 
                $("#id").attr("readonly",false);
                $("#messagetext").val("");               
                consultar();
            }
        }
    });
}

function eliminar(id,name){
    var r = confirm("Segur@ de eliminar el id: "+id+" con Msj: "+messagetext); //Primero preguntamos si está seguro de eliminar.
    if (r == true) { //Si está seguro, procedemos a eliminar.
        var data = {
            id:id
        }; //Creamos un objeto con los datos a eliminar.
        $.ajax({
            url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message",
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
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/message/message/?id="+id,
        type:"GET",
        dataType:"json",
        success: function (respose){
            if(respose.items.length>0){
                $("#id").val(respose.items[0].id);
                $("#id").attr("readonly",true);
                $("#messagetext").val(respose.items[0].messagetext);
                
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