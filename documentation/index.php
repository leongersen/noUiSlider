<?php
	$title = "noUiSlider - jQuery Range Slider";
	$description = "noUiSlider is a free and lightweight jQuery range slider plugin with full touch support (iOS, Android, Windows 8). Great for responsive designs!";

	$title = "noUiSlider - Getting Started";
	$description = "It is really easy to use noUiSlider, simply include the files and call the plugin. Find out more!";
?>

<h5>noUiSlider: lightweight JavaScript range slider</h5>

<section>

	<div class="view">

		<p>noUiSlider is a range slider <strong>without bloat</strong>. It offers a ton off <strong>features</strong>, and it is as small, <strong>lightweight</strong> and minimal as possible, which is great for mobile use on the many supported <strong>devices</strong>, including iPhone, iPad, Android devices &amp; Windows (Phone) 8 desktops, tablets and all-in-ones. It works on desktops too, of course!</p>

		<div class="example" id="showcase">
			<div id="range"></div>
			<span id="value-span"></span>
			<input id="value-input">
			<?php run('showcase'); ?>
			<?php run('showcase-connect'); ?>
		</div>
	</div>

	<div class="side">

		<?php code('showcase'); ?>

		<div class="viewer-header">Connect the input to the slider</div>

		<div class="viewer-content">
			<?php code('showcase-connect'); ?>
		</div>

		<div class="viewer-header">CSS in this example</div>

		<div class="viewer-content">
			<?php loadShowCSS('showcase'); ?>
		</div>
	</div>
</section>

<section>

	<div class="view">

		<h3 class="quotable">"Lightweight javascript range slider that works with jQuery or Zepto."</h3>

		<ul class="pro-list">
			<li>Responsive design friendly</li>
			<li>Touch support for iOS, Android &amp; Windows (phone)</li>
			<li>Dragable range</li>
			<li><strong>No jQuery, jQueryUI or other dependencies</strong></li>
			<li>Tested in IE9 - IE11, Chrome, Opera, Firefox &amp; Safari</li>
		</ul>
	</div>
</section>
