<?php


$POST = array_merge_recursive($_GET, $_POST);

$act = $POST['act'];

switch($act){
	case 'prize'://抽奖
		$award = award();
		echo $_GET['callback'].'('.json_encode($award).')';
	break;	
	
	default:
	break;	
}
		
		
function award(){
	global $uid,$huodong_id,$now,$datenow,$ip,$typearr,$db,$appid,$oc_app_kind;	
	$type = draw();
	
	$arrinfo = array(200=>'谢谢参与',201=>'iphone6 一部',202=>'美女一枚',203=>'茶叶蛋2只');
	
	$res[] =  array('award_type'=>$type,'id'=>'0','award_name'=>$arrinfo[$type]);
	
	return $res;
}

function draw($deltype=null){
	
	$prize = array(
			1 => 20,
			2 => 30,
			3 => 40,
			4 => 10
	);
	
	
	$prizeList = array(
			1 => array('200'), //谢谢参与
			2 => array('201'),//iphone6 一部
			3 => array('202'),//美女一枚
			4 => array('203')//茶叶蛋2只
	);
	
	
	if($deltype != null){
		if(is_array($deltype)){
			foreach($deltype as $key=>$value){
				unset($prize[$value]); //直接把特殊礼品排除在外
			}
		}else{
			unset($prize[$deltype]); //直接把特殊礼品排除在外
		}
	}
	
	$times = 10;
	$max = 0;
	foreach ($prize as $k => $v) {
		$max = $v * $times + $max;
		$row['v'] = $max;
		$row['k'] = $k;
		$prizeZone[] = $row;
	}
		
	$max--; //临界值
	$rand = mt_rand(0, $max);
	$zone = 1;
	foreach ($prizeZone as $k => $v) {
		if ($rand >= $v['v']) {
			if ($rand >= $prizeZone[$k + 1]['v']) {
				continue;
			} else {
				$zone = $prizeZone[$k + 1]['k'];
				break;
			}
		}
		$zone = $v['k'];
		break;
	}
	return $prizeList[$zone][0];
}