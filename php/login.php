<?php
    header("content-type: text/html;charset=utf-8");
    $username = $_POST["username"];
    $password = $_POST["password"];
    mysql_connect('localhost', 'root', 'root');
    mysql_select_db('gz2006');
    $sql = "SELECT * FROM user WHERE username='$username' and password='$password'";
    $result = mysql_query($sql);
    $row = mysql_fetch_array($result);
    if ($row) {
        echo json_encode(array("error" => 0, "data" => "登录成功"));
    } else {
        echo json_encode(array("error" => 1, "data" => "用户名或密码错误"));
    }

?>