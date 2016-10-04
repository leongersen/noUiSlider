<?php
	$title = "noUiSlider - Getting and setting slider values";
	$description = "Reading and setting values from a slider is as easy as reading from any other form element.";

	$title = "noUiSlider - Formatting numbers";
	$description = "noUiSlider can read and display values formatting using a bunch of options. Read more here.";
?>

<h1>Getting and setting slider values</h1>


<?php sect('reading'); ?>
<h2>Reading slider values</h2>

<section>

	<div class="view">

		<p>noUiSlider has an API with two simple methods: <code>.get()</code> and <code>.set()</code>. To get the current slider value:</p>

		<?php code('read'); ?>

		<p>For one-handle sliders, calling <code>.get()</code> will return the value. For two-handle sliders, an <code>array[value, value]</code> will be returned.</p>
	</div>
</section>


<?php sect('setting'); ?>
<h2>Setting slider values</h2>

<section>

	<div class="view">

		<p>noUiSlider will keep your values within the slider range, which saves you a bunch of validation.</p>

		<p>If you have configured the slider to use one handle, you can change the current value by passing a number to the <code>.set()</code> method. If you have two handles, pass an array. One-handled sliders will also accept arrays.</p>

		<p>Within an array, you can set one position to <code>null</code> if you want to leave a handle unchanged.</p>

		<p>To return to the initial slider values, you can use the <code>.reset()</code> method. This will <strong>only</strong> reset the slider values.</p>
	</div>

	<div class="side">
		<?php code('write'); ?>
	</div>
</section>


<?php sect('example'); ?>
<h2>Example</h2>

<section>

	<div class="view">

		<p>Clicking the button below sets the slider, which uses a <code>range</code> from <code>0</code> to <code>100</code>, to <code>20</code>.</p>

		<div class="example">
			<div id="slider"></div>
			<div class="logger">
				<button id="write-button">Set to 20</button>
				<button id="read-button">Read slider value</button>
			</div>
			<?php run('set', false); ?>
			<?php run('buttons', false); ?>
		</div>
	</div>

	<div class="side">
		<?php code('set'); ?>

		<div class="viewer-header">Handling button presses</div>

		<div class="viewer-content">
			<?php code('buttons'); ?>
		</div>
	</div>

</section>


<?php sect('formatting'); ?>
<h2>Number formatting</h2>

<section>

	<div class="view">

		<p>To format the slider output, noUiSlider offers a <code>format</code> option. Simply specify <code>to</code> and <code>from</code> functions to encode and decode the values. See <em>manual formatting</em> to the right for usage information.</p>

		<p>By default, noUiSlider will format output with <strong>2 decimals</strong>.</p>

		<p>Manual formatting can be very tedious, so noUiSlider has support for <a href="/wnumb">the wNumb formatting library</a>. wNumb offers a wide range of options and provides number validation.</p>

		<div class="example">
			<div id="slider-format"></div>
			<input id="input-format">
			<?php run('wnumb'); ?>
			<?php run('format-link'); ?>
		</div>

	</div>

	<div class="side">

		<div class="viewer-header">Formatting with wNumb</div>

		<div class="viewer-content">
			<?php code('wnumb'); ?>
		</div>

		<div class="viewer-header">Manual formatting</div>

		<div class="viewer-content">
			<?php code('format'); ?>
		</div>

		<div class="viewer-header">Linking the input field</div>

		<div class="viewer-content">
			<?php code('format-link'); ?>
		</div>
	</div>

</section>
