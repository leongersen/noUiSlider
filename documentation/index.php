<?php
	$title = "noUiSlider - JavaScript Range Slider";
	$description = "noUiSlider is a free and lightweight JavaScript range slider with full touch support (iOS, Android, Windows 8). Great for responsive designs, and no dependencies!";
?>

<section>

	<div class="view">

		<h3 class="quotable">noUiSlider: lightweight JavaScript range slider with full touch support</h3>

		<ul class="pro-list">
			<li>Responsive design friendly</li>
			<li>Touch support for iOS, Android &amp; Windows (phone)</li>
            <li>ARIA support</li>
			<li>No dependencies!</li>
			<li>Tested in IE9 - IE11, Edge, Chrome, Opera, Firefox &amp; Safari</li>
		</ul>

		<a href="/nouislider/download/" class="button">Download noUiSlider</a>

		<p>noUiSlider is a <strong>lightweight</strong> range slider with full touch support and a ton of <strong>features</strong>. It works with pretty much any device, whether it has a mouse, touchscreen or both, and it'll work great in <strong>responsive designs</strong>. Have you tried this documentation on your phone?</p>

		<div class="example" id="showcase" style="margin: 0 20px;">

			<div id="range"></div>

			<div style="text-align: center; font-size: 12px;">
				<span id="range-value-4"></span> -
				<span id="range-diff-3" style="color: blue"></span> -
				<span id="range-value-3"></span> -
				<span id="range-diff-2" style="color: blue"></span> -
				<span id="range-value-2"></span> -
				<span id="range-diff-1" style="color: blue"></span> -
				<span id="range-value-1"></span>
			</div>

			<?php run('showcase'); ?>
			<?php run('showcase-connect'); ?>
		</div>
	</div>

	<div class="side">

		<?php code('showcase'); ?>

		<div class="viewer-header">Showing values</div>

		<div class="viewer-content">
			<?php code('showcase-connect'); ?>
		</div>
	</div>
</section>
