<?php
	header('Content-type: text/json');
	$json = array (
		"list"   => array("18811181295 1","18811181295 2","18811181295 3","18811181295 5","18811181295 4"),
	);
	echo json_encode($json);
?>