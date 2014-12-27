<?php
	$title = "noUiSlider - Linking input fields";
	$description = "noUiSlider is designed to function exactly like any other form element. Some detailed options are available, to make any form amazing!";
?>

<h1>Linking input fields</h1>


<?php sect('liblink'); ?>
<h2>libLink support</h2>

<section>

	<div class="view">

		<p>noUiSlider has full support for libLink, which will let you write values to input elements very easily. libLink will update the slider if you change an input as well!</p>

		<p>As you can see, noUiSlider updates the value in the <code>$('#readout')</code> element, and typing in the input will change the slider.</p>

		<div class="example">
			<div id="slider-link"></div>
			<span class="example-val" id="span"></span>
			<input id="input">
			<?php run('link'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('link'); ?>
	</div>

</section>


<?php sect('features'); ?>
<h2>Feature overview</h2>

<section>

	<div class="view">
		<p>Play with the example a bit, and look at the samples to see how easy it was to set up all those form-fields. Note how all input is automatically validated, to prevent invalid values anywhere.</p>

		<form id="moneyForm">

<pre class="language-markup"><code>&lt;form id="moneyForm"&gt;</code></pre>

			<?php showHTML('<div id="rangeSlider"></div>'); ?>

			<?php showHTML('<div id="value"></div>'); ?>

			<?php showHTML('<input name="one" class="inputs">'."\r\n".'<input name="two" class="inputs">'); ?>

			<?php showHTML('<div id="someElement"></div>'); ?>

			<button>Alert form values.</button>

<pre class="language-markup"><code>&lt;/form&gt;</code></pre>

		</form>

		<?php run('slider'); ?>
		<?php run('link-lower'); ?>
		<?php run('link-upper'); ?>
		<?php run('button'); ?>
	</div>

	<div class="side">

		<div class="viewer-header">Initializing the slider</div>

		<div class="viewer-content">
			<?php code('slider'); ?>
		</div>

		<div class="viewer-header">Using libLink to link input fields to the <strong>lower</strong> handle</div>

		<div class="viewer-content">
			<?php code('link-lower'); ?>
		</div>

		<div class="viewer-header">Using libLink to link input fields to the <strong>upper</strong> handle</div>

		<div class="viewer-content">
			<?php code('link-upper'); ?>
		</div>

		<div class="viewer-header">Handling button clicks</div>

		<div class="viewer-content">
			<?php code('button'); ?>
		</div>

	</div>

</section>
