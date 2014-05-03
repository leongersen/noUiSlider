<?php
	$title = "noUiSlider - Skipping steps";
	$description = "";
?>

<h1>Skipping steps</h1>

<section>

	<div class="double">
		<p>When using a stepped slider, your configuration may require that certain steps aren't available. Using the <code>snap</code> feature, this effect can be created.</p>
		<p>Notice how <code>40</code> and <code>80</code> can't be selected on the slider.</p>
	</div>
	
	<div class="double">

		<div class="example">
			<div id="skipstep"></div>
			<span class="example-val" id="skipval1"></span>
			<span class="example-val" id="skipval2"></span>
			<?php run('skipstep'); ?>
		</div>
	</div>
</section>

<?php code('skipstep'); ?>
