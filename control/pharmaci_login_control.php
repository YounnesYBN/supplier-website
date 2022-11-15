<?php 
include "./../module/pharmaci.php";
if(isset($_POST["login"])){
    $email = $_POST["email"];
    $password = $_POST["password"];
    $pharmaci = new Pharmacie("",$email,$password,"","");
    $database = $pharmaci->conect_db();
    if($database!=false){
        $get_phar = $pharmaci->get_pharmaci($database);
        if($get_phar==true){
            echo "login succsess";
        }else{
            echo "login faild" ;
        }
    }else{
        echo "error in database";
    }

}

?>