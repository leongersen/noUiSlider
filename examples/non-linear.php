<?php
	$title = "noUiSlider - Non-Linear Example";
	$description = "";
?>

<h1>Non linear slider</h1>

<section>

	<div class="double">
		<strong class="pill">Advanced Feature</strong>

		<p>One of noUiSlider's new features is the ability to divide the range in a non-linear fashion. Stepping can be applied, too! The example on the right shows where the handles are on the slider range in values and percentages.</p>
	</div>
	
	<div class="double">

		<div class="example">
			<div id="nonlinear"></div>
			<span class="example-val" id="lower-value"></span>
			<span id="lower-offset"></span>
			<span class="example-val" id="upper-value"></span>
			<span id="upper-offset"></span>
			<?php run('nonlinear', false); ?>
		</div>
	</div>
</section>

<?php code('nonlinear'); ?>
