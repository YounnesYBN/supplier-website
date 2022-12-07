$(document).ready(function () {
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
    var AllData = [{id_med:1,id_for:1,med_name:"Benson",for_name:"Benjamen",qte:61,price:60},
    {id_med:2,id_for:2,med_name:"Broderick",for_name:"Weston",qte:98,price:98},
    {id_med:3,id_for:3,med_name:"Dalli",for_name:"Padraig",qte:7,price:85},
    {id_med:4,id_for:4,med_name:"Preston",for_name:"Bradley",qte:75,price:45},
    {id_med:5,id_for:5,med_name:"Silvio",for_name:"Cirstoforo",qte:29,price:49},
    {id_med:6,id_for:6,med_name:"Llewellyn",for_name:"Matthieu",qte:9,price:77},
    {id_med:7,id_for:7,med_name:"Jamey",for_name:"Brendin",qte:77,price:83},
    {id_med:8,id_for:8,med_name:"Hunter",for_name:"Aylmar",qte:87,price:89},
    {id_med:9,id_for:9,med_name:"Gar",for_name:"Alyosha",qte:68,price:59},
    {id_med:10,id_for:10,med_name:"Otho",for_name:"Alfons",qte:86,price:48},
    {id_med:11,id_for:11,med_name:"Gaven",for_name:"Monty",qte:43,price:23},
    {id_med:12,id_for:12,med_name:"Thayne",for_name:"Ruby",qte:58,price:9},
    {id_med:13,id_for:13,med_name:"Jayson",for_name:"Rockey",qte:90,price:5},
    {id_med:14,id_for:14,med_name:"Barnebas",for_name:"Mano",qte:13,price:41},
    {id_med:15,id_for:15,med_name:"Nilson",for_name:"Far",qte:79,price:4},
    {id_med:16,id_for:16,med_name:"Alley",for_name:"Hilton",qte:24,price:28},
    {id_med:17,id_for:17,med_name:"Hallsy",for_name:"Westley",qte:9,price:48},
    {id_med:18,id_for:18,med_name:"Meade",for_name:"Brennen",qte:94,price:35},
    {id_med:19,id_for:19,med_name:"Antoine",for_name:"Brooks",qte:97,price:30},
    {id_med:20,id_for:20,med_name:"Arthur",for_name:"Flynn",qte:85,price:33},
    {id_med:21,id_for:21,med_name:"Hilary",for_name:"Erik",qte:93,price:36},
    {id_med:22,id_for:22,med_name:"Boonie",for_name:"Glyn",qte:86,price:79},
    {id_med:23,id_for:23,med_name:"Reagen",for_name:"Alfons",qte:8,price:89},
    {id_med:24,id_for:24,med_name:"Winnie",for_name:"Marten",qte:32,price:21},
    {id_med:25,id_for:25,med_name:"Ulises",for_name:"Hazel",qte:81,price:95},
    {id_med:26,id_for:26,med_name:"Upton",for_name:"Boonie",qte:41,price:15},
    {id_med:27,id_for:27,med_name:"Flint",for_name:"Norris",qte:39,price:37},
    {id_med:28,id_for:28,med_name:"Ruprecht",for_name:"Glyn",qte:10,price:45},
    {id_med:29,id_for:29,med_name:"Marvin",for_name:"Larry",qte:56,price:61},
    {id_med:30,id_for:30,med_name:"Shaun",for_name:"Freeland",qte:64,price:99}]
    
    searchwayAllWays()
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
    $(".add_command").click((e)=>{
        e.stopPropagation()
        $("#order_popup").fadeIn()
        var ele = e.target
        var med_name = ele.getAttribute("med_name")
        var med_qte =  ele.getAttribute("qte")
        var med_price = ele.getAttribute("price")
        var id_med =  ele.getAttribute("id_med")
        var id_for =  ele.getAttribute("id_for")

        SetValuesForOrderPopup(id_med,id_for,med_name,med_qte,med_price)
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
        setFilterPrice()
        setQteFilter()
    })
    function setFilterPrice(){
        const {valid,max,min} = PriceBetween ;
        console.log(valid)
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
        console.log(PriceFilter)
    }
    function setQteFilter(){
        const {valid,max,min} = QteBetween ;
        console.log(valid)
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
        console.log(QteFilter)
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
                        <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                    </div>
                </div>`
            }
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
                        <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                    </div>
                </div>`
            
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
                                <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
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
                                <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }
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
                            <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
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
                            <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }
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
                            <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
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
                            <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }
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
                            <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
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
                            <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                        </div>
                    </div>`
                }
            }
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
                            <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
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
                                <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
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
                                <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }
        }
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
                            <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
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
                                <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
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
                                <button class="add_command" id_for="${element.id_for}" id_med="${element.id_med}" qte="${element.qte}" price="${element.price}" med_name="${element.med_name}">ADD</button>
                            </div>
                        </div>`
                    }
                })
            }
        }
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
        e.stopPropagation()
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
    
});