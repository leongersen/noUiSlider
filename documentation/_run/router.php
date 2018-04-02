<?php

	chdir(__DIR__.'/..');

	$url = strtolower($_SERVER['REQUEST_URI']);

	if ( strpos($url, '.js') || strpos($url, '.css') || strpos($url, '.html') ) {
		return false;
	}

	$request = parse_url($url);
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

	$package = json_decode(file_get_contents('./../package.json'));
	$version = $package->version;
	$plain_version = str_replace('.', '', $version);

	ob_start();

	include $file;
	$content = ob_get_contents();

	ob_end_clean();

	$distribute = '/nouislider/distribute';
	include '_run/index.php';
