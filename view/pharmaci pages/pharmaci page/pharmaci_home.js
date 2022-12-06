$(document).ready(function () {
    var priceOfOrderdMed = 0;
    var Total = 0;
    var IsFilterActive = false ;
    var PriceBetween = {min:{val:0,error:false},max:{val:0,error:false},valid:false};
    var QteBetween = {min:{val:0,error:false},max:{val:0,error:false},valid:false};
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
    //order popup start
    function SetValuesForOrderPopup(id_med,id_for,med_name,qte,price){
        document.getElementById("ordered_med_name").innerText = med_name
        document.getElementById("set_qte").max = qte
        priceOfOrderdMed = price
        $("#add_order").attr("ordered_id_med",id_med)
        $("#add_order").attr("ordered_id_for",id_for)

    }
    function UnsetValuesForOrderPopup(){
        document.getElementById("ordered_med_name").innerText =""
        document.getElementById("set_qte").max =""
        priceOfOrderdMed =0
        $("#add_order").attr("ordered_id_med","")
        $("#add_order").attr("ordered_id_for","")

    }     
    $("#add_command").click((e)=>{
        e.stopPropagation()
        $("#order_popup").fadeIn()
        var med_name = $("#add_command").attr("med_name")
        var med_qte =  $("#add_command").attr("qte")
        var med_price =  $("#add_command").attr("price")
        var id_med =  $("#add_command").attr("id_med")
        var id_for =  $("#add_command").attr("id_for")

        SetValuesForOrderPopup(id_med,id_for,med_name,med_qte,med_price)
        console.log($("#add_order").attr("ordered_id_med"),$("#add_order").attr("ordered_id_for"),priceOfOrderdMed)
    })

    $("#exite_order_popup").click((e)=>{
        e.stopPropagation()
        UnsetValuesForOrderPopup()
        $("#order_popup").fadeOut()
        Total = 0
    })
    
    function OnRangeChange(e){
        var value = e.target.value
        document.getElementById("qte_val").innerText = value
        Total = value*priceOfOrderdMed
        document.getElementById("order_total").innerText = Total
        
    }
    $("#set_qte").change((e)=>{
        OnRangeChange(e)
    })

    //order popup end
    //for filter_popup start
    $("#filter_button").click(()=>{
        IsFilterActive = true;
        $("#filter_popup").fadeIn()
    })
    $("#filter_popup_con").click((e)=>{
        e.stopPropagation()
    })
    $("#filter_popup").click(()=>{
        $("#filter_popup").fadeOut()
    })
    function onPriceGrateChange(){
        var ele = document.getElementById("PriceGrater")
        var PriceGrateVal = parseInt(ele.value)
        var check1 = /^[0-9]{0,}$/
        var check2 = PriceGrateVal >= PriceBetween.min.val 
        if(check1.test(PriceGrateVal)==true && check2 == true){
            PriceBetween.max.val = PriceGrateVal
            PriceBetween.max.error = false
            ele.style.backgroundColor = "#8EC5FC"
        }else{
            PriceBetween.max.val = 0
            PriceBetween.max.error = true
            ele.style.backgroundColor = "#f40d3c"
        }
    }
    
    function onPriceLessChange(){
        var ele = document.getElementById("PriceLess")
        var PriceLessVal = parseInt(ele.value)
        var check1 = /^[0-9]{0,}$/
        var check2 = PriceLessVal <= PriceBetween.max.val
        if(check1.test(PriceLessVal)==true & check2==true){
            PriceBetween.min.val = PriceLessVal
            PriceBetween.min.error = false
            ele.style.backgroundColor = "#8EC5FC"
        }else{
            PriceBetween.min.val = 0
            PriceBetween.min.error = true
            ele.style.backgroundColor = "#f40d3c"
        }
        
    }
    function onQteGrateChange(){
        var ele = document.getElementById("QteGrater")
        var PriceGrateVal = parseInt(ele.value)
        var check1 = /^[0-9]{0,}$/
        var check2 = PriceGrateVal >= QteBetween.min.val 
        if(check1.test(PriceGrateVal)==true && check2 == true){
            QteBetween.max.val = PriceGrateVal
            QteBetween.max.error = false
            ele.style.backgroundColor = "#8EC5FC"
        }else{
            QteBetween.max.val = 0
            QteBetween.max.error = true
            ele.style.backgroundColor = "#f40d3c"
        }
    }
    
    function onQteLessChange(){
        var ele = document.getElementById("QteLess")
        var PriceLessVal = parseInt(ele.value)
        var check1 = /^[0-9]{0,}$/
        var check2 = PriceLessVal <= QteBetween.max.val
        if(check1.test(PriceLessVal)==true & check2==true){
            QteBetween.min.val = PriceLessVal
            QteBetween.min.error = false
            ele.style.backgroundColor = "#8EC5FC"
        }else{
            QteBetween.min.val = 0
            QteBetween.min.error = true
            ele.style.backgroundColor = "#f40d3c"
        }
        
    }

    $("#PriceLess").change((e)=>{
        onPriceLessChange()
        onPriceGrateChange()
        console.log(PriceBetween)
    })

    $("#PriceGrater").change((e)=>{
        onPriceGrateChange()
        onPriceLessChange()
        console.log(PriceBetween)

    })
    $("#QteGrater").change(()=>{
        onQteGrateChange()
        onQteLessChange()
    })
    $("#QteLess").change(()=>{
        onQteLessChange()
        onQteGrateChange()
    })
    //for filter_popup end

    //for search popup start
    $("#search_med").click(()=>{
        $("#search_popup").fadeIn()
    })
    $("#cancel").click(()=>{
        $("#search_popup").fadeOut()
    })
    //for search popup end
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
    
});