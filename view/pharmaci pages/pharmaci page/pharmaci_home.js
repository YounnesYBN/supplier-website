$(document).ready(function () {
    //check Access
    $.ajax({
        type: "get",
        url: "http://localhost/my-projects/school%20project/control/pharmaci_home_page_control.php",
        data: {checkAccess : "true"},
        dataType: "JSON",
        success: function (response) {
            console.log(response)
            if(response.allow==false){
                location.href ="http://localhost/my-projects/school%20project/view/login%20pharmaci/pharmaci_login.html" 
            }
        }
    });
    //get data every time we login
    $.ajax({
        type: "GET",
        url: "http://localhost/my-projects/school%20project/control/pharmaci_home_page_control.php",
        data: {get_info:"true"},
        dataType: "JSON",
        success: function (response) {
            document.getElementById("username").innerText = response.username;
            document.getElementById("email").innerText += response.email;
        }   
    });
    //exite button
    $("#logout").click(()=>{
        $.ajax({
            type: "post",
            url: "http://localhost/my-projects/school%20project/control/pharmaci_home_page_control.php",
            data: {logout:"true"},
            dataType: "HTML",
            success: function (response) {
                location.href="http://localhost/my-projects/school%20project/index.html";
            }
        });
    })
    //exite button
});