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
    public function get_all_command_encour($database){
        try{
            $arrayencor=array();
        $quiry1=$database->exec('SELECT id_for as "id_for",fornesseur.username as "fornesseur",id_par as "id_par",pharmaci.intitul as "pharmaci",id_med as "id_med",medicament.nom as "medecament", qte as"qte",totale as "totale",command_status as "status"
        from commande c,fornesseur f,mdicament m,pharmaci p
        where c.id_for=f.id_for AND c.id_med=m.id_med AND c.id_par=p.id_par AND
        command_status="en_coure"');
        while($result=$quiry1->fetch()){
            $arrayencor[]=["id_for" => $result["id_for"],"fornisseur"=>$result["fornesseur"],
            "id_par" =>$result["id_par"],"pharmaci"=> $result["pharmaci"],
            "id_med"=>$result["id_med"],"medecament"=>$result["medicament"],
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
        $quiry2=$database->exec('SELECT id_for as "id_for",fornesseur.username as "fornesseur",id_par as "id_par",pharmaci.intitul as "pharmaci",id_med as "id_med",medicament.nom as "medecament", qte as"qte",totale as "totale",command_status as "status"
        from commande c,fornesseur f,mdicament m,pharmaci p
        where c.id_for=f.id_for AND c.id_med=m.id_med AND c.id_par=p.id_par AND
        command_status="refusee"');
        while($result=$quiry2->fetch()){
            $arrayrefuse[]=["id_for" => $result["id_for"],"fornisseur"=>$result["fornesseur"],
            "id_par" =>$result["id_par"],"pharmaci"=> $result["pharmaci"],
            "id_med"=>$result["id_med"],"medecament"=>$result["medicament"],
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
        $quiry3=$database->exec('SELECT id_for as "id_for",fornesseur.username as "fornesseur",id_par as "id_par",pharmaci.intitul as "pharmaci",id_med as "id_med",medicament.nom as "medecament", qte as"qte",totale as "totale",command_status as "status"
        from commande c,fornesseur f,mdicament m,pharmaci p
        where c.id_for=f.id_for AND c.id_med=m.id_med AND c.id_par=p.id_par AND
        command_status="annule"');
        while($result=$quiry3->fetch()){
            $arrayrannule[]=["id_for" => $result["id_for"],"fornisseur"=>$result["fornesseur"],
            "id_par" =>$result["id_par"],"pharmaci"=> $result["pharmaci"],
            "id_med"=>$result["id_med"],"medecament"=>$result["medicament"],
            "qte"=>$result["qte"],
            "totale"=>$result["totale"],
            "status"=>$result["status"]];
        }

        return $arrayrannule;
        }catch(Exception $e){
            return $e ;
        }
        
    }
    

}

$com = new Commands();
$db = $com->connect_db();
echo ($com->get_all_command_annule($db))


?>