<?php
$to      = 'ddale.lf@gmail.com';
$subject = 'Сообщение с сайта Грани';

$nameUser = $_POST['name'];
$contactsUser = $_POST['email'];
$messageUser = $_POST['message-text'];

$message = "Имя: " . $nameUser . "\r\nКонтакты: " . $contactsUser . "\r\nСообщение: " . $messageUser;

$headers = 'Content-type: text/plain; charset=\"utf-8\" . From: Грани' . "\r\n" .
    'Reply-To: Грани' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();   

mail($to, $subject, $message, $headers);
?>