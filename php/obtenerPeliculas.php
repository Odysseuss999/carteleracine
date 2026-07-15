<?php

include("conexion.php");

$sql = "SELECT * FROM peliculas";

$resultado = $conexion->query($sql);

$peliculas = [];

while($fila = $resultado->fetch_assoc()){

    $peliculas[] = $fila;

}

header("Content-Type: application/json");

echo json_encode($peliculas);