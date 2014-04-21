<?php
	$title = "noUiSlider - Automated value synchronisation";
	$description = "Serialization uses an object oriented approach. Simply provide a list of Link elements.";
?>

<h1>The Link element</h1>

<section>

	<div class="double">

		<p>The Link element is a wrapper that contains all serialization options in noUiSlider. It allows specification of various elements and methods so that you can write slider values to any element you want, in any format.</p>
	</div>

	<div class="double">

		<p>The constructor for the Link element takes three arguments:</p>

		<ul>
			<li><code>Target</code>: The thing to write the value to.</li>
			<li><code>Method</code>: The method or function to use.</li>
			<li><code>Format</code>: An object containing number formatting options. See <a href="/nouislider/number-formatting">number formatting</a> for more information.</li>
		</ul>
	</div>
</section>

<section>

	<h2>Use a jQuery object</h2>

	<div class="wide">

		<h3>Write to an input</h3>

		<p>When the jQuery object is an <code>input</code>, <code>select</code> or <code>textarea</code> element, the <code>method</code> defaults to <code>'val'</code>. The provided element will also listen to <code>change</code> events, and update the slider with the new value.</p>

		<p>If the provided element has another type, the default is method is <code>'html'</code>.</p>

		<div class="example">
			<input id="salary">
			<div id="salary-slider"></div>
			<?php run('object'); ?>
		</div>

		<?php code('object'); ?>
	</div>

	<div class="options">

		<strong>Target</strong>
		<div><code>$object</code></div>

		<strong>Method</strong>
		<div><code>-</code></div>
	</div>
</section>

<section>

	<div class="wide">

		<h3>Using a jQuery method</h3>

		<p>A jQuery object and the name of a jQuery method to be called. For example, set <code>'text'</code> to use jQuery's <code>.text()</code> function to write to the provided object.</p>

		<div class="example">
			<div id="slider-object-string"></div>
			<div class="example-val" id="textlocation"></div>
			<?php run('object-string'); ?>
		</div>

		<?php code('object-string'); ?>
	</div>

	<div class="options">

		<strong>Target</strong>
		<div><code>$object</code></div>

		<strong>Method</strong>
		<div><code>"string"</code></div>
	</div>
</section>

<section>

	<div class="wide">

		<h3>Use a custom function</h3>

		<p>A jQuery object and a function to be called. The function has the <code>target</code> element as scope (<code>$(this)</code>), and receives the formatted slider value as argument.</p>

		<div class="example">
			<div id="function-object"></div>
			<div class="example-val" id="showvalue"></div>
			<?php run('object-function'); ?>
		</div>

		<?php code('object-function'); ?>
	</div>

	<div class="options">

		<strong>Target</strong>
		<div><code>$object</code></div>

		<strong>Method</strong>
		<div><code>function</code></div>
	</div>
</section>

<section>

	<h2>Call a custom function</h2>

	<div class="wide">

		<p>A function to be called. This function has the slider as scope (<code>$(this)</code>), and receives the formatted slider value as argument.</p>

		<div class="example">
			<div id="slider-function"></div>
			<?php run('function'); ?>
		</div>

		<?php code('function'); ?>
	</div>

	<div class="options">

		<strong>Target</strong>
		<div><code>function</code></div>

		<strong>Method</strong>
		<div><code>-</code></div>
	</div>
</section>

<section>

	<h2>Named input elements</h2>

	<div class="wide">

		<p>You can set noUiSlider to create an hidden input, which gets the <code>target</code> value as name. When noUiSlider is used in a form, this allows for easy form serialization.</p>

		<div class="example">
			<pre><code class="language-markup">&lt;form id="example"&gt;</code></pre>
			<form id="example">
				<div id="slider-string"></div>
			</form>
			<pre><code class="language-markup">&lt;/form&gt;</code></pre>
			<button id="alertform">alert( $("#example").serialize() );</button>
			<?php run('string'); ?>
		</div>

		<?php code('string'); ?>
	</div>

	<div class="options">

		<strong>Target</strong>
		<div><code>"string"</code></div>

		<strong>Method</strong>
		<div><code>-</code></div>
	</div>
</section>
