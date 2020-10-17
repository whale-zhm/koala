<?php

    header("content-type: text/html;charset=utf-8");
    $username = $_POST['username'];
    $password = $_POST['password'];

    // 2 链接数据库
    mysql_connect('localhost', 'root', 'root');

    // 3 选择数据库
    mysql_select_db('gz2006');

    // 4 定义sql语句
    $sql = "INSERT INTO user VALUES('$username', '$password')";

    // 5 执行sql语句
    $result = mysql_query($sql);

    // 6 获取执行结果
    if ($result) {
        echo json_encode(array("error" => 0, "data" => "注册成功"));
    } else {
        echo json_encode(array("error" => 1, "data" => "注册失败"));
    }
?>