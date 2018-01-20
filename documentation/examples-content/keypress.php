<?php sect('keypress'); ?>
<h1>Changing the slider by keypress</h1>

<section>

	<div class="view">

		<p>To keep the library small, features like keyboard interaction haven't been included. However, adding features to input fields linked to a slider is easy. noUiSlider provides API's to help you. In this example, pressing the keyboard arrow keys will increase/decrease the slider by one step.</p>

		<p>This example uses the <code>'step'</code> API to determine by how much the slider should be changed. You don't need this function if your slider is linear. In that case, increase/decrease the value with the ammount of your <code>step</code>.</p>

		<p>We'll listen to keydown on the <code>'#input-with-keypress'</code> element, and pass the event to a function so we can read the code that identifies the key.</p>

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
