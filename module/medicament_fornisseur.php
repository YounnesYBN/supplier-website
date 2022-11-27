<?php

class Medicament_fornisseur
{
    private string $med_id;
    private string $for_id;
    private string $qte;
    private string $price;

    public function __construct(string $med_id = "", string $for_id = "", string $qte = "", string $price = "")
    {
        $this->med_id = $med_id;
        $this->for_id = $for_id;
        $this->qte = $qte;
        $this->price = $price;
    }

    public function connect_bd()
    {
        try {
            $username = "root";
            $passwordc = '';
            $dsn = 'mysql:host=localhost;dbname=projet_db;port=3306;charset=utf8';
            $db = new PDO($dsn, $username, $passwordc);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $db;
        } catch (PDOException $e) {
            return false;
        }
    }
    public function add_med_for($database)
    {
        try {

            $req = $database->prepare("INSERT into medi_forni(id_med,id_for,qte,prix) values(?,?,?,?)");
            $req->execute([$this->med_id, $this->for_id, $this->qte, $this->price]);
            return true;
        } catch (Exception $e) {
            return $e;
        }
    }
    public function check_med_for_existe($database,$nomMed)
    {
        $req = $database->prepare("call check_med_for_existe(?,?)");
        $req->execute([$nomMed, $this->for_id]);
        $result = $req->fetch();
        return $result["exist"];
    }
    public function get_all_med_for($database)
    {
        $allresultArray = array();
        $req = $database->prepare('
        SELECT medicament.id_med as "id_med",medicament.nom as "nom_med",qte as "qte",prix as "price" from medi_forni 
        inner join medicament ON
        medi_forni.id_med = medicament.id_med
        WHERE medi_forni.id_for = ?');
        $req->execute([$this->for_id]);
        while ($result = $req->fetch()) {
            $allresultArray[] = ["id_med" => $result["id_med"], "med_nom" => $result["nom_med"], "qte" => $result["qte"], "price" => $result["price"]];
        }
        return $allresultArray;
    }
    public function checkIfOtherMedHaveSameName($database,$compareName){
        $req = $database->prepare("call checkIfOtherMedHaveSameName(?,?,?)");
        $req->execute([$compareName,$this->for_id,$this->med_id]);
        $result = $req->fetch();
        return $result["exist"];
    }
    public function convert_array_to_optionDelete($arrays)
    {
        $allOption = "";
        foreach ($arrays as $array) {
            $allOption .= "<option value='" . $array["id_med"] . "'>" . $array["med_nom"] . " " . $array["qte"] . " " . $array["price"] . "</option>";
        }
        return $allOption;
    }
    public function convert_array_to_optionEdite($arrays)
    {
        $allOption = "";
        foreach ($arrays as $array) {
            $allOption .= "<option value='" . $array["id_med"] . "' idMed='" . $array["id_med"] . "' nomMed='" . $array["med_nom"] . "' qte='" . $array["qte"] . "' price='" . $array["price"] . "'>" . $array["med_nom"] . " " . $array["qte"] . " " . $array["price"] . "</option>";
        }
        return $allOption;
    }
    public function update_Med_for($database,$newName,$newQte,$newPrix)
    {
        try{
            $req = $database->prepare("
                update medi_forni 
                inner join medicament ON
                medi_forni.id_med = medicament.id_med
                set 
                medicament.nom = ?,
                qte = ? ,
                prix = ? 
                WHERE medicament.id_med = ?
                and 
                medi_forni.id_for = ?
            ");
            $req->execute([$newName,$newQte,$newPrix,$this->med_id,$this->for_id]);
            return true;
        }catch(Exception $m){
            return false;
        }
    }

    public function convert_array_to_medComponent($arrays)
    {
        $allComponent = "";
        foreach ($arrays as $array) {
            $allComponent .= '
            <div id="med">
                <div id="medName">
                    <img src="./medisent.png" alt="" srcset="" width="30px">
                    <h3>' . $array["med_nom"] . '</h3>
                </div>
                <div id="medstoke">
                    <img src="./store.png" alt="" srcset="" width="30px">
                    <h3>' . $array["qte"] . '</h3>
                </div>
                <div id="medprice">
                    <img src="./price.png" alt="" srcset="" width="30px">
                    <h3>' . $array["price"] . '</h3>
                </div>
            </div>

            ';
        }
        return $allComponent;
    }
    
}

?>