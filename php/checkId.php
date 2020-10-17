<?php
    $id = $_GET['id'];
    mysql_connect('localhost', 'root', 'root');
    mysql_select_db('gz2006');
    $sql = "SELECT * FROM goods WHERE goodsId = '$id' ";
    $result = mysql_query($sql);
    $data =  mysql_fetch_array($result);

    echo json_encode(array("error" => 0, "data" => $data));

?>