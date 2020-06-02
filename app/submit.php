<?php 

if (!empty($_POST['phone']) || !empty($_POST['email'])){


    $mailto = 'khomko.dima.jobs@gmail.com';
    $name = htmlspecialchars(trim($_POST['name']));
    $phone = htmlspecialchars(trim($_POST['phone']));

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

  if (mail($mailto, $subject, $msg, $headers)){


   echo "1";

  } else {
    echo "3";
  }

} else {
  echo "2";
}

?>