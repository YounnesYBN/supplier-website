<?php
include "../module/pharmaci.php";
if(isset($_POST['singup'])){
    $username=$_POST['userName'];
    $email=$_POST['email'];
    $adress=$_POST['adress'];
    $tel=$_POST['tel'];
    $password=$_POST['password'];
    $pharmacie= new Pharmacie($username,$email,$password,$adress,$tel);
    $database=$pharmacie->conect_db();
    if($database!=false){
        $verf_email=$pharmacie->verf_email($database);
        if($verf_email==false){
            $add_pharmacie=$pharmacie->add_pharmaci($database);
            if($add_pharmacie==true ){
                echo "sing up  successes";
            }else{
                echo "sing up filed";
            }
        }else{
            echo "this email is exist ";
        }

    }else{
        echo "error in database";
    }

}

?>