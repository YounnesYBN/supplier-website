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

    var emailValid = true;
    var passwordValid = true;

    //function to check email
    function onEmailChange(){
        const emailEle = document.getElementById("email")
        const emailVal = emailEle.value
        const Emlrgx = /^[a-zA-Z]{1,}@[a-zA-Z]{1,}\.[a-zA-Z]{1,}$/
        const test = Emlrgx.test(emailVal)
        if(test==true ){
            emailEle.style.borderColor = "#9b59b6";
            emailValid = true;
        }else{
            emailEle.style.borderColor = "red";
            emailValid = false;
        }
    }
    //function to check password
    function onPasswordChange(){
        const passWordEle = document.getElementById("password");
        const passWordVal = passWordEle.value;
        const passWordlen = passWordVal.length
        if(passWordlen>0){
            passWordEle.style.borderColor = "#9b59b6";
            passwordValid = true;

        }else{
            passWordEle.style.borderColor = "red";
            passwordValid = false;
        }
    }

    $("#email").keyup(function(e){
        onEmailChange()
    })

    $("#password").keyup(function (e) { 
        onPasswordChange()
    });

    $("#logInForm").submit(function(e){
        onEmailChange();
        onPasswordChange();
        if(emailValid==true & passwordValid==true){
            //here where we going to send data to backend which is controler
        }else{
            var message = emailValid==false&passwordValid==false?"-Email is unvalide Exemple: 'username@gmail.com' <br> -passwored is unvalide .":emailValid==false?"-Email is unvalide Exemple: 'username@gmail.com'":"-passwored is unvalide ." ;
            ActivePopUp(message)
            e.preventDefault() 
        }
    })

    $("#logInButton").click(function(){
        onEmailChange();
        onPasswordChange();
    })
    
    
})
     