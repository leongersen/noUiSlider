<?php sect('colorpicker'); ?>
<h1>Colorpicker</h1>

<section>

	<div class="view">

		<p>We'll initialize all sliders with the same options, and use the <code>slide</code> callback to keep to color in sync with the slider values. This callback fires when the slider is moved by sliding, or when it is clicked or tapped.</p>

		<div id="colorpicker">
			<div class="sliders" id="red"></div>
			<div class="sliders" id="green"></div>
			<div class="sliders" id="blue"></div>

			<div id="result"></div>
			<?php run('colorpicker-setcolor'); ?>
			<?php run('colorpicker-slider'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">The HTML</div>

		<div class="viewer-content">

<pre class="language-markup"><code>&lt;div id="colorpicker"&gt;
	&lt;div class="sliders" id="red"&gt;&lt;/div&gt;
	&lt;div class="sliders" id="green"&gt;&lt;/div&gt;
	&lt;div class="sliders" id="blue"&gt;&lt;/div&gt;

	&lt;div class="result"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

		</div>

		<div class="viewer-header">The <code>setColor</code> function</div>

		<div class="viewer-content">
			<?php code('colorpicker-setcolor'); ?>
		</div>

		<div class="viewer-header">Initializing the slider</div>

		<div class="viewer-content">
			<?php code('colorpicker-slider'); ?>
		</div>

		<div class="viewer-header">CSS</div>

		<div class="viewer-content">
			<?php loadShowCSS('colorpicker'); ?>
		</div>

	</div>
</section>
