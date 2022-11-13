<?php
require "./../module/fornisseur.php";

if(isset($_POST["singup"])){
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $adress = $_POST["adress"];
    $tel = $_POST["tel"];
    $fornisseur = new Fornisseur($username,$email,$password,$adress,$tel);
    $database = $fornisseur->conect_db();
    if($database!=false){
        $checkEmail = $fornisseur->verf_email($database);
        if($checkEmail==false){
            $addForniseur = $fornisseur->add_fornisseur($database);
            if($addForniseur==true){
                echo "singup successfully";
            }else{
                echo "singup faild somthing went wrong";
            }
        }else{
            echo "this email is already exist";
        }

    }else{
        echo "error in database" ;
    }
}



?>