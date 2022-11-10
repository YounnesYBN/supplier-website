$(document).ready(()=>{
    
    $("#popup_child").click(function(e){
        e.stopPropagation()
        
    })

    $(document).click(function (e) { 
        $("#popup").fadeOut(500); 
    });
    function ActivePopUp(message){
        $("#message_pop").innerText(message)
        $("#popup").fadeIn(500); 
    }
    
})
     