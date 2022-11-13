$(document).ready(function(e){
    $("#button1").click(function(e){
        $.ajax({
            type : "POST",
            url : "http://localhost/my-projects/school%20project/control/index_control.php",
            data : {choice:"pharmaci"},
            dataType : "HTML"
        })
    })
    $("#button2").click(function(e){
        $.ajax({
            type : "POST",
            url : "http://localhost/my-projects/school%20project/control/index_control.php",
            data : {choice:"fornisseur"},
            dataType : "HTML"
        })
    })


})