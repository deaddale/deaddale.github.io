<?php
	$to      = 'maxark@yandex.ru';
	$subject = 'Запрос звонка. Запрос информации';

	$name = $_POST['name'];
	$telephone = $_POST['telephone'];
	$email = $_POST['email'];
	$messageorquestion = $_POST['messageorquestion'];

	$message .= '<table cellspacing="0" cellpadding="10">';
	$message .= "<tr><td><b>Имя: </b></td><td>" . $name . "</td></tr>";
	$message .= "<tr><td><b>Телефон: </b></td><td>" . $telephone . "</td></tr>";
	$message .= "<tr><td><b>Email: </b></td><td>" . $email . "</td></tr>";
	$message .= "<tr><td><b>Сообщение: </b></td><td>" . $messageorquestion . "</td></tr>";
	$message .= "</table>";

	$headers = 'Content-type: text/html; charset=\"utf-8\" . From: 100resume' . "\r\n" .
	    'Reply-To: 100resume' . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
?>