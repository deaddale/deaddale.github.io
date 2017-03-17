<?php
	$filename = $_FILES['file']['tmp_name']; //Имя файла для прикрепления
	$newfilename = $_FILES['file']['name'];
	$to = "maxark@yandex.ru"; //Кому
	$from = "100resume"; //От кого
	$subject = "Заявка на 20 резюме по вакансии"; //Тема

	$name = $_POST['name'];
	$company = $_POST['company'];
	$post = $_POST['post'];
	$messageorquestion = $_POST['messageorquestion'];
	$telephone = $_POST['telephone'];
	$age_and_sex = $_POST['age_and_sex'];

	$message .= '<table cellspacing="0" cellpadding="10">';
	$message .= "<tr><td><b>Имя: </b></td><td>" . $name . "</td></tr>";
	$message .= "<tr><td><b>Компания: </b></td><td>" . $company . "</td></tr>";
	$message .= "<tr><td><b>Должность: </b></td><td>" . $post . "</td></tr>";
	$message .= "<tr><td><b>Ключевые навыки этой должности: </b></td><td>" . $messageorquestion . "</td></tr>";
	$message .= "<tr><td><b>Телефон: </b></td><td>" . $telephone . "</td></tr>";
	$message .= "<tr><td><b>Возраст и пол: </b></td><td>" . $age_and_sex . "</td></tr>";
	$message .= "</table>";

	$boundary = "---"; //Разделитель
	/* Заголовки */
	$headers = "From: $from\nReply-To: $from\n";
	$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"";
	$body = "--$boundary\n";
	/* Присоединяем текстовое сообщение */
	$body .= "Content-type: text/html; charset='utf-8'\n";
	$body .= "Content-Transfer-Encoding: quoted-printablenn";
	$body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
	$body .= $message."\n";
	$body .= "--$boundary\n";
	$file = fopen($filename, "r"); //Открываем файл
	$text = fread($file, filesize($filename)); //Считываем весь файл
	fclose($file); //Закрываем файл
	/* Добавляем тип содержимого, кодируем текст файла и добавляем в тело письма */
	$body .= "Content-Type: application/octet-stream; name==?utf-8?B?".base64_encode($filename)."?=\n"; 
	$body .= "Content-Transfer-Encoding: base64\n";
	$body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($newfilename)."?=\n\n";
	$body .= chunk_split(base64_encode($text))."\n";
	$body .= "--".$boundary ."--\n";
	mail($to, $subject, $body, $headers); //Отправляем письмо
?>