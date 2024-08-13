<?php

class Producto extends Conectar{

    public function get_producto(){
        $conectar= parent::Conexion();
        parent::set_names();
        $sql="SELECT * FROM tm_producto where est=1";
        $sql=$conectar->prepare($sql);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }

    public function get_producto_x_id($prod_id){
        $conectar= parent::Conexion();
        parent::set_names();
        $sql="SELECT * FROM tm_producto where prod_id=?";
        $sql=$conectar->prepare($sql);
        $sql->bindValue(1,$prod_id);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }

    public function delete_producto_x_id($prod_id){
        $conectar= parent::Conexion();
        parent::set_names();
        $sql="UPDATE tm_producto
        SET
            est=0,
            fech_elim=now()
        where prod_id=?";
        $sql=$conectar->prepare($sql);
        $sql->bindValue(1,$prod_id);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }

    public function insert_producto($prod_nom){
        $conectar= parent::Conexion();
        parent::set_names();
        $sql="INSERT INTO tm_producto
        (prod_nom, fech_crea,est) 
        VALUES (?,now(),1)";
        $sql=$conectar->prepare($sql);
        $sql->bindValue(1,$prod_nom);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }

    public function update_producto($prod_id,$prod_nom){
        $conectar= parent::Conexion();
        parent::set_names();
        $sql="UPDATE tm_producto
        SET
            prod_nom = ?,
            fech_modi=now()
        where prod_id=?";
        $sql=$conectar->prepare($sql);
        $sql->bindValue(1,$prod_nom);
        $sql->bindValue(2,$prod_id);
        $sql->execute();
        return $resultado=$sql->fetchAll();
    }

}

?>