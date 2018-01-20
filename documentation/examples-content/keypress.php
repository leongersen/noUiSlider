<?php sect('keypress'); ?>
<h1>Changing the slider by key press</h1>

<section>

	<div class="view">

		<p>noUiSlider provides a <code>steps</code> API to determine the previous and next steps for a handle. In this example, pressing the keyboard arrow keys will increase/decrease the slider by one step.</p>

		<p>Use of this API is not necessary for linear sliders, as the step is constant in that case.</p>

		<p>We'll listen to keydown on the input element, and pass the event to a function so we can read the code that identifies the key.</p>

		<p>Note that the slider value will be a <code>string</code>, so we'll need to parse it to an integer.</p>

		<div class="example">
			<div id="keypress"></div>
			<input type="text" id="input-with-keypress-1">
			<input type="text" id="input-with-keypress-0">
			<?php run('keypress-slider'); ?>
			<?php run('keypress-event'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Initializing the slider and linking the input</div>

		<div class="viewer-content">
			<?php code('keypress-slider'); ?>
		</div>

		<div class="viewer-header">Listen to <code>keypress</code> on the input</div>

		<div class="viewer-content">
			<?php code('keypress-event'); ?>
		</div>

	</div>
</section>
