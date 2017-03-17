<?php
	$to      = 'maxark@yandex.ru';
	$subject = 'Отзыв';

	$name = $_POST['name'];
	$company = $_POST['company'];
	$telephone = $_POST['telephone'];
	$messageorquestion = $_POST['messageorquestion'];

	$message .= '<table cellspacing="0" cellpadding="10">';
	$message .= "<tr><td><b>Имя: </b></td><td>" . $name . "</td></tr>";
	$message .= "<tr><td><b>Компания: </b></td><td>" . $company . "</td></tr>";
	$message .= "<tr><td><b>Телефон: </b></td><td>" . $telephone . "</td></tr>";
	$message .= "<tr><td><b>Текст отзыва: </b></td><td>" . $messageorquestion . "</td></tr>";
	$message .= "</table>";

	$headers = 'Content-type: text/html; charset=\"utf-8\" . From: 100resume' . "\r\n" .
	    'Reply-To: 100resume' . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	mail($to, $subject, $message, $headers);
?>