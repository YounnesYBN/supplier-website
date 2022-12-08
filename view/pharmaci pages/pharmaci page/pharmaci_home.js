$(document).ready(function () {
    var AllData = []
    var priceOfOrderdMed = 0;
    var Total = 0;
    var IsFilterActive = false ;
    var PriceBetween = {min:{val:0,error:false},max:{val:0,error:false},valid:true};
    var QteBetween = {min:{val:0,error:false},max:{val:0,error:false},valid:true};
    var PriceFilter = {min:0,max:0,isActive:false,status:""}
    var QteFilter = {min:0,max:0,isActive:false,status:""}
    var searchValid = true;
    var SearchValidValue = "";
    var searchWay = "allData"
    var allWays = [
        {way:"allData",method:searchwayAllWays},
        {way:"price",method:searchwayPrice},
        {way:"qte",method:searchwayQte},
        {way:"search",method:searchwaySearch},
        {way:"price&qte",method:searchwayPriceQte},
        {way:"search&qte",method : searchwaySearchQte},
        {way:"search&price",method : searchwaySearchPrice},
        {way:"search&price&qte",method : searchwaySearchPriceQte}
    ]
    function onCommandButtonClick(e){
        e.stopPropagation()
        $("#order_popup").fadeIn()
        var ele = e.target
        var med_name = ele.getAttribute("med_name")
        var med_qte =  ele.getAttribute("qte")
        var med_price = ele.getAttribute("price")
        var id_med =  ele.getAttribute("id_med")
        var id_for =  ele.getAttribute("id_for")

        SetValuesForOrderPopup(id_med,id_for,med_name,med_qte,med_price)
        
    }


    
   
 
    //check Access
    $.ajax({
        type: "get",
        url: "http://localhost/my-projects/school%20project/control/pharmaci_home_page_control.php",
        data: {checkAccess : "true"},
        dataType: "JSON",
        success: function (response) {
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

    // refusee data
    $.ajax({
        type:"get",
        url:"http://localhost/my-projects/school%20project/control/pharmaci_home_page_control.php",
        data:{getdataR:"true"},
        dataType:"JSON",
        success:function(reponse){
            document.querySelector("#all_commande_refused #display").innerHTML=reponse.get_refusee
            
        }
    })
    
    $.ajax({
        type:"get",
        url:"http://localhost/my-projects/school%20project/control/pharmaci_home_page_control.php",
        data:{getdataA:"true"},
        dataType:"JSON",
        success:function(reponse){
            document.querySelector("#all_commande_canceled #display").innerHTML=reponse.get_anul;
        }
    })


    //get all avalibal commande 
    $.ajax({
        type: "get",
        url: "http://localhost/my-projects/school%20project/control/pharmaci_home_page_control.php",
        data: {get_all_ord:"true"},
        dataType: "JSON",
        success: function (response) {
            AllData = AllData.concat(response.avalibal_com)
            searchwayAllWays()
        }
    });
    //get all pharmaci orders
    $.ajax({
        type: "get",
        url: "http://localhost/my-projects/school%20project/control/pharmaci_home_page_control.php",
        data: {get_pharmaci_ord:"true"},
        dataType: "JSON",
        success: function (response) {
            document.querySelector("#all_commande_unrefused #display").innerHTML = response.encour_accepter_orders
        }
    });
    
 searchwayAllWays()
 
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
        document.getElementById("qte_val").innerText = 1
        Total = price
        document.getElementById("order_total").innerText = price

    }
    function UnsetValuesForOrderPopup(){
        document.getElementById("ordered_med_name").innerText =""
        document.getElementById("set_qte").max =""
        priceOfOrderdMed =0
        $("#add_order").attr("ordered_id_med","")
        $("#add_order").attr("ordered_id_for","")
        document.getElementById("set_qte").value = 1

    }    
    $(".add_command").click((e)=>{
        onCommandButtonClick(e)
    })

    $("#exite_order_popup").click((e)=>{
        e.stopPropagation()
        UnsetValuesForOrderPopup()
        $("#order_popup").fadeOut()
        Total = 0
    })
    $("#add_order").click((e)=>{
        var ordered_id_med = e.target.getAttribute("ordered_id_med")
        var ordered_id_for = e.target.getAttribute("ordered_id_for")
        console.log(Total,ordered_id_for,ordered_id_med,document.getElementById("set_qte").value)
        
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
        setFilterPrice()
        setQteFilter()
    })
    function setFilterPrice(){
        const {valid,max,min} = PriceBetween ;
        if(valid==true){
            if(min.val!=max.val){
                PriceFilter.status="Nequal"
                PriceFilter.max = max.val
                PriceFilter.min = min.val
                PriceFilter.isActive=true
            }else{
                if(max.val!=0 & min.val!=0){
                    PriceFilter.status="equal"
                    PriceFilter.max = max.val
                    PriceFilter.min = min.val
                    PriceFilter.isActive=true
                }else{
                    PriceFilter.isActive=false
                }
            }
        }else{
            PriceFilter.isActive=false
        }
    }
    function setQteFilter(){
        const {valid,max,min} = QteBetween ;
        if(valid==true){
            if(min.val!=max.val){
                QteFilter.status="Nequal"
                QteFilter.max = max.val
                QteFilter.min = min.val
                QteFilter.isActive=true
            }else{
                if(max.val!=0 & min.val!=0){
                    QteFilter.status="equal"
                    QteFilter.max = max.val
                    QteFilter.min = min.val
                    QteFilter.isActive=true
                }else{
                    QteFilter.isActive=false
                }
            }
        }else{
            QteFilter.isActive=false
        }
    }
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
        PriceBetween.valid = PriceBetween.max.error==false&&PriceBetween.min.error==false?true:false;
    })

    $("#PriceGrater").change((e)=>{
        onPriceGrateChange()
        onPriceLessChange()
        PriceBetween.valid = PriceBetween.max.error==false&&PriceBetween.min.error==false?true:false;
    })
    $("#QteGrater").change(()=>{
        onQteGrateChange()
        onQteLessChange()
        QteBetween.valid = QteBetween.max.error==false&& QteBetween.min.error==false?true:false;
    })
    $("#QteLess").change(()=>{
        onQteLessChange()
        onQteGrateChange()
        QteBetween.valid = QteBetween.max.error==false&& QteBetween.min.error==false?true:false;
    })
    //for filter_popup end

    //for search popup start
    function searchwaySearch(){
        var resultCon = document.getElementById("show_result")
        resultCon.innerHTML = ""
        AllData.map((element)=>{
            if(element.med_name==SearchValidValue){

                resultCon.innerHTML += `
                <div class="med">
                    <div id="info">
                      <div id="for_name">
                            <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                      </div>
                      <div id="med_info">
                        <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                        <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                        <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                      </div>
                    </div>
                    <div id="command_con">
                        <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                    </div>
                </div>`
            }
        })
        $(".add_command").click((e)=>{
            onCommandButtonClick(e)
        })
    }
    function searchwayAllWays(){
        var resultCon = document.getElementById("show_result")
        resultCon.innerHTML = ""
        AllData.map((element)=>{
                resultCon.innerHTML += `
                <div class="med">
                    <div id="info">
                      <div id="for_name">
                            <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                      </div>
                      <div id="med_info">
                        <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                        <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                        <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                      </div>
                    </div>
                    <div id="command_con">
                        <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                    </div>
                </div>`
            
        })
        $(".add_command").click((e)=>{
            onCommandButtonClick(e)
        }) 
    }
    function searchwayQte(){
        let min  = QteFilter.min
        let max = QteFilter.max
        let status = QteFilter.status
        var resultCon = document.getElementById("show_result")
        resultCon.innerHTML = ""
        
            if(status=="equal"){
                AllData.map((element)=>{
                    if(element.qte<max){

                        resultCon.innerHTML += `
                        <div class="med">
                            <div id="info">
                              <div id="for_name">
                                    <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                              </div>
                              <div id="med_info">
                                <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                                <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                                <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                              </div>
                            </div>
                            <div id="command_con">
                                <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }else{
                AllData.map((element)=>{
                    if(element.qte>=min && element.qte<=max){
                    
                        resultCon.innerHTML += `
                        <div class="med">
                            <div id="info">
                              <div id="for_name">
                                    <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                              </div>
                              <div id="med_info">
                                <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                                <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                                <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                              </div>
                            </div>
                            <div id="command_con">
                                <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }
            $(".add_command").click((e)=>{
                onCommandButtonClick(e)
            })
    }
    function searchwayPrice(){
        let min  = PriceFilter.min
        let max = PriceFilter.max
        let status = PriceFilter.status
        var resultCon = document.getElementById("show_result")
        resultCon.innerHTML = ""
        AllData.map((element)=>{
            if(status=="equal"){
                if(element.price<max){

                    resultCon.innerHTML += `
                    <div class="med">
                        <div id="info">
                          <div id="for_name">
                                <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                          </div>
                          <div id="med_info">
                            <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                            <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                            <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                          </div>
                        </div>
                        <div id="command_con">
                            <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }else{
                if(element.price>=min && element.price<=max){

                    resultCon.innerHTML += `
                    <div class="med">
                        <div id="info">
                          <div id="for_name">
                                <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                          </div>
                          <div id="med_info">
                            <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                            <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                            <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                          </div>
                        </div>
                        <div id="command_con">
                            <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }
        })
        $(".add_command").click((e)=>{
            onCommandButtonClick(e)
        })
    }
    function searchwaySearchQte(){
        let min  = QteFilter.min
        let max = QteFilter.max
        let status = QteFilter.status
        var resultCon = document.getElementById("show_result")
        resultCon.innerHTML = ""
        AllData.map((element)=>{
            if(status=="equal"){
                if(element.qte<max && element.med_name==SearchValidValue){

                    resultCon.innerHTML += `
                    <div class="med">
                        <div id="info">
                          <div id="for_name">
                                <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                          </div>
                          <div id="med_info">
                            <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                            <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                            <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                          </div>
                        </div>
                        <div id="command_con">
                            <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }else{
                if(element.qte>=min && element.qte<=max && element.med_name==SearchValidValue){

                    resultCon.innerHTML += `
                    <div class="med">
                        <div id="info">
                          <div id="for_name">
                                <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                          </div>
                          <div id="med_info">
                            <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                            <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                            <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                          </div>
                        </div>
                        <div id="command_con">
                            <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }
        })
        $(".add_command").click((e)=>{
            onCommandButtonClick(e)
        })
    }
    function searchwaySearchPrice(){
        let min  = PriceFilter.min
        let max = PriceFilter.max
        let status = PriceFilter.status
        var resultCon = document.getElementById("show_result")
        resultCon.innerHTML = ""
        AllData.map((element)=>{
            if(status=="equal"){
                if(element.price<max && element.med_name==SearchValidValue){

                    resultCon.innerHTML += `
                    <div class="med">
                        <div id="info">
                          <div id="for_name">
                                <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                          </div>
                          <div id="med_info">
                            <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                            <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                            <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                          </div>
                        </div>
                        <div id="command_con">
                            <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }else{
                if(element.price>=min && element.price<=max && element.med_name==SearchValidValue){

                    resultCon.innerHTML += `
                    <div class="med">
                        <div id="info">
                          <div id="for_name">
                                <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                          </div>
                          <div id="med_info">
                            <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                            <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                            <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                          </div>
                        </div>
                        <div id="command_con">
                            <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }
        })
        $(".add_command").click((e)=>{
            onCommandButtonClick(e)
        })
    }
    function searchwayPriceQte(){
        let Pmin  = PriceFilter.min
        let Pmax = PriceFilter.max
        let Pstatus = PriceFilter.status
        let Qmin  = QteFilter.min
        let Qmax = QteFilter.max
        let Qstatus = QteFilter.status
        var resultCon = document.getElementById("show_result")
        resultCon.innerHTML = ""
        if(Pstatus=="equal"&&Qstatus=="equal"){
            AllData.map((element)=>{
                if(element.qte<=Qmax && element.price<=Pmax){
                    resultCon.innerHTML += `
                    <div class="med">
                        <div id="info">
                          <div id="for_name">
                                <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                          </div>
                          <div id="med_info">
                            <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                            <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                            <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                          </div>
                        </div>
                        <div id="command_con">
                            <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            })
        }else{
            if(Pstatus=="equal"&&Qstatus=="Nequal"){
                AllData.map((element)=>{
                    if((element.qte<=Qmax && element.qte>=Qmin) && element.price<=Pmax){
                        resultCon.innerHTML += `
                        <div class="med">
                            <div id="info">
                              <div id="for_name">
                                    <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                              </div>
                              <div id="med_info">
                                <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                                <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                                <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                              </div>
                            </div>
                            <div id="command_con">
                                <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }else{
                AllData.map((element)=>{
                    if(element.qte<=Qmax && (element.price<=Pmax && element.price>=Pmin)){
                        resultCon.innerHTML += `
                        <div class="med">
                            <div id="info">
                              <div id="for_name">
                                    <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                              </div>
                              <div id="med_info">
                                <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                                <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                                <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                              </div>
                            </div>
                            <div id="command_con">
                                <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }
        }
        $(".add_command").click((e)=>{
            onCommandButtonClick(e)
        })
    }
    function searchwaySearchPriceQte(){
        let Pmin  = PriceFilter.min
        let Pmax = PriceFilter.max
        let Pstatus = PriceFilter.status
        let Qmin  = QteFilter.min
        let Qmax = QteFilter.max
        let Qstatus = QteFilter.status
        var resultCon = document.getElementById("show_result")
        resultCon.innerHTML = ""
        if(Pstatus=="equal"&&Qstatus=="equal"){
            AllData.map((element)=>{
                if(element.qte<=Qmax && element.price<=Pmax && element.med_name == SearchValidValue){
                    resultCon.innerHTML += `
                    <div class="med">
                        <div id="info">
                          <div id="for_name">
                                <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                          </div>
                          <div id="med_info">
                            <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                            <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                            <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                          </div>
                        </div>
                        <div id="command_con">
                            <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            })
        }else{
            if(Pstatus=="equal"&&Qstatus=="Nequal"){
                AllData.map((element)=>{
                    if((element.qte<=Qmax && element.qte>=Qmin) && element.price<=Pmax && element.med_name == SearchValidValue){
                        resultCon.innerHTML += `
                        <div class="med">
                            <div id="info">
                              <div id="for_name">
                                    <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                              </div>
                              <div id="med_info">
                                <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                                <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                                <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                              </div>
                            </div>
                            <div id="command_con">
                                <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }else{
                AllData.map((element)=>{
                    if(element.qte<=Qmax && (element.price<=Pmax && element.price>=Pmin) && element.med_name == SearchValidValue){
                        resultCon.innerHTML += `
                        <div class="med">
                            <div id="info">
                              <div id="for_name">
                                    <img src="./Whiteuser.png" alt="" width="21px"><h3>${element.for_name}</h3>
                              </div>
                              <div id="med_info">
                                <div id="med_name"><img src="./Whitepill.png" alt="" width="20px"><h4>${element.med_name}</h4></div>
                                <div id="med_qte"><img src="./Whitestore.png" alt="" width="20px"> <h4>${element.qte}</h4></div>
                                <div id="med_price"><img src="./Whiteprice.png" alt="" width="20px"><h4>${element.price}</h4></div>
                              </div>
                            </div>
                            <div id="command_con">
                                <button class="add_command"  id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }
        }
        $(".add_command").click((e)=>{
            onCommandButtonClick(e)
        })
    }

    function FindSearchWay(){
        var searchFinalValid = searchValid==true && SearchValidValue.length>0 ?true:false;
        if(searchFinalValid==true&&PriceFilter.isActive==true&&QteFilter.isActive==true){
            searchWay = "search&price&qte"
        }else{
            if(searchFinalValid==true&&PriceFilter.isActive==true){
                searchWay = "search&price"
            }else if(searchFinalValid==true&&QteFilter.isActive==true) {
                searchWay = "search&qte"
            }else if(PriceFilter.isActive==true&&QteFilter.isActive==true){
                searchWay = "price&qte"
            }else{
                if(searchFinalValid == true){
                    searchWay = "search"
                }
                else if(QteFilter.isActive==true){
                    searchWay = "qte"
                }else if(PriceFilter.isActive==true){
                    searchWay = "price"
                }
            }
        }
    }

    function onSearchBarChange(){
        var ele = document.getElementById("search_bar")
        var Searchvalue = ele.value
        var check1 = /^[a-zA-Z]{0,}$/
        if(check1.test(Searchvalue)==true){
            ele.style.borderColor = "#8EC5FC"
            searchValid = true
            SearchValidValue = Searchvalue
        }else{
            ele.style.borderColor = "#f40d3c"
            searchValid =false 
            SearchValidValue = ""
        }
    }
    $("#search_med").click(()=>{
        $("#search_popup").fadeIn()
    })
    $("#cancel").click(()=>{
        $("#search_popup").fadeOut()
    })
    $("#search_bar").keyup(function (e) { 
        onSearchBarChange()
    });
    $("#search_button").click((e)=>{
        var message = []
        var isErrorEX = false
        onSearchBarChange()
        if(searchValid==false){
            message.push("-search value is unvalid")
            isErrorEX = true
        }
        if(PriceBetween.valid==false){
            message.push("-price filter is unvalid")
            isErrorEX = true
        }
        if(QteBetween.valid==false){
            message.push("-Qte filter is unvalid ")
            isErrorEX = true
        }

        if(isErrorEX == true){
            ActiveErrorPopUp(message.join("<br>"))
            searchwayAllWays()
        }else{

            FindSearchWay()
            allWays.map((way)=>{
                if(way.way==searchWay){
                    way.method()
                }
            })
        }

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

    //concele order start
    $(".cancelOrd_button").click((e)=>{
        var ele  = e.target
        var CanceldIdCom = ele.getAttribute("id_command")
        // $.ajax({
        //     type: "method",
        //     url: "url",
        //     data: "data",
        //     dataType: "dataType",
        //     success: function (response) {
                
        //     }
        // });
        
    })
    //concele order end
    //delete refused Order start
    $(".DeleteOrd_button").click((e)=>{
        var ele  = e.target
        var DeletedRefusedIdCom = ele.getAttribute("id_command")
        // $.ajax({
        //     type: "method",
        //     url: "url",
        //     data: "data",
        //     dataType: "dataType",
        //     success: function (response) {
                
        //     }
        // });
        
    })
    //delete refused Order end
    //delete canceled orders start
    $(".Delete_canceled_button").click((e)=>{
        var ele  = e.target
        var DeletedCanceledIdCom = ele.getAttribute("id_command")
        // $.ajax({
        //     type: "method",
        //     url: "url",
        //     data: "data",
        //     dataType: "dataType",
        //     success: function (response) {
                
        //     }
        // });
        
    })
    //delete canceled orders end
});