<?php 
include "./../module/medicament_fornisseur.php";
include "./../module/commands.php";
session_start();
if(isset($_GET["checkAccess"])){

    if(isset($_SESSION["accessPass"])){
        if($_SESSION["accessPass"]){
            echo json_encode(["allow"=>true]);
        }else{
            echo json_encode(["allow"=>false]);
        }
    }else{
        echo json_encode(["allow"=>false]);
    }
}
if(isset($_POST["logout"])){
    $_SESSION["accessPass"] = false;
    $_SESSION["id"] ="";
    $_SESSION["email"] ="";
    $_SESSION["username"] ="";
}
if(isset($_GET["get_info"])){
    $phaId = $_SESSION["id"];
    $username = $_SESSION["username"] ;
    $email = $_SESSION["email"] ;
    echo json_encode(["username"=>$username,"email"=>$email]);
    
}
if(isset($_GET["get_pharmaci_ord"])){
    $id_pharmaci = $_SESSION["id"];
    $pharmaciOrd = new Commands("","",$id_pharmaci);
    $db1 = $pharmaciOrd->connect_db();
    if($db1!=false){
        $ArrayOrders1 = $pharmaciOrd->get_all_command_encour_accepter($db1);
        $convert_ArrayOrders1 = $pharmaciOrd->convertDataToEncourAccepter($ArrayOrders1);
        echo json_encode(["encour_accepter_orders"=>$convert_ArrayOrders1]);
    }
}
if(isset($_GET["get_all_ord"])){
    $med_for = new Medicament_fornisseur();
    $db2 = $med_for->connect_bd();
    if($db2!=false){
        $ArrayAvalibalCommade = $med_for->get_all_med($db2);
        echo json_encode(["avalibal_com"=>$ArrayAvalibalCommade]);
    }
}
