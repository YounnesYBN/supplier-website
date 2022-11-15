$(document).ready(function(e){
    $("#button1").click(function(e){
        $.ajax({
            type : "POST",
            url : "http://localhost/my-projects/school%20project/control/index_control.php",
            data : {choice:"pharmaci"},
            dataType : "HTML"
        })
        location.href = "http://localhost/my-projects/school%20project/view/singup pharmaci/pharmaci_singup.html"
    })
    $("#button2").click(function(e){
        $.ajax({
            type : "POST",
            url : "http://localhost/my-projects/school%20project/control/index_control.php",
            data : {choice:"fornisseur"},
            dataType : "HTML"
        })
        location.href = "http://localhost/my-projects/school%20project/view/singup fornisseur/fornisseur_singup.html"
    })


})