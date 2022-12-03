<?php 
include "./../module/medicaments.php";
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

if(isset($_POST["edite"])){
    $id_for = $_SESSION["id"];
    $id_med = $_POST["idmed"];
    $newNomMed = $_POST["newNomMed"];
    $newQteMed = $_POST["newQteMed"];
    $newPriceMed = $_POST["newPriceMed"];
    $med_for = new Medicament_fornisseur($id_med,$id_for);
    $database = $med_for->connect_bd();
    if($database!=false){
        $checkNewName = $med_for->checkIfOtherMedHaveSameName($database,$newNomMed);
        if($checkNewName==true){
            echo json_encode(["error"=>true,"message"=>"this name is already exist"]);

        }else{
            $updateData = $med_for->update_Med_for($database,$newNomMed,$newQteMed,$newPriceMed);
            if($updateData == true){
                echo json_encode(["error"=>false,"message"=>"the update was success"]);
            }else{
                echo json_encode(["error"=>true,"message"=>"somthing went wrong the update faild"]);
            }
        }
    }else{ 
        echo json_encode(["error"=>true,"message"=>"error in database"]);
    }
}

if(isset($_POST["addMed"])){
    $id_for = $_SESSION["id"];
    $Medname = $_POST['name'];
    $Mednumber = $_POST['number'];
    $Medprice = $_POST['price'];
    $medObj = new Medicament($Medname);
    $db = $medObj->connect_db();
    if($db != false){
        $med_for_obj1 = new Medicament_fornisseur("",$id_for);
        $checkIsExist = $med_for_obj1->check_med_for_existe($db,$Medname);
        if($checkIsExist==true){
            echo json_encode(["error"=>true,"message"=>"you already have this medicent"]);
        }else{
            $addMed = $medObj->add_midec($db);
            if($addMed==true){
                $newMedId = strval($medObj->get_id_medic($db));
                $med_for_obj2 = new Medicament_fornisseur($newMedId,$id_for,$Mednumber,$Medprice);
                $add_med_for = $med_for_obj2->add_med_for($db);
                if($add_med_for ==true){
                    echo json_encode(["error"=>false,"message"=>"medicent: ".$Medname." added successfully" ]);
                }else{
                    echo json_encode(["error"=>true,"message"=>"somthing went wrong"]);
                }
            }else{
                echo json_encode(["error"=>true,"message"=>"somthing went wrong"]);
            }
        }
    }else{
        echo json_encode(["error"=>true,"message"=>"error in database"]); 
    }
}


?>