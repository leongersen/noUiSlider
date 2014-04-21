<?php
	$title = "noUiSlider - Getting Started";
	$description = "It is really easy to use noUiSlider, simply include the files and call the plugin. Find out more!";
?>

<h1>Getting started</h1>

<section>

	<div class="wide">

		<p>noUiSlider supports <strong>IE7 and up</strong>, and of course the latest versions of the <em>'evergreen'</em> browsers: <strong>Chrome</strong>, <strong>Safari</strong>, <strong>Firefox</strong> and <strong>Opera</strong>.</p>

		<img src="/nouislider/assets/main-desktop.png" alt="Browser support">
	</div>
</section>

<section>

	<h2>Required scripts</h2>

	<div class="wide">

		<p>noUiSlider requires jQuery 1.7.x or newer, or Zepto 1.0. Zepto's <code>data</code> module is no longer required.</p>

		<p>To create a slider, call <code>.noUiSlider()</code> with your options on a jQuery element. If you'd like to see a minimal example, you can have a look at this <a href="view-source:http://refreshless.com/nouislider/minimal-sample.html">minimal setup document</a>.</p>
	</div>

<pre class="language-markup"><code>&lt;!-- jQuery or Zepto --&gt;
&lt;script src="jquery / zepto.js"&gt;&lt;/script&gt;

&lt;!-- The noUiSlider script and stylesheet --&gt;
&lt;link href="jquery.nouislider.css" rel="stylesheet"&gt;
&lt;script src="jquery.nouislider.js"&gt;&lt;/script&gt;</code></pre>

	<div class="wide">

		<p>Putting all your scripts in the page <code>&lt;head&gt;</code> will likely slow down your site. If you'd like to know why, consider reading <a href="http://developer.yahoo.com/performance/rules.html#js_bottom">this article by Yahoo!</a>.</p>
	</div>
</section>

<section>

	<h2>Setting handles and the slider range</h2>

	<div class="double">

		<p>Now that noUiSlider is included, you can start setting it up. Begin by defining the <code>range</code> and <code>start</code> options. They set the minimum and maximum for your slider, and the number of handles.</p>

		<div class="example">
			<div id="range-slider"></div>
			<?php run('create', false); ?>
		</div>

		<p>You'll find a complete documentation on the <a href="/nouislider/slider-values">slider values</a> page.</p>

	</div>

	<div class="double">
		<?php code('create'); ?>
	</div>
</section>

<section>

	<h2>Options</h2>

	<div class="double">

		<p>With all values configured, you can set some specifics. All options are passed to noUiSlider as an object (so the bracket notation).</p>

		<p>The available options are <code>connect</code>, <code>orientation</code>, <code>direction</code>, <code>step</code> and <code>margin</code>. You'll find details on all options in the <a href="/nouislider/slider-options">options and settings</a> documentation.</p>

		<div class="example vertical">
			<div id="options"></div>
			<?php run('options', false); ?>
		</div>

	</div>

	<div class="double">

		<?php code('options'); ?>
		
		<div class="notification" style="margin-top: 20px;">
			<p><strong>Set dimensions</strong> Vertical sliders don't assume a default <code>height</code>, so you'll need to set one. You can use any unit you want, including <code>%</code> or <code>px</code>.</p>
		</div>
	</div>
</section>

<section>

	<h2>Serialization</h2>

	<div class="double">

		<p>Now that you have the basic slider set up, you can start adding <code>Link</code> elements. These elements allow you to write the slider value to other elements automaticly.</p>

		<p>As you can see, noUiSlider now updates the value in the <code>$('#readout')</code> element. The value is formatted using the <code>mark</code> and <code>decimals</code> options. You can set many more formatting options, and you can even set different options for every <em>Link</em>. You'll find all details in the <a href="/nouislider/serialization">serialization documentation</a>.</p>

		<div class="example">
			<div id="serialization"></div>
			<span class="example-val" id="span"></span>
			<input id="input">
			<?php run('link', false); ?>
		</div>
	</div>

	<div class="double">
		<?php code('link'); ?>
	</div>
</section>

<section>

	<h2>Slider behaviour</h2>

	<div class="double">

		<p>noUiSlider has a lot of optional features such as dragable ranges and tap-to-move. You can set this behaviour using the <code>behaviour</code> option. Read all about it in the <a href="/nouislider/behaviour-option">behaviour section</a>.</p>

		<div class="example">
			<div id="behaviour"></div>
			<?php run('behaviour', false); ?>
		</div>

	</div>

	<div class="double">
		<?php code('behaviour'); ?>
	</div>
</section>

<section>

	<h2>Events</h2>

	<div class="double">

		<p>If you want to listen to slider interaction, you can use the <code>block</code>, <code>set</code>, <code>slide</code> and <code>change</code> events. Read all about events in the <a href="/nouislider/events-callbacks">event documentation</a>.</p>
	</div>

	<div class="double">
		<?php code('events'); ?>
	</div>
</section>

<section>

	<h2>There is more!</h2>

	<div class="double">

		<p>The menu on the right contains several more pages with detailed information. Download the source and get started!</p>
	</div>
</section>
