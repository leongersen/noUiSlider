<?php
	$title = "noUiSlider - Colorpicker example";
	$description = "noUiSlider is great to use as a helper in a colorpicker. This example will give you an idea how.";
?>

<h1>Colorpicker</h1>

<section>

	<div class="double">

		<p>Since jQuery UI provides a colorpicker example, I figured I'd show noUiSlider can do the same thing. To do something different, I went with vertical sliders.</p>

		<p>We'll initialize all sliders with the same options, and use the <code>slide</code> callback to keep to color in sync with the slider values. This callback fires when the slider is moved by sliding, or when it is clicked or tapped.</p>
	</div>

	<div class="double">
		<div id="colorpicker">
			<div class="slider" id="red"></div>
			<div class="slider" id="green"></div>
			<div class="slider" id="blue"></div>

			<div class="result"></div>
			<?php run('colorpicker', false); ?>
		</div>
	</div>
</section>

<pre class="language-markup"><code>&lt;div id="colorpicker"&gt;
	&lt;div class="slider" id="red"&gt;&lt;/div&gt;
	&lt;div class="slider" id="green"&gt;&lt;/div&gt;
	&lt;div class="slider" id="blue"&gt;&lt;/div&gt;

	&lt;div class="result"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

<?php code('colorpicker'); ?>

<style>

	#red, #green, #blue {
		margin: 10px;
		display: inline-block;
		height: 200px;
	}
	#colorpicker {
		height: 240px;
		width: 300px;
		margin: 0 auto;
		padding: 10px;
		border: 1px solid #BFBFBF;
	}
	#colorpicker .result {
		margin: 60px 26px;
		height: 100px;
		width: 100px;
		display: inline-block;
		vertical-align: top;
		color: rgb(127, 127, 127);
		background: rgb(127, 127, 127);
		border: 1px solid #fff;
		box-shadow: 0 0 10px;
	}
	#red {
		background: #c0392b;
	}
	#green {
		background: #27ae60;
	}
	#blue {
		background: #2980b9;
	}

</style>
