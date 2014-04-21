<?php
	$title = "noUiSlider - Range slider toggle";
	$description = "An example showing how to use noUiSlider as a two-way switch.";
?>
<style>
	.noUi-target.toggle {
		height: 50px !important;
	}
	.noUi-target.toggle.off .noUi-handle {
		border-color: red;
	}
</style>

<h1>Creating a toggle</h1>

<section>

	<div class="double">

		<p>Many application interfaces have options that can be turned on or off using switches. noUiSlider is well suited for this, especially because of the wide touch support.</p>

		<p>The serialization option can be used to keep track of changes to the handle. We'll set the range to <code>[0, 1]</code>, which leaves on step of <code>1</code>.</p>
	</div>

	<div class="double">

		<div class="example vertical">
			<div id="toggle"></div>
			<?php run('toggle', false); ?>
		</div>
	</div>
</section>

<section>

	<h2>Javascript</h2>

	<?php code('toggle'); ?>
</section>

<section>

	<h2>CSS</h2>

	<p>The CSS for this example is simple:</p>

<pre><code class="language-css">.toggle {
	height: 50px;
}
.toggle.off .noUi-handle {
	border-color: red;
}
</code></pre>

</section>