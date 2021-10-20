function consultar(){
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/cloud/cloud",
        type:"GET",
        dataType:"json",
        success: function (respose){
            $("#contenidoTabla").empty();
            respose.items.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.brand));
                row.append($("<td>").text(element.model));
                row.append($("<td>").text(element.category_id));+
                row.append($("<td>").text(element.name));
                row.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-warning btn-block w-100" onclick="actualizarCloud('+element.id+')">Edit</button>'));
                row.append($("<td class='text-center'>").append('<button type="button" class="btn btn-outline-danger btn-block w-100" onclick="eliminar('+element.id+',\''+element.name+'\')">Remove</button>'));
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
    var brand = $("#brand").val();
    var model = $("#model").val();
    var category_id = $("#category_id").val();
    var name = $("#name").val();
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/cloud/cloud",
        type:"POST",
        dataType:"json",
        data:{
            id:id,
            brand:brand,
            model:model,
            category_id:category_id,
            name:name,
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
    var brand = $("#brand").val();
    var model = $("#model").val();
    var category_id = $("#category_id").val();
    var name = $("#name").val();
    var data = {
        id:id,
        brand:brand,
        model:model,
        category_id:category_id,
        name:name,
    }; //Creamos un objeto con los datos a actualizar.
    $.ajax({
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/cloud/cloud",
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
                $("#brand").val("");
                $("#model").val("");
                $("#category_id").val("");
                $("#name").val("");
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
            url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/cloud/cloud",
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
        url:"https://ged8703f7997071-dblaurad.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/cloud/cloud/?id="+id,
        type:"GET",
        dataType:"json",
        success: function (respose){
            if(respose.items.length>0){
                $("#id").val(respose.items[0].id);
                $("#id").attr("readonly",true);
                $("#brand").val(respose.items[0].brand);
                $("#model").val(respose.items[0].model);
                $("#category_id").val(respose.items[0].category_id);
                $("#name").val(respose.items[0].name);
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