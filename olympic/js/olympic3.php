<?php
	header('Content-type: text/json');
	$json = array (
		"list"   => array("7 7 DFDSF", "16 8 SDFSDF", "18 9 FDDSFS","12 10 FSDFSDF", "15 4 FSFSDFD", "20 5 FSDFSD"),	
	);
	echo json_encode($json);
?>