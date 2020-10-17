<?php
    header("content-type: text/html;charset=utf-8");
    mysql_connect('localhost', 'root', 'root');
    mysql_select_db('gz2006');
    $sql = "SELECT * FROM shoes";
    $result = mysql_query($sql);
    $arr = array();
    while($row = mysql_fetch_array($result)) {
        array_push($arr, $row);
    }
    echo json_encode(array("error" => 0, "data" => $arr));
?>