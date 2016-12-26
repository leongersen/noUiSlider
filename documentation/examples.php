<?php
	$title = "noUiSlider - Examples and hints";
	$description = "noUiSlider has a selection of examples you can use to implement a slider easily. Take a look!";
?>

<section>
	<ul>
		<li><a href="#section-colorpicker">Colorpicker</a></li>
		<li><a href="#section-html5">Working with HTML5 input types</a></li>
		<li><a href="#section-non-linear">Using non linear ranges</a></li>
		<li><a href="#section-lock">Locking two sliders together</a></li>
		<li><a href="#section-colored-connect">Colored connect elements</a></li>
		<li><a href="#section-keypress">Changing the slider value by keypress</a></li>
		<li><a href="#section-skipping">Skipping values on a slider</a></li>
		<li><a href="#section-huge-numbers">Working with huge numbers</a></li>
		<li><a href="#section-keyboard">Adding keyboard support</a></li>
		<li><a href="#section-dates">Using dates</a></li>
		<li><a href="#section-toggle">Create a toggle</a></li>
		<li><a href="#section-soft-limits">Block the edges of a slider</a></li>
	</ul>
</section>


<?php sect('colorpicker'); ?>
<h1>Colorpicker</h1>

<section>

	<div class="view">

		<p>We'll initialize all sliders with the same options, and use the <code>slide</code> callback to keep to color in sync with the slider values. This callback fires when the slider is moved by sliding, or when it is clicked or tapped.</p>

		<div id="colorpicker">
			<div class="sliders" id="red"></div>
			<div class="sliders" id="green"></div>
			<div class="sliders" id="blue"></div>

			<div id="result"></div>
			<?php run('colorpicker-setcolor'); ?>
			<?php run('colorpicker-slider'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">The HTML</div>

		<div class="viewer-content">

<pre class="language-markup"><code>&lt;div id="colorpicker"&gt;
	&lt;div class="sliders" id="red"&gt;&lt;/div&gt;
	&lt;div class="sliders" id="green"&gt;&lt;/div&gt;
	&lt;div class="sliders" id="blue"&gt;&lt;/div&gt;

	&lt;div class="result"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

		</div>

		<div class="viewer-header">The <code>setColor</code> function</div>

		<div class="viewer-content">
			<?php code('colorpicker-setcolor'); ?>
		</div>

		<div class="viewer-header">Initializing the slider</div>

		<div class="viewer-content">
			<?php code('colorpicker-slider'); ?>
		</div>

		<div class="viewer-header">CSS</div>

		<div class="viewer-content">
			<?php loadShowCSS('colorpicker'); ?>
		</div>

	</div>
</section>


<?php sect('html5'); ?>
<h1>Using HTML5 input elements</h1>

<section>

	<div class="view">
		<p>noUiSlider is perfectly fine serializing values to any element with a <code>.val()</code> method, so lets try using <code>type="number"</code> and <code>&lt;select&gt;</code>.</p>
		<p>Note that if your browser doesn't support an input type, it will just assume <code>"text"</code>. If you'd like to know more, consider reading <a href="http://html5doctor.com/html5-forms-input-types/">this article</a>.</p>

		<p>We'll append <code>&lt;option&gt;</code> elements to the <code>&lt;select&gt;</code> dynamically.</p>

		<div class="example">
			<div id="html5"></div>
			<select id="input-select"></select>
			<input type="number" min="-20" max="40" step="1" id="input-number">
			<?php run('html5-append'); ?>
			<?php run('html5-slider'); ?>
			<?php run('html5-link'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Appending <code>&lt;option&gt;</code> elements</div>

		<div class="viewer-content">
			<?php code('html5-append', true); ?>
		</div>

		<div class="viewer-header">Initializing the slider</div>

		<div class="viewer-content">
			<?php code('html5-slider'); ?>
		</div>

		<div class="viewer-header">Linking the <code>&lt;select&gt;</code> and <code>&lt;input&gt;</code></div>

		<div class="viewer-content">
			<?php code('html5-link'); ?>
		</div>

		<div class="viewer-header">Example CSS</div>

		<div class="viewer-content">
			<?php loadShowCSS('html5'); ?>
		</div>
	</div>
</section>


<?php sect('non-linear'); ?>
<h1>Non linear slider</h1>

<section>

	<div class="view">

		<p>One of noUiSlider's core features is the ability to divide the range in a non-linear fashion. Stepping can be applied, too! The example on the right shows where the handles are on the slider range in values and percentages.</p>

		<div class="example">
			<div id="nonlinear"></div>
			<span class="example-val" id="lower-value"></span>
			<span class="example-val" id="upper-value"></span>
			<?php run('nonlinear-slider'); ?>
			<?php run('nonlinear-link'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Setting up the slider</div>

		<div class="viewer-content">
			<?php code('nonlinear-slider'); ?>
		</div>

		<div class="viewer-header">Read the slider value and the left offset</div>

		<div class="viewer-content">
			<?php code('nonlinear-link'); ?>
		</div>
	</div>
</section>


<?php sect('lock'); ?>
<h1>Locking sliders together</h1>

<section>

	<div class="view">

		<p>Two cross-updating sliders can be created using a combination of the <code>change</code> and <code>slide</code> events.</p>

		<div class="example">
			<div class="slider" id="slider1"></div>
			<span class="example-val" id="slider1-span"></span>

			<div class="slider" id="slider2"></div>
			<span class="example-val" id="slider2-span"></span>

			<button id="lockbutton" style="float: right; margin: 20px 0 0;">Lock</button>

			<?php run('locked-setup'); ?>
			<?php run('locked-sliders'); ?>
			<?php run('locked-link'); ?>
			<?php run('locked-crossupdate'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Setup and button clicks</div>

		<div class="viewer-content">
			<?php code('locked-setup'); ?>
		</div>

		<div class="viewer-header">The <code>Crossupdate</code> function</div>

		<div class="viewer-content">
			<?php code('locked-crossupdate'); ?>
		</div>

		<div class="viewer-header">Initializing the sliders</div>

		<div class="viewer-content">
			<?php code('locked-sliders'); ?>
		</div>

		<div class="viewer-header">Linking the sliders together</div>

		<div class="viewer-content">
			<?php code('locked-link'); ?>
		</div>
	</div>
</section>


<?php sect('colored-connect'); ?>
<h1>Colored Connect Elements</h1>

<section>

	<div class="view">

		<p>noUiSlider's connect elements can be individually colored or otherwise styled.</p>

		<div class="example">
			<div class="slider" id="slider-color"></div>
			<?php run('colored'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('colored'); ?>
		<?php loadShowCSS('colored'); ?>
	</div>
</section>


<?php sect('keypress'); ?>
<h1>Changing the slider by keypress</h1>

<section>

	<div class="view">

		<p>To keep the library small, features like keyboard interaction haven't been included. However, adding features to input fields linked to a slider is easy. noUiSlider provides API's to help you. In this example, pressing the keyboard arrow keys will increase/decrease the slider by one step.</p>

		<p>This example uses the <code>'step'</code> API to determine by how much the slider should be changed. You don't need this function if your slider is linear. In that case, increase/decrease the value with the ammount of your <code>step</code>.</p>

		<p>We'll listen to keydown on the <code>'#input-with-keypress'</code> element, and pass the event to a function so we can read the code that identifies the key.</p>

		<p>Note that the slider value will be a <code>string</code>, so we'll need to parse it to an integer.</p>

		<div class="example">
			<div id="keypress"></div>
			<input type="text" id="input-with-keypress-1">
			<input type="text" id="input-with-keypress-0">
			<?php run('keypress-slider'); ?>
			<?php run('keypress-event'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Initializing the slider and linking the input</div>

		<div class="viewer-content">
			<?php code('keypress-slider'); ?>
		</div>

		<div class="viewer-header">Listen to <code>keypress</code> on the input</div>

		<div class="viewer-content">
			<?php code('keypress-event'); ?>
		</div>

	</div>
</section>


<?php sect('skipping'); ?>
<h1>Skipping steps</h1>

<section>

	<div class="view">
		<p>When using a stepped slider, your configuration may require that certain steps aren't available. Using the <code>snap</code> feature, this effect can be created.</p>
		<p>Notice how <code>40</code> and <code>80</code> can't be selected on the slider.</p>

		<div class="example">
			<div id="skipstep"></div>
			<span class="example-val" id="skip-value-lower"></span>
			<span class="example-val" id="skip-value-upper"></span>
			<?php run('skipstep-slider'); ?>
			<?php run('skipstep-link'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Initialize a snapping slider</div>

		<div class="viewer-content">
			<?php code('skipstep-slider'); ?>
		</div>

		<div class="viewer-header">Read the slider values</div>

		<div class="viewer-content">
			<?php code('skipstep-link'); ?>
		</div>
	</div>
</section>


<?php sect('huge-numbers'); ?>
<h1>Using the slider with huge numbers</h1>

<section>

	<div class="view">

		<p>If you are working with arbitrarily large numbers, you should <strong>not use these directly in noUiSlider</strong>, as you'll run into some JavaScript limitations. Instead, you should <strong>map</strong> your values to an <code>array</code>.</p>

		<p>Numbers is JavaScript are <a href="">Double Precision Floats</a>, which can store numbers up to 2^53 <em>(9007199254740992)</em> precisely. For reference, see <a href="http://stackoverflow.com/questions/15529337/prevent-javascript-number-function-from-rounding-big-numbers">this StackOverflow question</a>, or <a href="https://github.com/leongersen/noUiSlider/issues/427">issue #427 filed on GitHub</a>.</p>

		<p>As an example, see the <code>'range'</code> option for a RAM selector offering 14 steps from 512MB to 8GB. The <code>'step'</code> are ommited for clarity. The values are provided as bytes. A better solution would be to abstract the byte values away from the slider, looking up the byte values in an array. This keeps the slider configuration simple and prevents issues with floating point precision.</p>

		<p><em>(These values fit within the limit just fine, but demonstrate the point really well!)</em></p>

		<div class="example">
			<div id="slider-huge"></div>
			<span class="example-val" id="huge-value"></span>
			<?php run('huge-numbers-setup'); ?>
			<?php run('huge-numbers'); ?>
		</div>
	</div>

	<div class="side">

		<?php code('huge-numbers-direct'); ?>

		<div class="viewer-header">Setup</div>

		<div class="viewer-content">
			<?php code('huge-numbers-setup'); ?>
		</div>

		<?php code('huge-numbers'); ?>

	</div>
</section>


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


<?php sect('dates'); ?>
<h1>Working with dates</h1>

<section>

	<div class="view">

		<p>As all dates in JavaScript can be represented as time, noUiSlider can handle them, too. This example will show you how to convert dates to numerical ranges, and then use the <code>update</code> event to display them in a pretty format.</p>

		<p>We'll be creating timestamps from strings. In order to do this easily, we'll define a new helper function. This function accepts a string, creates a <code>new Date</code> and then returns it as a timestamp.</p>

		<p>In in overview below you'll find the code used to run this example. For readability, all <strong>helper</strong> functions have been moved into their own tab.</p>

		<div class="example">
			<div id="slider-date"></div>
			<span class="example-val" id="event-start"></span>
			<span class="example-val" id="event-end"></span>
			<?php run('date-timestamp'); ?>
			<?php run('date-helpers'); ?>
			<?php run('date-setup'); ?>
			<?php run('date-link'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Timestamps</div>

		<div class="viewer-content">
			<?php code('date-timestamp'); ?>
		</div>

		<div class="viewer-header">Setup</div>

		<div class="viewer-content">
			<?php code('date-setup'); ?>
		</div>

		<div class="viewer-header">Slider control</div>

		<div class="viewer-content">
			<?php code('date-link'); ?>
		</div>

		<div class="viewer-header">Helper functions and formatting</div>

		<div class="viewer-content">
			<p>The <code>nth</code> function was borrowed from <a onclick="return trackLink(this, 'outlink','stackoverflow nth')" href="http://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th">this StackOverflow question</a>.</p>
			<?php code('date-helpers'); ?>
		</div>
	</div>
</section>


<?php sect('toggle'); ?>
<h1>Creating a toggle</h1>

<section>

	<div class="view">

		<p>Many application interfaces have options that can be turned on or off using switches. noUiSlider is well suited for this, especially because of the wide touch support.</p>

		<p>The <code>update</code> event can be used to keep track of changes to the handle. We'll set the range to <code>[0, 1]</code>, which leaves one step of <code>1</code>.</p>

		<div class="example vertical">
			<div id="slider-toggle"></div>
			<?php run('toggle'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Toggle</div>

		<div class="viewer-content">
			<?php code('toggle'); ?>
		</div>

		<div class="viewer-header">CSS</div>

		<div class="viewer-content">
			<?php loadShowCSS('toggle'); ?>
		</div>

	</div>
</section>


<?php sect('soft-limits'); ?>
<h1>Soft limits</h1>

<section>

	<div class="view">

		<p>If you want to disable the edges of a slider, the set event can be used to reset the value if a limit is passed. Note how the handle 'bounces back' when it is released below <code>20</code> or above <code>80</code>. noUiSlider also supports disabling edges altogether, which can be done using the <a href="/nouislider/slider-options/#section-padding">padding option</a>.</p>

		<div class="example">
			<div id="soft"></div>
			<?php run('slider-soft-setup'); ?>
			<?php run('slider-soft'); ?>
		</div>
	</div>

	<div class="side">

		<div class="viewer-header">Setting up the slider</div>

		<div class="viewer-content">
			<?php code('slider-soft-setup'); ?>
		</div>

		<div class="viewer-header">Resetting using the <code>change</code> event</div>

		<div class="viewer-content">
			<?php code('slider-soft'); ?>
		</div>
	</div>
</section>
