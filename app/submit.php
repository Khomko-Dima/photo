<?php 

  if (!empty($_POST['phone']) || !empty($_POST['email'])){


    $mailto = 'ph.pravdik@gmail.com';
    $name = htmlspecialchars(trim($_POST['name']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    $valToSend = htmlspecialchars(trim($_POST['valToSend']));
    $form = $_POST['metrika'];

    $eol = "\n";
    $subject = '=?utf-8?B?'. base64_encode('Письмо от клиента с сайта photo') .'?=';
    $headers= "MIME-Version: 1.0\r";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers  .= 'From: photo'.$eol;

    $msg.=  "Из формы: $valToSend \r\n\n";

    if($name) {
      $msg.=  "Имя: $name \r\n\n";
    }

    if($phone){
       $msg.=  "Телефон: $phone \r\n\n";
    }
    if($email){
       $msg.=  "Email: $email \r\n\n";
    }
    if($message){
       $msg.=  "Сообщение: $message \r\n\n";
    }

    if (mail($mailto, $subject, $msg, $headers)){
      echo "1";
    } else {
      echo "3";
    }

  } else {
      echo "2";
  }

?>