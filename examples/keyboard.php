<?php
	$title = "noUiSlider - Using noUiSlider with keypress events";
	$description = "Adding features like keypress handling to noUiSlider is really easy. This example will give you some idea how to handle this.";
?>

<h1>Changing the slider by keypress</h1>

<section>

	<div class="double">

		<p>Adding custom features to the input fields is easy. The plugin doesn't provide a million-and-one options, because the one you'll want will be the one that isn't there. In this example, I've bound some <code>keydown</code> event handling to the input element. Try pressing your arrow keys while focussed on the input element.</p>

		<p>Most methods in jQuery can be chained, so we can call some functions on the <code>$('#input-with-keypress')</code> element before using it. We'll listen to keydown, and pass the event to a function so we can read the code that identifies the key.</p>

		<p>Note that the slider value will be a <code>string</code>, so we'll need to parse it to an integer.</p>
	</div>

	<div class="double">

		<div class="example">
			<div id="keypress"></div>
			<input type="text" id="input-with-keypress">
			<?php run('keypress', false); ?>
		</div>
	</div>
</section>

<?php code('keypress'); ?>
