<?php
class Commands{
    public int $id_for;
    public int $id_med;
    public int $id_par;
    public int $qte;
    public float $totale;
    public string $status;

    public function __construct(int $id_for,int $id_med, int $id_par,int $qte,float $totale,string $status){
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
        $quiry1=$database->exec('SELECT f.id_for as "id_for",f.username as "fornesseur",p.id_par as "id_par",p.intitul as "pharmaci",m.id_med as "id_med",m.nom as "medecament", qte as"qte",totale as "totale",command_status as "status" 
        from commande c,fornesseur f,medicament m,pharmaci p 
        where c.id_for=f.id_for AND
         c.id_med=m.id_med AND
          c.id_par=p.id_par AND 
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
        $quiry2=$database->exec('SELECT f.id_for as "id_for",f.username as "fornesseur",p.id_par as "id_par",p.intitul as "pharmaci",m.id_med as "id_med",m.nom as "medecament", qte as"qte",totale as "totale",command_status as "status" 
        from commande c,fornesseur f,medicament m,pharmaci p 
        where c.id_for=f.id_for AND
         c.id_med=m.id_med AND
          c.id_par=p.id_par AND 
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
        $quiry3=$database->exec('SELECT f.id_for as "id_for",f.username as "fornesseur",p.id_par as "id_par",p.intitul as "pharmaci",m.id_med as "id_med",m.nom as "medecament", qte as"qte",totale as "totale",command_status as "status" 
        from commande c,fornesseur f,medicament m,pharmaci p 
        where c.id_for=f.id_for AND
         c.id_med=m.id_med AND
          c.id_par=p.id_par AND 
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
            return false ;
        }
        
    }
    public function update_status($id_com,$status,$database){
        $quiry4=$database->exec("UPDATE command set command_status= . '$status' . WHERE id_com= . '$id_com' .");
        if($quiry4->fetch()){
            return true;
        }else{
            return false ;
        }
    }
    

}





?>