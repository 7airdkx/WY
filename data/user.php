<?php
$user = $_GET['user'];
$pass = $_GET['pass'];
$tt = $_GET['tt'];

// 连接数据库
$link = mysqli_connect('localhost','root','123456','db2010');
if (!$link) {
  die('{"err":-1,"msg":"连接失败"}');
}

// 控制判断
if (!$user || !$pass || !$tt) {
  die('{"err":-2,"msg":"参数错误"}');
} else {

  // 登录
  if ($tt === 'login') {
    // 查询sql语句
    $login_sql = "select * from account where username='$user' and password='$pass'";
    // 执行sql语句
    $login_res = mysqli_query($link,$login_sql);//是一个资源类型
    //把资源类型解析成数组
    $login_arr = mysqli_fetch_all($login_res,1);
    if (count($login_arr) > 0) {
      echo '{"err":0,"msg":"登录成功"}';
    } else {
      echo '{"err":-3,"msg":"账号或密码错误"}';
    }
  }
  // 注册
  if ($tt === 'add') {
    // 先查询注册的账号是否已存在
    $query_sql = "select * from account where username='$user'";
    $query_res = mysqli_query($link,$query_sql);
    $query_arr = mysqli_fetch_all($query_res,1);
    if (count($query_arr) > 0) {
      echo '{"err":-4,"msg":"账号已被占用"}';
    } else {
      // 可以注册，插入数据
      $insert_sql = "insert into account(username,password) values('$user','$pass')";
      mysqli_query($link,$insert_sql);
      $num = mysqli_affected_rows($link);
      if ($num > 0){
        echo '{"err":1,"msg":"注册成功"}';
      } else {
        echo '{"err":-5,"msg":"注册失败"}';
      }
    }
  }

}
// 关闭连接
mysqli_close($link);
?>