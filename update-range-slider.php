<?php
	$title = "noUiSlider - Updating slider options";
	$description = "Extending noUiSlider is simple. Lets have a look at adding an updating feature to the slider.";
?>

<h1>Updating slider options</h1>

<section>

	<div class="double">

		<p>Sometimes, you'll want to update your setup of noUiSlider after you initialized it. Maybe you've gotten new data from an Ajax request, or you want to reflect changes in other filters in the slider. In any case, you want to rebuild a slider using some of its current settings, but overwrite some others.</p>

		<p>noUiSlider offers a <code>rebuild</code> flag for this. You can use it by following your options by <code>true</code>, like so:</p>

	</div>

	<div class="double">

		<p>With this flag set, the current configuration will be extended by any new options provided. If the slider wasn't initialised yet, it will be initialised normally.</p>

		<p>When the <code>start</code> option isn't changed, the slider will set itself back to the current values. Otherwise, the slider will be set to the values provided in <code>start</code>.</p>

	</div>

	<pre><code>$('.slider').noUiSlider({ /* ... */ }, true);</code></pre>

</section>

<section>

	<h2>Example</h2>

	<div class="double">

		<p>For this example, we'll use a slider, and two buttons to change the <code>range</code> option. We'll show the value in a <code>&lt;span&gt;</code>, so you can always see the value.</p>


		<p>When a button is clicked, we'll read the data-range attribute it has, and update the slider with the new value.</p>


		<div class="example">
			<div id="update"></div>
			<span class="example-val" id="value"></span>

			<button data-range="20,50">Set range [20, 50]</button>
			<button data-range="10,40">Set range [10, 40]</button>

			<?php run('update', false); ?>
		</div>
	</div>

	<div class="double">

<pre class="language-markup"><code>&lt;div id="update"&gt;&lt;/div&gt;
&lt;span id="value"&gt;&lt;/span&gt;

&lt;button data-range="20,50"&gt;
	Set range [20, 50]
&lt;/button&gt;

&lt;button data-range="10,40"&gt;
	Set range [10, 40]
&lt;/button&gt;</code></pre>

	</div>

	<?php code('update', true); ?>

</section>
