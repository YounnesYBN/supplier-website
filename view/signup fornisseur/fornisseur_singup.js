$(document).ready(()=>{
    //for the popup
    $("#popup_child").click(function(e){
        e.stopPropagation()
        
    })

    $(document).click(function (e) { 
        $("#popup").fadeOut(500); 
    });
    function ActivePopUp(message){
        console.log(document.getElementById("message_pop"))
        document.getElementById("message_pop").innerHTML= message
        $("#popup").fadeIn(500); 
    }
    //for the popup

    
    
    
})
     