<?php

$host = "localhost";
$usuario = "root";
$password = "";
$baseDatos = "cartelera";

$conexion = new mysqli($host, $usuario, $password, $baseDatos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");