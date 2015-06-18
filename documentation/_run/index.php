<!DOCTYPE html>

<head>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="<?php echo $description; ?>">

	<title><?php echo $title; ?> | Refreshless.com</title>

	<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">

	<link href="/assets/base.css" rel="stylesheet">
	<link href="/assets/prism.css" rel="stylesheet">
	<script src="/assets/wNumb.js"></script>

	<link href="<?php echo $distribute; ?>/nouislider.min.css" rel="stylesheet">
	<script src="<?php echo $distribute; ?>/nouislider.js"></script>

</head>

<body class="language-javascript">

	<?php if ( $page == 'index' ): ?>

		<div class="hi">

			<h1>$.noUiSlider</h1>
			<h2>jQuery Range Slider</h2>

			<div class="quick">

				<div id="slider"></div>
				<?php run('minimal', false); ?>
				<?php code('minimal'); ?>

				<a href="/nouislider/download/" class="hi-dl">Download noUiSlider</a>
			</div>
		</div>

	<?php endif; ?>

	<?php include $file_menu; ?>

	<div class="content">
		<?php echo $content; ?>
	</div>

	<footer>

		<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://refreshless.com/nouislider/" data-size="large">Tweet</a>

		<h4>About noUiSlider</h4>

		<a href="/nouislider/contact/">Help and contact</a>
		<a href="/nouislider/download/">Download</a>
		<a href="/nouislider/new-version/">New Version</a>

	</footer>

	<script>

//	$('.viewer-header').click(function(){
//		$(this).toggleClass('open');
//	});

	<?php $t = $_SERVER['DOCUMENT_ROOT'] . 'track.js'; if ( file_exists($t) ) { include $t; } ?>

	</script>

	<script src="/assets/prism.js"></script>
<!--
	<script async src="http://platform.twitter.com/widgets.js"></script>
	<script async src="http://www.google-analytics.com/ga.js"></script>
-->
</body>
