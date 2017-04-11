<?php
 //echo '{"st":"3","number":"2","code":"fasdfafWREFDFDFSDF321fsdD","level":"2","status":"1","name":"王明","phone":"17788885555","address":"深圳市苏州街中山路"}';
 //echo '{"st":"2","number":"1","code":"fasdfafWREFDFDF,SDF321fsdD","musicnumber":"2","level":"0","status":"M","name":"","phone":"","adrs":""}';
 
 
 
    header('Content-type: text/json');
	header('Access-Control-Allow-Origin:*');
	$json = array (
		"st" => "2",
		"number" => "3",
		"phone" => "18811181299",
		"name" => "王明",
		"adrs" => "深圳市苏州街中山路软件园二期启明星辰大厦三层",
		"prize"=>"DFSFEWESDFSDF",
		"day" => "7",
		"level" => "1"
		//"array"   => array("18811181295 1","18811181295 2","18811181295 3","18811181295 5","18811181295 4")
		//"level" => array(4,7)
	);
	echo json_encode($json);