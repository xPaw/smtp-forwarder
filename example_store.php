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

CREATE TABLE `emails` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Date` datetime NOT NULL DEFAULT current_timestamp(),
  `Subject` text COLLATE utf8mb4_bin NOT NULL,
  `AddressTo` varchar(256) CHARACTER SET ascii NOT NULL,
  `AddressFrom` varchar(256) CHARACTER SET ascii NOT NULL,
  `Mail` mediumtext COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


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
