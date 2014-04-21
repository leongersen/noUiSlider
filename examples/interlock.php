<?php
	$title = "noUiSlider - Interlocked Sliders";
	$description = "";
?>

<h1>Interlocked Sliders</h1>

<section>

	<div class="double">

		<strong class="pill">Advanced Feature</strong>

		<p>Using <code>serialization</code>, cross-updating values will results in an infinite loop of updates. To prevent this, each <code>Link</code> has the option to disable synchronisation.</p>

		<?php code('recursive'); ?>
	</div>

	<div class="double">

		<div class="example">
			<div class="slider" id="slider1"></div>
			<span class="example-val" id="slider1-span"></span>

			<div class="slider" id="slider2"></div>
			<span class="example-val" id="slider2-span"></span>

			<button style="float:right;margin:20px 0 0">Lock</button>

			<?php run('locked', false); ?>
		</div>
	</div>
</section>

<section>
	<h2>Example</h2>

	<?php code('locked'); ?>
</section>
