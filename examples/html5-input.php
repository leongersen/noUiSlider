<?php
	$title = "noUiSlider - Using the new HTML5 input types";
	$description = "Use the serialization option to write to any input element. This example will give you an idea how.";
?>

<h1>Using HTML5 input elements</h1>

<section>

	<div class="double">
		<p>noUiSlider is perfectly fine serializing values to any element with a <code>.val()</code> method, so lets try using <code>type="number"</code> and <code>&lt;select&gt;</code>.</p>
		<p>Note that if your browser doesn't support an input type, it will just assume <code>"text"</code>. If you'd like to know more, consider reading <a href="http://html5doctor.com/html5-forms-input-types/">this article</a>.</p>
	</div>

	<div class="double">

		<div class="example">
			<div id="html5"></div>
			<select id="input-select"></select>
			<input type="number" min="-20" max="40" step="1" id="input-number">
			<?php run('append'); ?>
		</div>
	</div>
</section>

<section>

	<p>We'll append <code>&lt;option&gt;</code> elements to the <code>&lt;select&gt;</code> dynamically.</p>
	<?php code('append'); ?>

</section>

<?php run('html5', false); ?>
<?php code('html5'); ?>

<style>

#input-select,
#input-number {
	padding: 7px;
	margin: 15px 5px 5px;
	width: 70px;
}
#input-types {
	width: 300px;
	margin: 0 auto;
	text-align: center;
}

</style>
