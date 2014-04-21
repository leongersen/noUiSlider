<?php
	$title = "noUiSlider - Getting and setting slider values";
	$description = "Reading and setting values from a slider is as easy as reading from any other form element.";
?>

<h1>Getting and setting slider values</h1>

<section>

	<h2>Reading slider values</h1>

	<div class="double">

		<p>noUiSlider has an API which is designed to be compatible with other form elements. That's why you can just use the same method that works on any other input.</p>
		<p>You can just get the slider value by calling <code>.val()</code>. It is really simple:</p>

		<?php code('read'); ?>
	</div>

	<div class="double">

		<p>For one-handle sliders, calling <code>.val()</code> will return the value. For two-handle sliders, an <code>array[value, value]</code> will be returned.</p>

		<p>To set the number of decimals on your result, or use a comma as a decimal mark, use the <a href="/nouislider/serialization">serialization option</a>.</p>
	</div>
</section>

<section>

	<h2>Setting slider values</h2>

	<div class="double">

		<p>noUiSlider will keep your values within the slider range, which saves you a bunch of validation.</p>

		<p>If you have set the slider to use one handle, simply set it on the slider using the <code>.val()</code> method. If you have two handles, pass an array. One-handled sliders will also accept arrays. Within an array, you can set a position to <code>null</code> if you want to leave a handle unchanged.</p>
	</div>

	<div class="double">
	<?php code('write'); ?>
	</div>
</section>

<section>

	<h2>Example</h2>

	<div class="double">

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

	<div class="double">
	<?php code('set'); ?>
	</div>

	<div class="jump">

		<h3>Handling button presses</h3>
		
		<p>We'll bind some events to the buttons.</p>

		<?php code('buttons'); ?>
	</div>
</section>

<section>

	<h3>Options</h3>

	<div class="double">
		<strong class="pill">Advanced Feature</strong>
		<p>The <code>.val()</code> method accepts a second argument in which options can be supplied. These settings are all optional.</p>
	</div>
	
	<?php code('options'); ?>
</section>
