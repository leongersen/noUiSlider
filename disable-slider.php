<?php
	$title = "noUiSlider - Disabling a slider";
	$description = "Like any other form element, you can temporarily disable a slider element.";
?>

<h1>Disabling a slider</h1>

<section>

	<div class="double">

		<p>Disabling a slider is identical to disabling a checkbox or textarea; simply set the <code class="language-markup">disabled</code> attribute.</p>

	</div>

	<?php code('disable-all'); ?>

</section>

<section>
	<div class="double">

		<p>A disabled slider can't be changed by sliding, click or touching, but you can still change its value using the <code>.val()</code> method. You can use CSS to show the disabled state. The default theme also sets a <code>not-allowed</code> cursor.</p>

	</div>

	<div class="double">

		<p>The slider below is disabled when the checkbox gets checked, and re-enabled when it is unchecked.</p>

		<div class="example">
			<div id="disable"></div>
			<label>
				<input type="checkbox" id="checkbox">
				Disable this slider
			</label>
			<?php run('disable', false); ?>
		</div>
	</div>

	<?php code('disable'); ?>

</section>
