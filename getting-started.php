<?php
	$title = "noUiSlider - Getting Started";
	$description = "It is really easy to use noUiSlider, simply include the files and call the plugin. Find out more!";
?>

<h1>Getting started</h1>

<section>

	<p>This page will guide you through setting up noUiSlider.</p>

	<div class="notification">
		<p><strong>Detailed information below.</strong> This article starts with the absolute basics, but more advanced features are detailed too.</p>
	</div>

</section>

<h2>Including noUiSlider</h2>

<section>

	<div class="double-left">

		<h3>Library support</h3>

		<p>You'll need some resources on your page to use noUiSlider. noUiSlider requires jQuery 1.7.x or newer, or Zepto 1.0. While noUiSlider 5 needed Zepto's data module, noUiSlider 6 does not!</p>

	</div>

	<div class="double-right">

		<h3>Browser support</h3>

		<p>noUiSlider supports <strong>IE7 and up</strong>, and of course the latest versions of the <em>'evergreen'</em> browsers: <strong>Chrome</strong>, <strong>Safari</strong>, <strong>Firefox</strong> and <strong>Opera</strong>.</p>

	</div>

<pre class="language-markup clear"><code>&lt;!-- jQuery or Zepto --&gt;
&lt;script src="jquery / zepto.js"&gt;&lt;/script&gt;

&lt;!-- The noUiSlider script and stylesheet --&gt;
&lt;link href="jquery.nouislider.css" rel="stylesheet"&gt;
&lt;script src="jquery.nouislider.js"&gt;&lt;/script&gt;</code></pre>

	<div class="double-left">

		<p>Putting all your scripts in the page <code>&lt;head&gt;</code> will likely slow down your site. If you'd like to know why, consider reading <a href="http://developer.yahoo.com/performance/rules.html#js_bottom">this article by Yahoo!</a>.</p>

	</div>

	<div class="double-right">

		<p>To create a slider, call <code>.noUiSlider()</code> with your options on a jQuery element. If you'd like to see a minimal example, you can have a look at this <a href="view-source:http://refreshless.com/nouislider/minimal-sample.html">minimal setup document</a>.</p>

	</div>

</section>

<h2>Setting handles and the slider range</h2>

<section>

	<div class="double-left">

		<p>Now that noUiSlider is included, you can start setting it up. Begin by defining the <code>range</code> and <code>start</code> options. They set the minimum and maximum for your slider, and the number of handles.</p>

		<div class="example">
			<div id="range-slider"></div>
			<?php run('create', false); ?>
		</div>

		<p>You'll find a complete documentation on the <a href="/nouislider/slider-values">slider values</a> page.</p>

	</div>

	<div class="double-right">
		<?php code('create'); ?>
	</div>

</section>

<h2>Options</h2>

<section>

	<div class="double-left">

		<p>With all values configured, you can set some specifics. All options are passed to noUiSlider as an object (so the bracket notation).</p>

		<p>The available options are <code>connect</code>, <code>orientation</code>, <code>direction</code>, <code>step</code> and <code>margin</code>. You'll find details on all options in the <a href="/nouislider/slider-options">options and settings</a> documentation.</p>

		<div class="example vertical">
			<div id="slider-options"></div>
			<?php run('options', false); ?>
		</div>

	</div>

	<div class="double-right">

		<div class="notification">
			<p><strong>Set dimensions</strong> Vertical sliders don't assume a default <code>height</code>, so you'll need to set one. You can use any unit you want, including <code>%</code> or <code>px</code>.</p>
		</div>

		<?php code('options'); ?>

	</div>

</section>

<h2>Serialization</h2>

<section>

	<div class="double-left">

		<p>Now that you have the basic slider set up, you can start adding <em>'Links'</em>. Links allow you do write the slider value to other elements automaticly.</p>

		<p>Start by creating a copy of noUiSlider's <code>Link</code> method:</p>

		<pre><code>var Link = $.noUiSlider.Link;</code></pre>

		<p>You can now create new <em>Link</em> elements, and pass them in the serialization option.</p>

		<p>As you can see, noUiSlider now updates the value in the <code>$('#readout')</code> element. The value is formatted using the <code>mark</code> and <code>decimals</code> options. You can set many more formatting options, and you can even set different options for every <em>Link</em>. You'll find all details in the <a href="/nouislider/serialization">serialization documentation</a>.</p>

		<div class="example">
			<div id="sample-readout"></div>
			<span class="example-val" id="span"></span>
			<input id="input">
			<?php run('link', false); ?>
		</div>

	</div>

	<div class="double-right">

		<?php code('link'); ?>

	</div>

</section>

<h2>Slider behaviour</h2>

<section>

	<div class="double-left">

		<p>noUiSlider has a lot of optional features such as dragable ranges and tap-to-move. You can set this behaviour using the <code>behaviour</code> option. Read all about it in the <a href="/nouislider/behaviour-option">behaviour section</a>.</p>

		<div class="example">
			<div id="sample-behaviour"></div>
			<?php run('behaviour', false); ?>
		</div>

	</div>

	<div class="double-right">

		<?php code('behaviour'); ?>

	</div>

</section>

<h2>Callbacks</h2>

<section>

	<div class="double-left">

		<p>If you want to listen to slider interaction, you can use the <code>block</code>, <code>set</code>, <code>slide</code> and <code>change</code> events. Read all about events in the <a href="/nouislider/events-callbacks">event documentation</a>.</p>

	</div>

	<div class="double-right">

		<?php code('events'); ?>

	</div>

</section>

<h2>There is more!</h2>

<section>

	<div class="double-left">

		<p>The menu on the left contains several more pages with detailed information. Download the source and get started!</p>

	</div>

	<div class="double-right">

	</div>

</section>
