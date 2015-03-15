<?php
	$title = "noUiSlider - jQuery Range Slider";
	$description = "noUiSlider is a free and lightweight jQuery range slider plugin with full touch support (iOS, Android, Windows 8). Great for responsive designs!";

	$title = "noUiSlider - Getting Started";
	$description = "It is really easy to use noUiSlider, simply include the files and call the plugin. Find out more!";
?>

<h5>This is noUiSlider.</h5>

<section>

	<div class="view">

		<p>noUiSlider is a range slider <strong>without bloat</strong>. It offers a ton off <strong>features</strong>, and it is as small, <strong>lightweight</strong> and minimal as possible, which is great for mobile use on the many supported <strong>devices</strong>, including iPhone, iPad, Android devices &amp; Windows (Phone) 8 desktops, tablets and all-in-ones. It works on desktops too, of course!</p>

		<div class="example" id="showcase">
			<div id="range"></div>
			<label class="showcase-label">Slider values:</label>
			<span id="value-span"></span>
			<input id="value-input">
			<?php run('showcase', false); ?>
		</div>


	<h3 class="quotable">"Lightweight javascript range slider that works with jQuery or Zepto."</h3>

		<ul class="pro-list">
			<li>Responsive design friendly</li>
			<li>Linking input fields</li>
			<li>Touch support for iOS, Android &amp; Windows (phone)</li>
			<li>Dragable range</li>
			<li>Works with jQuery (1.7+) or Zepto</li>
			<li>No jQueryUI dependencies</li>
			<li>Tested in IE7 - IE11, Chrome, Opera, Firefox &amp; Safari</li>
		</ul>
	</div>

	<div class="side">
		<?php code('showcase'); ?>
	</div>
</section>

<h2>Browser support</h2>

<section>

	<div class="view">

		<p>noUiSlider supports <strong>IE7 and up</strong>, and of course the latest versions of the <em>'evergreen'</em> browsers: <strong>Chrome</strong>, <strong>Safari</strong>, <strong>Firefox</strong> and <strong>Opera</strong>.</p>

		<img src="/assets/main-desktop.png" alt="Browser support">
	</div>
</section>

<h1>Let's get started!</h1>

<h2>Required scripts</h2>

<section>

	<div class="view">

		<p>noUiSlider requires jQuery 1.7.x or newer, or Zepto 1.0. Zepto's <code>data</code> module is no longer required.</p>

		<p>To create a slider, call <code>.noUiSlider()</code> with your options on a jQuery element. If you'd like to see a minimal example, you can have a look at this <a href="view-source:http://refreshless.com/nouislider/minimal-sample.html">minimal setup document</a>.</p>

		<p>Putting all your scripts in the page <code>&lt;head&gt;</code> will likely slow down your site. If you'd like to know why, consider reading <a href="http://developer.yahoo.com/performance/rules.html#js_bottom">this article by Yahoo!</a>.</p>
	</div>

	<div class="side">

<pre class="language-markup"><code>&lt;!-- jQuery or Zepto --&gt;
&lt;script src="jquery / zepto.js"&gt;&lt;/script&gt;

&lt;!-- The noUiSlider script and stylesheet --&gt;
&lt;!-- Use the files with *.min.* for the minified versions. --&gt;
&lt;link href="jquery.nouislider.min.css" rel="stylesheet"&gt;

&lt;!-- Use the 'all' version to get all documented features. --&gt;
&lt;!-- Includes wNumb, libLink and the pips add-on --&gt;
&lt;script src="jquery.nouislider.all.min.js"&gt;&lt;/script&gt;</code></pre>

	</div>
</section>


<h2>Well written and lightweight</h2>

<section>
	<div class="view">
		<p>When using noUiSlider in your forms, users get all the functionality they've come to expect, and powerful API's make implementation easy. When gzipped and minified, noUiSlider and the default CSS theme take about <strong>6 KB</strong>.</p>
	</div>
</section>


<h2>Super simple API design</h2>

<section>
	<div class="view">
		<p>The noUiSlider API is compatible with the standard HTML input methods, so the slider is extremely easy to use. You can select a group of <code>$('input[type="number"], select, .noUiSlider')</code>, and calling <code>.val(50)</code> will just work.</p>
	</div>
</section>


<h2>Responsive all around</h2>
<section>
	<div class="view">
		<p>noUiSlider works with pretty much any device, mouse, touchscreen or both, and it'll work beautifully in <strong>responsive designs</strong>. Have you tried this documentation on your phone?</p>
	</div>
</section>
