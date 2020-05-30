<?php
\header( 'Content-Type: text/plain; charset=utf-8' );
\header( 'Cache-Control: no-cache, no-store, must-revalidate' );

$EmailMessage = \filter_input( INPUT_POST, 'message' ); // raw smtp message

// composer require zbateson/mail-mime-parser
$MailParser = new \ZBateson\MailMimeParser\MailMimeParser();
$Message = $MailParser->parse( $EmailMessage );

$Subject = $Message->getHeaderValue( 'subject' ); // subject line
$From = $Message->getHeaderValue( 'from' ); // from address
$To = $Message->getHeaderValue( 'to' ); // to address

/*
$InsertEmail = $Database->prepare(
	'INSERT INTO `emails` (`Subject`, `AddressFrom`, `AddressTo`, `Mail`) ' .
	'VALUES (:subject, :from, :to, :mail)'
);
$InsertEmail->bindValue( ':subject', $Subject );
$InsertEmail->bindValue( ':from', $From );
$InsertEmail->bindValue( ':to', $To );
$InsertEmail->bindValue( ':mail', $EmailMessage );
$InsertEmail->execute();
*/

echo 'OK';
