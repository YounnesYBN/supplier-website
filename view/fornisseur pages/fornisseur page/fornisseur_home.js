$(document).ready(function(){
    //check access
    $.ajax({
        type: "get",
        url: "http://localhost/my-projects/school%20project/control/fornisseur_home_page_control.php",
        data: {checkAccess : "true"},
        dataType: "JSON",
        success: function (response) {
            console.log(response)
            if(response.allow==false){
                location.href ="http://localhost/my-projects/school%20project/view/login%20fornisseur/fornisseur_login.html" 
            }
        }
    });
    //check access

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

    //anas code
    var addErrorObject = {nameErr : "",numberErr:"",priceErr:""}
    var nameValidAdd = true;
    var numberValidAdd = true;
    var priceValidAdd = true;

    //function to check name
    function onNameChange(){
        const nameEle = document.getElementById("medicient_name")
        const nameVal = nameEle.value
        const namrgx =/^[a-zA-Z]{1,}$/
        const test = namrgx.test(nameVal)
        if(test==true ){
            nameEle.style.borderColor = "#9b59b6";
            nameValidAdd = true;
            addErrorObject.nameErr=""
        }else{
            nameEle.style.borderColor = "red";
            nameValidAdd = false;
            addErrorObject.nameErr="-name is unvalid it should be string"

        }
    }
    //function to check number
    function onNumberChange(){
        const numberEle = document.getElementById("number_of_medicents");
        const numberVal = numberEle.value;
        const nbrrgx= /^[0-9]{1,}$/
        const test = nbrrgx.test(numberVal)
        if(test == true){
            numberEle.style.borderColor = "#9b59b6";
            numberValidAdd = true;
            addErrorObject.numberErr=""

        }else{
            numberEle.style.borderColor = "red";
            numberValidAdd = false;
            addErrorObject.numberErr="-number is unvalid it should be int";
        }
    }
    //function to check price
    function onPriceChange(){
        const priceEle = document.getElementById("price");
        const priceVal = priceEle.value;
        const  pricrgx= /^[0-9]{1,}$/
        const test = pricrgx.test(priceVal)
        if(test == true){
            priceEle.style.borderColor = "#9b59b6";
            priceValidAdd = true;
            addErrorObject.priceErr="";

        }else{
            priceEle.style.borderColor = "red";
            priceValidAdd = false;
            addErrorObject.priceErr="-price is unvalid it should be int";
            
        }
    }

    $("#medicient_name").keyup(function(e){
        onNameChange()
    })

    $("#number_of_medicents").keyup(function (e) { 
        onNumberChange()
    });

    $("#price").keyup(function (e) { 
        onPriceChange()
    });

    $("#add").click(function(e){
        e.stopPropagation()

        onNameChange();
        onNumberChange();
        onPriceChange()
        if(nameValidAdd==true & numberValidAdd==true & priceValidAdd==true){
            var name = document.getElementById("medicient_name").value
            var number = document.getElementById("number_of_medicents").value
            var price = document.getElementById("price").value

            ActiveSuccessPopUp("input are valide")
        }else{
           var message = Object.values(addErrorObject).filter((value)=>{
                if(value.length>0){
                    return value
                }
           }).join("<br>")
           ActiveErrorPopUp(message)
        }
    })
    // Anas code

    //exite button
    $("#logout").click(()=>{
        $.ajax({
            type: "post",
            url: "http://localhost/my-projects/school%20project/control/fornisseur_home_page_control.php",
            data: {logout:"true"},
            dataType: "HTML",
            success: function (response) {
                location.href="http://localhost/my-projects/school%20project/index.html";
            }
        });
    })
    //exite button
    

    
})