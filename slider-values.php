<?php
	$title = "noUiSlider - Handles and Slider Values";
	$description = "";
?>

<h1>Slider values</h1>

<section>

	<h2>Handles</h2>

	<div class="double">
		<p>The number of handles can be set using the <code>start</code> option. This option accepts an array of initial handle positions. Set one value for one handle, two values for two handles.</p>

		<div class="example">
			<div id="slider0"></div>
			<?php run('handles'); ?>
		</div>
	</div>

	<div class="double">
	<?php code('handles'); ?>
	</div>
</section>

<section>

	<h2>Range</h2>

	<div class="double">
		<p>All values on the slider are part of a range. The range has a minimum and maximum value.</p>

		<div class="example">
			<div id="slider1"></div>
			<span class="example-val" id="slider1val"></span>
			<?php run('range'); ?>
		</div>
	</div>

	<div class="double">
	<?php code('range'); ?>
	</div>

	<div class="jump">

		<h3>Stepping and snapping to values</h3>

		<div class="double">
			<p>The amount the slider changes on movement can be set using the <code>step</code> option.</p>
			<div class="example">
				<div id="slider2"></div>
				<span class="example-val" id="slider2val"></span>
				<?php run('step'); ?>
			</div>
		</div>

		<div class="double">
		<?php code('step'); ?>
		</div>
	</div>
</section>

<section>

	<h2>Non-linear sliders</h2>

	<div class="double">

		<strong class="pill">Advanced Feature</strong>

		<p>noUiSlider offers some powerful mechanisms that allow a slider to behave in a non-linear fashion. You can create sliders with ever-increasing increments by specifying the value for the slider at certain intervals. Note how the handle in the example below starts at 30% of the slider width, even though <code>4000</code> is not 30% of the span between <code>2000</code> and <code>10000</code>.</p>

		<div class="example">
			<div id="slider3"></div>
			<span class="example-val" id="slider3val"></span>
			<?php run('non-linear'); ?>
		</div>
	</div>

	<div class="double">
	<?php code('non-linear'); ?>
	</div>

	<div class="jump">

		<h3>Stepping in non-linear sliders</h3>

		<div class="double">
			<p>For every subrange in a non-linear slider, stepping can be set. Note how in the example below the slider doesn't step until it reaches <code>500</code>. From there on, it changes in increments of <code>500</code>, until it reaches <code>4000</code>, where increments now span <code>1000</code>.</p>

			<div class="example">
				<div id="slider4"></div>
				<span class="example-val" id="slider4val"></span>
				<?php run('non-linear-step'); ?>
			</div>
		</div>

		<div class="double">
		<?php code('non-linear-step'); ?>
		</div>
	</div>
	
	<div class="jump">

		<h3>Snapping between steps</h3>

		<div class="double">
			<p>When a non-linear slider has been configured, the <code>snap</code> option can be set to <code>true</code> to force the slider to jump between the specified values.</p>

			<div class="example">
				<div id="slider5"></div>
				<span class="example-val" id="slider5val1"></span>
				<span class="example-val" id="slider5val2"></span>
				<?php run('snap'); ?>
			</div>
		</div>

		<div class="double">
		<?php code('snap'); ?>
		</div>
	</div>
</section>
