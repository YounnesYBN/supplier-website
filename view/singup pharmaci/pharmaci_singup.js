$(document).ready(() => {
  //for the popup
  $("#popup_child").click(function (e) {
    e.stopPropagation();
  });

  $(document).click(function (e) {
    $("#popup").fadeOut(500);
  });
  function ActivePopUp(message) {
    console.log(document.getElementById("message_pop"));
    document.getElementById("message_pop").innerHTML = message;
    $("#popup").fadeIn(500);
  }
  //for the popup

  var userNameValid = true;
  var emailValid = true;
  var telValid = true;
  var adressValid = true;
  var passwordValid = true;
  var checkPasswordValid = true;
  var errorList = {
    username: "",
    email: "",
    tel: "",
    adress: "",
    password: "",
    passwordConfirm: "",
  };

  function convertErrorList() {
    var messages = Object.values(errorList).filter((message) => {
      if (message.length > 0) {
        return message;
      }
    });
    return messages.join("<br>");
  }

  //user name
  function onUserNameChange() {
    const userNameEle = document.getElementById("userName");
    const userNameval = userNameEle.value;
    const userNameRgx = /^[a-zA-Z]{1,}$/;
    const testUserName = userNameRgx.test(userNameval);
    if (testUserName == true) {
      userNameEle.style.borderColor = "#9b59b6";
      userNameValid = true;
      errorList.username = "";
    } else {
      userNameEle.style.borderColor = "red";
      userNameValid = false;
      errorList.username = "-user name is invalid";
    }
  }

  $("#userName").keyup(function (e) {
    onUserNameChange();
    console.log(userNameValid);
  });
  //user name
  //email
  function onEmailChange() {
    const emailEle = document.getElementById("email");
    const emailVal = emailEle.value;
    const Emlrgx = /^[a-zA-Z]{1,}@[a-zA-Z]{1,}\.[a-zA-Z]{1,}$/;
    const test = Emlrgx.test(emailVal);
    if (test == true) {
      emailEle.style.borderColor = "#9b59b6";
      emailValid = true;
      errorList.email = "";
    } else {
      emailEle.style.borderColor = "red";
      emailValid = false;
      errorList.email = "-email is invalid example: ' username@gmail.com ' ";
    }
  }
  $("#email").keyup(function (e) {
    onEmailChange();
    console.log(emailValid);
  });
  //email
  //adress
  function onAdressChange() {
    const adressEle = document.getElementById("adress");
    const adressVal = adressEle.value;
    if (adressVal.length > 0) {
      adressEle.style.borderColor = "#9b59b6";
      adressValid = true;
      errorList.adress = "";
    } else {
      adressEle.style.borderColor = "red";
      adressValid = false;
      errorList.adress = "-adress is invalid";
    }
  }
  $("#adress").keyup(function (e) {
    onAdressChange();
    console.log(adressValid);
  });
  //adress
  //tel
  function onTelChange() {
    const telEle = document.getElementById("tel");
    console.log(telEle);
    const telVal = telEle.value;
    const telrgx = /^[0-9]{10,10}$/;
    const twoFirstNumbers = telVal[0] + telVal[1];
    const telTest = telrgx.test(telVal);
    console.log(telTest);
    if (
      telTest == true &&
      (twoFirstNumbers == "05" ||
        twoFirstNumbers == "06" ||
        twoFirstNumbers == "07")
    ) {
      telEle.style.borderColor = "#9b59b6";
      telValid = true;
      errorList.tel = "";
    } else {
      telEle.style.borderColor = "red";
      telValid = false;
      errorList.tel = "-tel is invalid example:(06|05|07) 8 numbers";
    }
  }
  $("#tel").keyup(function (e) {
    onTelChange();
  });
  //tel

  //passwored
  function onPasswordChange() {
    const passwordEle = document.getElementById("password");
    const passwordVal = passwordEle.value;
    if (passwordVal.length >= 10) {
      passwordEle.style.borderColor = "#9b59b6";
      passwordValid = true;
      errorList.password = "";
    } else {
      passwordEle.style.borderColor = "red";
      passwordValid = false;
      errorList.password = "-password shold be at least 10 caracters";
    }
  }
  $("#password").keyup(function (e) {
    onPasswordChange();
  });
  //password
  //password_confirm
  function onPasswordConfirmChange() {
    const passwordConEle = document.getElementById("con_password");
    const passwordConVal = passwordConEle.value;
    const passwordValToCompare = document.getElementById("password").value;
    if (passwordConVal == passwordValToCompare && passwordValid == true) {
      passwordConEle.style.borderColor = "#9b59b6";
      checkPasswordValid = true;
      errorList.passwordConfirm = "";
    } else {
      onPasswordChange();
      passwordConEle.style.borderColor = "red";
      checkPasswordValid = false;
      errorList.passwordConfirm = "-password confirm is invalid";
    }
  }

  $("#con_password").keyup(function (e) {
    onPasswordConfirmChange();
  });
  //password confirm

  $("#submitBtn").click(function (e) {
    onUserNameChange();
    onEmailChange();
    onAdressChange();
    onTelChange();
    onPasswordChange();
    onPasswordConfirmChange();
  });

  $("#FornisseurSingupForm").submit(function (e) {
    if (
      userNameValid == true &&
      emailValid == true &&
      adressValid == true &&
      telValid == true &&
      passwordValid == true &&
      checkPasswordValid == true
    ) {
      //send data with ajax
      var userName=document.getElementById('userName').value;
      var email=document.getElementById('email').value;
      var adress=document.getElementById('adress').value;
      var tel=document.getElementById('tel').value;
      var password=document.getElementById('password').value;
      $.ajax({
        type : "post",
        url : "http://localhost/my-projects/school%20project/control/pharmacie_singup_control.php",
        data :{singup :"true",userName:userName,email:email,adress:adress,tel:tel,password:password},
        dataType :"JSON",
        success : function(response){
          if(response.error==true){
            ActivePopUp(response.message)
        }else{
          location.href = "http://localhost/my-projects/school%20project/view/pharmaci%20pages/pharmaci%20page/pharmaci_home.html"
        }
      }
      })

    } else {
      e.preventDefault();
      var message = convertErrorList();
      ActivePopUp(message);
    }
  });
});
