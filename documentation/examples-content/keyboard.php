<?php sect('keyboard'); ?>
<h1>Adding keyboard support</h1>

<section>

	<div class="view">

		<p>Much like the keypress example, handles can be made keyboard-focusable.</p>

		<div class="example">
			<input placeholder="Hit tab to focus on the handle." style="width: 100%">
			<div id="keyboard"></div>
			<?php run('keyboard-slider'); ?>
			<?php run('keyboard'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Initializing the slider</div>

		<div class="viewer-content">
			<?php code('keyboard-slider'); ?>
		</div>

		<div class="viewer-header">Listen to <code>keypress</code> on the handle</div>

		<div class="viewer-content">
			<?php code('keyboard'); ?>
		</div>

		<div class="viewer-header">CSS</div>

		<div class="viewer-content">
			<?php loadShowCSS('keyboard'); ?>
		</div>

	</div>
</section>
