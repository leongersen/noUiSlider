<?php
	$title = "noUiSlider - Slider with tooltips example";
	$description = "noUiSlider includes some handy tooltip features.";
?>

<h1>Slider with Tooltips</h1>

<section>

	<div class="double">

		<p>Using the serialization feature, noUiSlider can provided handles with tooltips. These tooltips can be styled and modified on the fly, as demonstrated in this example.</p>
	</div>

	<div class="double">

		<div class="example">
			<div id="tipslider"></div>
			<?php run('tooltip', false); ?>
		</div>
	</div>
</section>

<section>

	<h2>Javascript</h2>

	<div class="double">

		<p>A basic tooltip implementation is part of the <a href="/nouislider/serialization">serialization</a> feature.</p>
	</div>

	<?php code('tooltip', true); ?>
</section>

<section>

	<h2>CSS</h2>

	<div class="double">

		<p>The noUiSlider theme includes no tooltip styling. The following styles are used in this example:</p>
	</div>

<pre><code class="language-css">.tooltip {
	display: block;
	position: absolute;
	border: 1px solid #D9D9D9;
	font: 400 12px/12px Arial;
	border-radius: 3px;
	background: #fff;
	top: -43px;
	padding: 5px;
	left: -9px;
	text-align: center;
	width: 50px;
}
.tooltip strong {
	display: block;
	padding: 2px;
}
</code></pre>
</section>

<style>

.tooltip {
	display: block;
	position: absolute;
	border: 1px solid #D9D9D9;
	font: 400 12px/12px Arial;
	border-radius: 3px;
	background: #fff;
	top: -43px;
	padding: 5px;
	left: -9px;
	text-align: center;
	width: 50px;
}
.tooltip strong {
	display: block;
	padding: 2px;
}

</style>
