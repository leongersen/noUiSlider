<?php
	$title = "noUiSlider - Slider design and styling";
	$description = "noUiSlider comes with a beautiful theme. Find out everything about styling and design.";

	$title = "noUiSlider - Disabling a slider";
	$description = "Like any other form element, you can temporarily disable a slider element.";

	$title = "noUiSlider - Updating slider options";
	$description = "Extending noUiSlider is simple. Lets have a look at adding an updating feature to the slider.";
?>


<h1>More...</h1>

<?php sect('disable'); ?>
<h2>Disabling a slider</h2>

<section>

	<div class="view">

		<p>Disabling a slider is identical to disabling a checkbox or textarea; simply set the <code class="language-markup">disabled</code> attribute.</p>

		<p>A disabled slider can't be changed by sliding, click or touching, but you can still change its value using the <code>.val()</code> method. You can use CSS to show the disabled state. The default theme also sets a <code>not-allowed</code> cursor.</p>

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

	<div class="side">

		<?php code('disable-all'); ?>

		<div class="viewer-header">Toggling the <code>disabled</code> attribute</div>

		<div class="viewer-content">
			<?php code('disable'); ?>
		</div>
	</div>

</section>


<?php sect('options'); ?>
<h2>Reading options back</h2>

<section>

	<div class="view">

		<p>noUiSlider can return the options that where used to initialize a slider by passing <code>'options'</code>. Note that the returned object is indentical to the input: values are not sanitized or parsed.</p>

	</div>

	<div class="side">
		<?php code('options'); ?>
	</div>

</section>


<?php sect('update'); ?>
<h2>Updating slider options</h2>

<section>

	<div class="view">

		<p>Sometimes, you'll want to update your setup of noUiSlider after you initialized it. Maybe you've gotten new data from an Ajax request, or you want to reflect changes in other filters in the slider. In any case, you want to rebuild a slider using some of its current settings, but overwrite some others.</p>

		<p>With this flag set, the current configuration will be extended by any new options provided. If the slider wasn't initialised yet, it will be initialised normally.</p>

		<p>When the <code>start</code> option isn't changed, the slider will set itself back to the current values. Otherwise, the slider will be set to the values provided in <code>start</code>.</p>

		<p>For this example, we'll use a slider, and two buttons to change the <code>range</code> option. We'll show the value in a <code>&lt;span&gt;</code>, so you can always see the value.</p>

		<p>When a button is clicked, we'll read the data-range attribute it has, and update the slider with the new value.</p>

		<div class="example">
			<div id="slider-update"></div>
			<span class="example-val" id="slider-update-value"></span>

			<button data-range="20,50">Set range [20, 50]</button>
			<button data-range="10,40">Set range [10, 40]</button>

			<?php run('update-setup'); ?>
			<?php run('update'); ?>
		</div>
	</div>

	<div class="side">

		<p>noUiSlider offers a <code>rebuild</code> flag for this. You can use it by following your options by <code>true</code>, like so:</p>

		<pre><code>$('.slider').noUiSlider({ /* ... */ }, true);</code></pre>

		<div class="viewer-header">The HTML for this example</div>

		<div class="viewer-content">

<pre class="language-markup"><code>&lt;div id="update"&gt;&lt;/div&gt;
&lt;span id="value"&gt;&lt;/span&gt;

&lt;button data-range="20,50"&gt;
	Set range [20, 50]
&lt;/button&gt;

&lt;button data-range="10,40"&gt;
	Set range [10, 40]
&lt;/button&gt;</code></pre>

		</div>

		<div class="viewer-header">Setting up the slider</div>

		<div class="viewer-content">
			<?php code('update-setup'); ?>
		</div>

		<div class="viewer-header">Updating the slider with new options on <code>button</code> click</div>

		<div class="viewer-content">
			<?php code('update'); ?>
		</div>
	</div>

</section>


<?php sect('styling'); ?>
<h2>Styling</h2>

<section>

	<div class="view">
		<p>Styling noUiSlider is easy. The default stylesheet contains helpful comments to get a head start. I <strong>strongly</strong> recommend using the default stylesheet as a starting point when re-styling noUiSlider.</p>

		<h3>Things to watch out for</h3>

		<ul style="margin: 20px">
			<li>If you want the handles to stay within the slider bar (instead of the default overlap), have a look at the CSS detailed to the right. Add the styles to your stylesheet and give your element the <code>noUi-extended</code> class for this effect.</li>
			<li>The <code>.noUi-connect</code> and <code>.noUi-background</code> classes are applied to various elements.</a>
			<li>To position your handles on the center of its relative position, it should have a <strong>negative offset</strong> of half the handle width. See the default theme for reference.</li>
		</ul>
	</div>

	<div class="side">

		<div class="viewer-header">CSS classes overview</div>

		<div class="viewer-content">

			<table class="language-css data-table styling-table">
				<thead>
					<tr>
						<th width="250">Selector</th>
						<th>Effect</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>.noUi-target</code></td>
						<td>This class is added to the element you call <code>.noUiSlider()</code> on. Has <code>border</code>, <code>background</code> and other styling properties to establish the slider design. </td>
					</tr>
					<tr>
						<td><code>.noUi-base</code></td>
						<td>The slider bar. Serves as the calculating point for the slider handles, and has no visible styling.</td>
					</tr>
					<tr>
						<td><code>.noUi-origin</code></td>
						<td>The elements connected to the base, defining the handle locations.</td>
					</tr>
					<tr>
						<td><code>.noUi-handle</code><br><code>.noUi-handle-lower</code><br><code>.noUi-handle-upper</code></td>
						<td>The actual, visible handles. Style these any way you like! The lower and upper handles can be targeted individually.</td>
					</tr>
					<tr>
						<td><code>.noUi-connect</code></td>
						<td>Styling class for setting properties related to the slider <code>connect</code> segment.</td>
					</tr>
					<tr>
						<td><code>.noUi-background</code></td>
						<td>Styling class for setting properties related to the slider background.</td>
					</tr>
					<tr>
						<td><code>.noUi-state-tap</code></td>
						<td>This class is added when the slider bar is tapped or clicked. A slider with this call will reject any user input. noUiSlider will remove this class after 300ms, leaving that timespan to perform visual animations.</td>
					</tr>
					<tr>
						<td><code>[disabled]</code></td>
						<td>Apply this to your slider to disable it, and make sure the slider visuals reflect the disabled state.</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="viewer-header">Containing handles within the slider bar (horizontal)</div>

		<div class="viewer-content">
<pre><code><?php include 'more/horizontal-contain.css'; ?></code></pre>
		</div>

		<div class="viewer-header">Containing handles within the slider bar (vertical)</div>

		<div class="viewer-content">
<pre><code><?php include 'more/vertical-contain.css'; ?></code></pre>
		</div>
	</div>

</section>