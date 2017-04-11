<?php
	header('Content-type: text/json');
	$json = array (
		"code"   => array("code" => "FSFSD", "level" => "10"),
		"list"   => array("18811181295 7","18811181295 8","18811181295 9","18811181295 10","18811181295 4"),
		"total"  => array("phone" => "18811181295", "total" => "5"),
		"time"   => "2015-08-22",
		"status" => "Y",
		"user"   => array("grandtotal" => "55")
	);
	echo json_encode($json);
?>