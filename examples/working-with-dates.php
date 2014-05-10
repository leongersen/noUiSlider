<?php
	$title = "noUiSlider - Example working with dates";
	$description = "";
?>

<h1>Working with dates</h1>

<?php run('ts', false); ?>
<?php run('helpers', false); ?>

<section>

	<div class="double">

		<p>As all dates in JavaScript can be represented as time, noUiSlider can handle them, too. This example will show you how to convert dates to numerical ranges, and then use the <code>serialization</code> feature to display them in a pretty format.</p>
	</div>

	<div class="double">

		<div class="example">
			<div id="daterange-slider"></div>
			<span class="example-val" id="event-start"></span>
			<span class="example-val" id="event-end"></span>
			<?php run('date', false); ?>
		</div>
	</div>
</section>

<section>

	<h2>Timestamps</h2>

	<div class="wide">
		<p>We'll be creating timestamps from strings. In order to do this easily, we'll define a new helper function. This function accepts a string, creates a <code>new Date</code> and then returns it as a timestamp.</p>
	</div>

	<?php code('ts'); ?>
</section>

<section>

	<h2>Setup</h2>

	<div class="wide">
		<p>In in overview below you'll find the code used to run this example. For readability, all <strong>helper</strong> functions have been moved into their own tab.</p>
	</div>

</section>

<div class="code-viewer">

	<header class="code-viewer-head">
		<a class="code-viewer-tab" href="#slider">Slider control</a>
		<a class="code-viewer-tab" href="#helpers">Helper functions and formatting</a>
	</header>

	<article class="code-viewer-port">

		<section class="code-viewer-content" id="slider">
			<?php code('date'); ?>
		</section>

		<section class="code-viewer-content" id="helpers">
			<p>The <code>nth</code> function was borrowed from <a onclick="return trackLink(this, 'outlink','stackoverflow nth')" href="http://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th">this StackOverflow question</a>.</p>
			<?php code('helpers'); ?>
		</section>

	</article>
</div>

<script src="/nouislider/assets/viewer.js"></script>
<script>createViewer('#slider');</script>
