<?php

	chdir('../');

	$request = parse_url(strtolower($_SERVER['REQUEST_URI']));
	$page = rtrim(substr($request['path'], strlen('/nouislider/')), '/');

	if ( !$page ) {
		$page = 'index';
	}

	$file = $page . '.php';
	$file_menu = '_run/menu.php';

	require '_run/helpers.php';

	if ( !file_exists($file) ){
		header('HTTP/1.0 404 Not Found');
		$file = '_run/404.php';
	}

	// Defaults for title and description.
	$title = "";
	$description = "";

	ob_start();

	include $file;
	$content = ob_get_contents();

	ob_end_clean();

	$distribute = '/noUiSlider/distribute';
	include '_run/index.php';
