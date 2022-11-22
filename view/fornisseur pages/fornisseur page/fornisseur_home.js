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
    //get user data every time we login
    $.ajax({
        type: "GET",
        url: "http://localhost/my-projects/school%20project/control/fornisseur_home_page_control.php",
        data: {get_info:"true"},
        dataType: "JSON",
        success: function (response) {
            document.getElementById("username").innerText = response.username;
            document.getElementById("email").innerText += response.email;
            document.getElementById("edite_select").innerHTML += response.editeOption;
            document.getElementById("delete_select").innerHTML += response.deleteOption;
            document.getElementById("display").innerHTML = response.medCom;
        }   
    });

    //get user data every time we login

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
            nameEle.style.borderColor = "#00d4ff";
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
            numberEle.style.borderColor = "#00d4ff";
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
            priceEle.style.borderColor = "#00d4ff";
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
    //code to controle delete popup
    
        selectValidDelete = true;

        function onSelectDeleteChange(){
            const selectDeleteElement = document.getElementById("delete_select")
            const selectDeleteval = selectDeleteElement.value
            if(selectDeleteval=="default"){
                selectDeleteElement.style.borderColor = "red";
                selectValidDelete = false;

            }else{
                selectDeleteElement.style.borderColor = "#00d4ff";
                selectValidDelete = true;
            }
        }
        $("#delete_select").change((e)=>{
            onSelectDeleteChange()
                
        })
        $("#delete").click((e)=>{
            e.stopPropagation()
            onSelectDeleteChange()

            if(selectValidDelete){
                const medIdDelete =document.getElementById("delete_select").value
                
                // ActiveSuccessPopUp("-deleted successully")
            }else{
                ActiveErrorPopUp("-you need to choose a medicent")
            }
        })
        

    //code to controle delete popup
    var editeErrorObject = {nameErr : "",numberErr:"",priceErr:"",editeSelect:""}
    var selectValidEdite = true;
    var nameValidEdite = true;
    var numberValidEdite = true;
    var priceValidEdite = true;
    function onNameChangeEdite(){
        const nameEle = document.getElementById("medicient_name_edite")
        const nameVal = nameEle.value
        const namrgx =/^[a-zA-Z]{1,}$/
        const test = namrgx.test(nameVal)
        if(test==true ){
            nameEle.style.borderColor = "#00d4ff";
            nameValidEdite = true;
            editeErrorObject.nameErr=""
        }else{
            nameEle.style.borderColor = "red";
            nameValidEdite = false;
            editeErrorObject.nameErr="-name is unvalid it should be string"

        }
    }
    
    function onNumberChangeEdite(){
        const numberEle = document.getElementById("number_of_medicents_edite");
        const numberVal = numberEle.value;
        const nbrrgx= /^[0-9]{1,}$/
        const test = nbrrgx.test(numberVal)
        if(test == true){
            numberEle.style.borderColor = "#00d4ff";
            numberValidEdite  = true;
            editeErrorObject.numberErr=""

        }else{
            numberEle.style.borderColor = "red";
            numberValidEdite  = false;
            editeErrorObject.numberErr="-number is unvalid it should be int";
        }
    }
    
    function onPriceChangeEdite(){
        const priceEle = document.getElementById("price_edite");
        const priceVal = priceEle.value;
        const  pricrgx= /^[0-9]{1,}$/
        const test = pricrgx.test(priceVal)
        if(test == true){
            priceEle.style.borderColor = "#00d4ff";
            priceValidEdite = true;
            editeErrorObject.priceErr="";

        }else{
            priceEle.style.borderColor = "red";
            priceValidEdite = false;
            editeErrorObject.priceErr="-price is unvalid it should be int";
            
        }
    }
    $("#medicient_name_edite").keyup(()=>{
        onNameChangeEdite()
    })
    $("#number_of_medicents_edite").keyup(()=>{
        onNumberChangeEdite()
    })
    $("#price_edite").keyup(()=>{
        onPriceChangeEdite()
    })


    function onSelectEditeChange(){
        const selectDeleteElement = document.getElementById("edite_select")
        const selectDeleteval = selectDeleteElement.value
        if(selectDeleteval=="default"){
            selectDeleteElement.style.borderColor = "red";
            selectValidEdite = false;
            editeErrorObject.editeSelect = "-you need  to select a medicent"

        }else{
            selectDeleteElement.style.borderColor = "#00d4ff";
            selectValidEdite = true;
            editeErrorObject.editeSelect = ""
        }
    }
    $("#edite_select").change(()=>{
        onSelectEditeChange()
    })
    $("#edite").click((e)=>{
        e.stopPropagation()
        onNameChangeEdite()
        onNumberChangeEdite()
        onPriceChangeEdite()
        onSelectEditeChange()
        if(nameValidEdite==true&numberValidEdite==true&priceValidEdite==true&selectValidEdite==true){
            const idmed= $("#edite_select option:selected").attr("idmed")
            const nommed= $("#edite_select option:selected").attr("nommed")
            const qtemed= $("#edite_select option:selected").attr("qte")
            const pricemed= $("#edite_select option:selected").attr("price")
            // ActiveSuccessPopUp("inputs are valide")
        }else{
            var message = Object.values(editeErrorObject).filter((value)=>{
                if(value.length>0){
                    return value
                }
           }).join("<br>")
           ActiveErrorPopUp(message)
        }
    })
    
    //code to controle edite popup

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