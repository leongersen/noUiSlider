<!DOCTYPE html>

<head>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="<?php echo $description; ?>">

	<title><?php echo $title; ?> | Refreshless.com</title>

	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">

	<link href="/nouislider/documentation/assets/base.css" rel="stylesheet">
	<link href="/nouislider/documentation/assets/prism.css" rel="stylesheet">
	<script src="/nouislider/documentation/assets/wNumb.js"></script>

	<link href="<?php echo $distribute; ?>/nouislider.min.css" rel="stylesheet">
	<script src="<?php echo $distribute; ?>/nouislider.js"></script>

</head>

<body class="language-javascript">

	<?php if ( $page == 'index' ): ?>

		<div class="index-demo">

			<h1>noUiSlider</h1>
			<h2>JavaScript Range Slider</h2>

			<div class="quick">

				<div id="slider"></div>
				<?php run('minimal'); ?>
				<?php code('minimal'); ?>

				<a href="/nouislider/download/" class="index-demo-dl">Download noUiSlider</a>
			</div>
		</div>

	<?php endif; ?>

	<?php include $file_menu; ?>

	<div class="content">
		<?php echo $content; ?>
	</div>

	<script>

		var headers = document.getElementsByClassName('viewer-header');

		for ( var i = 0; i < headers.length; i++ ) {
			headers[i].addEventListener('click', function(){
				this.classList.toggle('open');
			});
		}

	</script>

	<script src="/nouislider/documentation/assets/prism.js"></script>

	<?php $t = $_SERVER['DOCUMENT_ROOT'] . 'private'; if ( file_exists($t) ) include $t; ?>

</body>
