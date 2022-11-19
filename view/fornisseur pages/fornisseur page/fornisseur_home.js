$(document).ready(function(){
    //add popup
    $("#add_med").click(function(e){
        $("#add_popup").fadeIn();
    })
    $("#cancel_empty_con #cancel").click(function(e){
        $("#add_popup").fadeOut();
    })
    $("#cancel_empty_con #empty").click(function(){
        $("#medicient_name").val("")
        $("#number_of_medicents").val("")
        $("#price").val("")
    })
    //add popup
    //delete popup
    $("#delete_med").click(()=>{
        $("#delete_popup").fadeIn();
    })
    $("#cancel_delete_popup").click(()=>{
        $("#delete_popup").fadeOut();
    })
    //delete popup

    //edite popup
    $("#edite_med").click(function(e){
        $("#edite_popup").fadeIn();
    })
    $("#cancel_empty_con #cancel").click(function(e){
        $("#edite_popup").fadeOut();
    })
    $("#cancel_empty_con #empty").click(function(){
        $("#medicient_name_edite").val("")
        $("#number_of_medicents_edite").val("")
        $("#price_edite").val("")
    })
    //edite popup
    //succes error popup

    $("#error_popup_child").click(function(e){
        e.stopPropagation()
        
    })
    $("#success_popup_child").click(function(e){
        e.stopPropagation()
        
    })

    $(document).click(function (e) { 
        $("#error_popup").fadeOut(500);
        $("#success_popup").fadeOut(500);
    });
    function ActiveErrorPopUp(message){
        document.getElementById("error_message_pop").innerHTML= message
        $("#error_popup").fadeIn(500); 
    }
    function ActiveSuccessPopUp(message){
        document.getElementById("success_message_pop").innerHTML= message
        $("#success_popup").fadeIn(500); 
    }
    //succes error popup
    

    
})