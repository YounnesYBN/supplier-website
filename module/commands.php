<?php
class Commands{
    public string $id_for;
    public string $id_med;
    public string $id_par;
    public string $qte;
    public string $totale;
    public string $status;

    public function __construct(string $id_for="",string $id_med="", string $id_par="",string $qte="",string $totale="",string $status=""){
        $this->id_for=$id_for;
        $this->id_med=$id_med;
        $this->id_par=$id_par;
        $this->qte=$qte;
        $this->totale=$totale;
        $this->status=$status;
    }


    public function connect_db(){
        
            try{
                $username="root";
                $passwordc='';
                $dsn='mysql:host=localhost;dbname=projet_db;port=3306;charset=utf8';
                $db= new PDO($dsn,$username,$passwordc);
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $db;
    
            } catch (PDOException $e){
                return false ;
            }
        }
        public function add_command($database){
            try{
                $requit=$database->prepare("INSERT into commande(id_for,id_par,id_med,qte,totale,command_status) VALUES(?,?,?,?,?,?)");
                $requit->execute(array(
                    $this->id_for,
                    $this->id_par,
                    $this->id_med,
                    $this->qte,
                    $this->totale,
                    $this->status
                ));
                return true ;
            }catch(Exception $e){
                return false;
            }
           
        }
    public function get_all_command_encour_accepter($database){
        try{
            $arrayencor=array();
        $quiry1=$database->prepare('SELECT c.id_com as "id_com",f.id_for as "id_for",f.username as "fornesseur",p.id_par as "id_par",p.intitul as "pharmaci",m.id_med as "id_med",m.nom as "medecament", qte as"qte",totale as "totale",command_status as "status" 
        from commande c,fornesseur f,medicament m,pharmaci p 
        where c.id_for=f.id_for AND
         c.id_med=m.id_med AND
          c.id_par=p.id_par AND 
          (command_status="en_coure" or command_status="accepter") and p.id_par=?');
          $quiry1->execute(array($this->id_par));
        while($result=$quiry1->fetch()){
            $arrayencor[]=["id_com"=>$result["id_com"],"id_for" => $result["id_for"],"fornisseur"=>$result["fornesseur"],
            "id_par" =>$result["id_par"],"pharmaci"=> $result["pharmaci"],
            "id_med"=>$result["id_med"],"medecament"=>$result["medecament"],
            "qte"=>$result["qte"],
            "totale"=>$result["totale"],
            "status"=>$result["status"]];
        }

        return $arrayencor;
        }catch(Exception $e){
            return false;
        }
        

    }
    public function get_all_command_refusee($database){
         try{
            $arrayrefuse=array();
        $quiry2=$database->prepare('SELECT c.id_com as "id_com", f.id_for as "id_for",f.username as "fornesseur",p.id_par as "id_par",p.intitul as "pharmaci",m.id_med as "id_med",m.nom as "medecament", qte as"qte",totale as "totale",command_status as "status" 
        from commande c,fornesseur f,medicament m,pharmaci p 
        where c.id_for=f.id_for AND
         c.id_med=m.id_med AND
          c.id_par=p.id_par AND 
          command_status="refusee" and p.id_par=?');
          $quiry2->execute(array($this->id_par));
        while($result=$quiry2->fetch()){
            $arrayrefuse[]=["id_com"=>$result["id_com"],"id_for" => $result["id_for"],"fornisseur"=>$result["fornesseur"],
            "id_par" =>$result["id_par"],"pharmaci"=> $result["pharmaci"],
            "id_med"=>$result["id_med"],"medecament"=>$result["medecament"],
            "qte"=>$result["qte"],
            "totale"=>$result["totale"],
            "status"=>$result["status"]];
        }

        return $arrayrefuse;
         }catch(Exception $e){
            return false;
         }
        
    }
    public function get_all_command_annule($database){
        try{
        $arrayrannule=array();
        $quiry3=$database->prepare('SELECT c.id_com as "id_com", f.id_for as "id_for",f.username as "fornesseur",p.id_par as "id_par",p.intitul as "pharmaci",m.id_med as "id_med",m.nom as "medecament", qte as"qte",totale as "totale",command_status as "status" 
        from commande c,fornesseur f,medicament m,pharmaci p 
        where c.id_for=f.id_for AND
         c.id_med=m.id_med AND
          c.id_par=p.id_par AND 
          command_status="annule" and p.id_par=?');
          $quiry3->execute(array($this->id_par));
        while($result=$quiry3->fetch()){
            $arrayrannule[]=["id_com"=>$result["id_com"],"id_for" => $result["id_for"],"fornisseur"=>$result["fornesseur"],
            "id_par" =>$result["id_par"],"pharmaci"=> $result["pharmaci"],
            "id_med"=>$result["id_med"],"medecament"=>$result["medecament"],
            "qte"=>$result["qte"],
            "totale"=>$result["totale"],
            "status"=>$result["status"]];
        }

        return $arrayrannule;
        }catch(Exception $e){
            return false ;
        }
        
    }
    public function convertDataToannul($array){
        $results="";
        foreach($array as $values){
            $results .='<div class="order_con">
            <div id="order_info">
                <div>
                    <h2 class="lable">Suplaire:</h2>
                    <h2 id="suplaireName">'.$values['fornisseur'].'</h2>
                </div>
                <div>
                    <h2 class="lable">Medicent:</h2>
                    <h2 id="medicentName">'.$values['medecament'].'</h2>
                </div>
                <div>
                    <h2 class="lable">QTE:</h2>
                    <h2 id="orderedQte">'.$values['qte'].'</h2>
                </div>
            </div>
            <div id="order_underline"></div>
            <div id="Delete_canceled_con">
                <div id="total_con">
                    <h1 id="totla">'.$values['totale'].'</h1>
                    <img src="./total.png" alt="" width="30px">
                </div>
                <button class="Delete_canceled_button" id_command="1">Delete</button>
            </div>
        </div>';
        }
        return $results;
    }
    public function convertDataToEncourRefusse($array){
        $results="";
        foreach($array as $values){
            $results .='<div class="order_con">
            <div id="order_info">
                <div>
                    <h2 class="lable">Suplaire:</h2>
                    <h2 id="suplaireName">'.$values['fornisseur'].'</h2>
                </div>
                <div>
                    <h2 class="lable">Medicent:</h2>
                    <h2 id="medicentName">'.$values['medecament'].'</h2>
                </div>
                <div>
                    <h2 class="lable">QTE:</h2>
                    <h2 id="orderedQte">'.$values['qte'].'</h2>
                </div>
            </div>
            <div id="order_underline"></div>
            <div id="Delete_ord_con">
                <div id="total_con">
                    <h1 id="totla">'.$values['totale'].'</h1>
                    <img src="./total.png" alt="" width="30px">
                </div>
                <button class="DeleteOrd_button" id_command="1">Delete</button>
            </div>
        </div>';

        }
        return $results;

    }
    public function convertDataToEncourAccepter($arrays){
        $result = "";
        foreach($arrays as $array){
            if($array["status"]=="accepter"){
                $result .=' 
                <div class="order_con">
                    <div id="order_info">
                        <div>
                            <h3 class="lable">Suplaire:</h3>
                            <h3 id="suplaireName">'.$array["fornisseur"].'</h3>
                        </div>
                        <div>
                            <h3 class="lable">Medicent:</h3>
                            <h3 id="medicentName">'.$array["medecament"].'</h3>
                        </div>
                        <div>
                            <h3 class="lable">QTE:</h3>
                            <h3 id="orderedQte">'.$array["qte"].'</h3>
                        </div>
                    </div>
                    <div id="order_underline"></div>
                    <div id="cancel_ord_con">
                        <div id="total_con">
                            <h1 id="totla">'.$array["totale"].'</h1>
                            <img src="./total.png" alt="" width="30px">
                        </div>
                        <div id="accepted_con">
                            <h3>Accepted</h3> <img src="./done.png" alt="" width="30px">
                        </div>
                    </div>
                </div>
                ';
            }else{
                $result .=' 
                <div class="order_con">
                    <div id="order_info">
                        <div>
                            <h3 class="lable">Suplaire:</h3>
                            <h3 id="suplaireName">'.$array["fornisseur"].'</h3>
                        </div>
                        <div>
                            <h3 class="lable">Medicent:</h3>
                            <h3 id="medicentName">'.$array["medecament"].'</h3>
                        </div>
                        <div>
                            <h3 class="lable">QTE:</h3>
                            <h3 id="orderedQte">'.$array["qte"].'</h3>
                        </div>
                    </div>
                    <div id="order_underline"></div>
                    <div id="cancel_ord_con">
                        <div id="total_con">
                            <h1 id="totla">'.$array["totale"].'</h1>
                            <img src="./total.png" alt="" width="30px">
                        </div>
                        <button class="cancelOrd_button" id_command="'.$array['id_com'].'">Cancel Order</button>
                    </div>
                </div>
                ';
            }
        }
        return $result ;
    }
    public function update_status($id_com,$status,$database){
        try{
            $quiry4=$database->prepare("UPDATE commande set command_status= ? WHERE id_com= ?");
            $quiry4->execute(array(
                $status,
                $id_com
            ));

            return true;
        }catch(Exception $e){
            return false ;
        }
    }
    

}



?>