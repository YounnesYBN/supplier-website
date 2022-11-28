<?php 
include "./../module/medicament_fornisseur.php";
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
    $forId = $_SESSION["id"];
    $for = new Medicament_fornisseur("",$forId);
    $database = $for->connect_bd();
    $MedForArray = $for->get_all_med_for($database);
    $username = $_SESSION["username"] ;
    $email = $_SESSION["email"] ;
    $deletOption = $for->convert_array_to_optionDelete($MedForArray);
    $editeOption = $for->convert_array_to_optionEdite($MedForArray);
    $medCom = $for->convert_array_to_medComponent($MedForArray);

    echo json_encode(["username"=>$username,"email"=>$email,"deleteOption"=>$deletOption,"editeOption"=>$editeOption,"medCom"=>$medCom]);
}
include "./../module/medicaments.php";
if(isset($_POST['delete'])){
    $id=$_POST['medIdDelete'];
    $mede1= new Medicament("");
    $db=$mede1->connect_db();
    if($db!=false){
        $delete=$mede1->delete_medic($db,$id);
        if($delete="true"){
            echo json_encode(["error"=>false,"message"=>"delete ok"]);
        }else{
            echo json_encode(["error"=>true,"message"=>"delete faild"]);
        }
        
    }else{
        echo json_encode(["error"=>true,"message"=>"error in database"]);
    }
    

}


?>