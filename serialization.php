<?php
	$title = "noUiSlider - Serialization";
	$description = "noUiSlider is designed to function exactly like any other form element. Some detailed options are available, to make any form amazing!";
?>

<h1>Serialization</h1>

<section>

	<h2>The concept</h2>

	<div class="double">

		<p>Serialization is one of the most powerful features in noUiSlider. It defines the interaction the slider has with your page, and allows you to write the slider values to and from input fields or any other element.</p>

		<p>When using the serialization feature, the slider output can be <strong>formatted</strong>, while all user input is automatically <strong>validated</strong>.</p>
	</div>

	<div class="double">

		<p>A basic example: try typing in the input field.</p>

		<div class="example">
			<div id="serialization"></div>
			<input id="field">
			<?php run('serialization', false); ?>
		</div>
	</div>
</section>

<section>

	<h2>Usage</h2>

	<div class="lonely">
		<p>noUiSlider has some powerful <a href="/nouislider/number-formatting" class="strong-link">Number Formatting</a>. Formatting options can be set for an entire slider, or for multiple individual Links. <a href="/nouislider/link-element" class="strong-link">Link Elements</a> are used by the serialization feature.</p>
	</div>

	<?php code('serialization'); ?>
</section>

<section>

	<h2>Feature overview</h2>

	<div class="double">
		<p>Play with the example a bit, and look at the samples to see how easy it was to set up all those form-fields. Note how all input is automatically validated, to prevent invalid values anywhere.</p>
	</div>
</section>

<div class="code-viewer">

	<header class="code-viewer-head">
		<a class="code-viewer-tab active" href="#output">Output</a>
		<a class="code-viewer-tab" href="#css">CSS</a>
		<a class="code-viewer-tab" href="#javascript">JavaScript</a>
		<a class="code-viewer-tab" href="#html">HTML</a>
	</header>

	<article class="code-viewer-port">

		<section class="code-viewer-content" id="output">

			<?php $encodeHTML = false; ?>
			<?php include 'serialization/code-html.php'; ?>

		</section>

		<section class="code-viewer-content" id="css">
			<link href="/nouislider/pages/serialization/code-css.css" rel="stylesheet">
			<pre class="language-css"><code><?php include 'serialization/code-css.css' ?></code></pre>
		</section>

		<section class="code-viewer-content" id="javascript">
			<?php run('code-js', false); ?>
			<?php code('code-js'); ?>
		</section>

		<section class="code-viewer-content" id="html">
			<?php

				$encodeHTML = true;

				ob_start();
				include 'serialization/code-html.php';
				$content = ob_get_contents();
				ob_end_clean();

			?>
			<pre class="language-markup"><code><?php echo htmlentities($content); ?></code></pre>
		</section>

	</article>
</div>

<script src="/nouislider/assets/viewer.js"></script>
<script>createViewer('#output');</script>
