<?php
	$title = "noUiSlider - jQuery Range Slider";
	$description = "noUiSlider is a free and lightweight JavaScript range slider with full touch support (iOS, Android, Windows 8). Great for responsive designs, and no dependencies!";
?>

<h3>noUiSlider: lightweight JavaScript range slider</h3>

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

		<h3 class="quotable">"Lightweight JavaScript range slider with full touch support."</h3>

		<ul class="pro-list">
			<li>Responsive design friendly</li>
			<li>Touch support for iOS, Android &amp; Windows (phone)</li>
			<li>Dragable range</li>
			<li><strong>No jQuery, jQueryUI or other dependencies</strong></li>
			<li>Tested in IE9 - IE11, Chrome, Opera, Firefox &amp; Safari</li>
		</ul>

		<p>noUiSlider works with pretty much any device, mouse, touchscreen or both, and it'll work beautifully in <strong>responsive designs</strong>. Have you tried this documentation on your phone?</p>
	</div>
</section>


<?php sect('getting-started'); ?>
<h2>Getting started</h2>

<section>

	<div class="view">

		<p>noUiSlider 8 has no dependancies, so you don't need jQuery, jQuery UI, Zepto, etc. to use it.</p>

		<p>Putting all your scripts in the page <code>&lt;head&gt;</code> will slow down your site. If you'd like to know why, consider reading <a href="http://developer.yahoo.com/performance/rules.html#js_bottom">this article by Yahoo!</a>. Put the slider CSS in your <code>&lt;head&gt;</code>, and the script at the end of the <code>&lt;body&gt;</code>.</p>

		<p>To create a slider, call <code>noUiSlider.create()</code> with an element and your options.</p>
	</div>

	<div class="side">

<pre class="language-markup"><code>&lt;!-- In &lt;head&gt; --&gt;
&lt;link href="nouislider.min.css" rel="stylesheet"&gt;

&lt;!-- In &lt;body&gt; --&gt;
&lt;script src="nouislider.min.js"&gt;&lt;/script&gt;</code></pre>

	</div>
</section>


<?php sect('browser-support'); ?>
<h2>Browser support</h2>

<section>

	<div class="view">

		<p>noUiSlider supports <strong>IE9 and up</strong>, and the latest versions of the <em>'evergreen'</em> browsers: <strong>Chrome</strong>, <strong>Safari</strong>, <strong>Firefox</strong> and <strong>Opera</strong>.</p>
	</div>
</section>
