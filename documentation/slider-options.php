<?php
	$title = "noUiSlider - Options and settings";
	$description = "There are many options to make noUiSlider do exactly what you need. Read all about these options and find the one you need.";
?>

<h1>Options</h1>

<section>

	<div class="double">

		<p>noUiSlider can be configured with a wide variety of options, which can be use to customize the slider in to doing exactly what you want. For options regarding the slider range, see <a href="/nouislider/slider-values/"> slider values</a>.</p>
	</div>
</section>


<?php sect('start'); ?>
<h2>Start</h2>

<section>

	<div class="view">

		<p>The start option sets the number of handles and corresponding start positions, relative to <code>range</code>.</p>

		<div class="example">
			<div id="slider-start"></div>
			<?php run('start', false); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><em>none</em></div>

			<strong>Accepted values</strong>
			<div><code>number</code>,<br>
				<code>array[number]</code>,<br>
				<code>array[number, number, ...]</code>
			</div>
		</div>
	</div>

	<div class="side">
		<?php code('start'); ?>
	</div>

</section>


<?php sect('Connect'); ?>
<h2>Connect</h2>

<section>

	<div class="view">

		<p>The connect setting can be used to control the (green) bar between the handles, or the edges of the slider.</p>

		<p>Pass an <code>array</code> with a <code>boolean</code> for every connecting element, including the edges of the slider. The length of this array must match the handle count + 1.</p>

		<p>Setting <code>true</code> sets the bars between the handles, but not between the handles and the sliders edges.</p>

		<div class="example">
			<div id="slider-connect"></div>
			<?php run('connect', false); ?>
		</div>

		<div class="example">
			<div id="slider-connect2"></div>
			<?php run('connect-more', false); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><code>false</code></div>

			<strong>Accepted values</strong>
			<div>
				<code>true</code>,<br>
				<code>false</code>,<br>
				<code>array[...]</code>
			</div>
		</div>

	</div>

	<div class="side">
		<?php code('connect'); ?>
		<?php code('connect-more'); ?>
	</div>

</section>


<?php sect('margin'); ?>
<h2>Margin</h2>

<section>

	<div class="view">

		<p>When using two handles, the minimum distance between the handles can be set using the margin option. The margin value is relative to the value set in 'range'. This option is only available on linear sliders.</p>

		<div class="example">
			<div id="slider-margin"></div>
			<span class="example-val" id="slider-margin-value-min"></span>
			<span class="example-val" id="slider-margin-value-max"></span>
			<?php run('margin'); ?>
			<?php run('margin-link'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><em>none</em></div>

			<strong>Accepted values</strong>
			<div><code>number</code></div>
		</div>
	</div>

	<div class="side">
		<?php code('margin'); ?>

		<div class="viewer-header">Show the slider value</div>

		<div class="viewer-content">
			<?php code('margin-link'); ?>
		</div>
	</div>

</section>


<?php sect('limit'); ?>
<h2>Limit</h2>

<section>

	<div class="view">

		<p>The limit option is the oposite of the margin option, limiting the maximum distance between two handles. As with the margin option, the limit option can only be used on linear sliders.</p>

		<div class="example">
			<div id="slider-limit"></div>
			<span class="example-val" id="slider-limit-value-min"></span>
			<span class="example-val" id="slider-limit-value-max"></span>
			<?php run('limit'); ?>
			<?php run('limit-link'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><em>none</em></div>

			<strong>Accepted values</strong>
			<div><code>number</code>
			</div>
		</div>
	</div>

	<div class="side">
		<?php code('limit'); ?>

		<div class="viewer-header">Show the slider value</div>

		<div class="viewer-content">
			<?php code('limit-link'); ?>
		</div>
	</div>

</section>

<?php sect('padding'); ?>
<h2>Padding</h2>

<section>

	<div class="view">

		<p>Padding limits how close to the slider edges handles can be.</p>

		<div class="example">
			<div id="slider-padding"></div>
			<span class="example-val" id="slider-padding-value-min"></span>
			<span class="example-val" id="slider-padding-value-max"></span>
			<?php run('padding'); ?>
			<?php run('padding-link'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><em>0</em></div>

			<strong>Accepted values</strong>
			<div><code>number</code></div>
		</div>
	</div>

	<div class="side">
		<?php code('padding'); ?>

		<div class="viewer-header">Show the slider value</div>

		<div class="viewer-content">
			<?php code('padding-link'); ?>
		</div>
	</div>

</section>



<?php sect('step'); ?>
<h2>Step</h2>

<section>

	<div class="view">
		<p>By default, the slider slides fluently. In order to make the handles jump between intervals, you can use this option. The step option is relative to the values provided to <code>range</code>.</p>

		<div class="example">
			<div id="slider-step"></div>
			<?php run('step', false); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><em>none</em></div>

			<strong>Accepted values</strong>
			<div><code>number</code>
			</div>
		</div>
	</div>

	<div class="side">
		<?php code('step'); ?>
	</div>

</section>


<?php sect('orientation'); ?>
<h2>Orientation</h2>

<section>

	<div class="view">

		<p>The orientation setting can be used to set the slider to <code>"vertical"</code> or <code>"horizontal"</code>.</p>

		<p><strong>Set dimensions!</strong> Vertical sliders don't assume a default <code>height</code>, so you'll need to set one. You can use any unit you want, including <code>%</code> or <code>px</code>.</p>

		<div class="example vertical">
			<div id="slider-vertical"></div>
			<?php run('orientation'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><code>"horizontal"</code></div>

			<strong>Accepted values</strong>
			<div><code>"vertical"</code>, <code>"horizontal"</code></div>
		</div>
	</div>

	<div class="side">
		<?php code('orientation'); ?>
	</div>

</section>


<?php sect('direction'); ?>
<h2>Direction</h2>

<section>

	<div class="view">

		<p>By default the sliders are <em>top-to-bottom</em> and <em>left-to-right</em>, but you can change this using the direction option, which decides where the upper side of the slider is.</p>

		<div class="example">
			<div id="slider-direction"></div>
			<div class="example-val" id="field"></div>
			<?php run('direction'); ?>
			<?php run('direction-link'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><code>"ltr"</code></div>

			<strong>Accepted values</strong>
			<div><code>"ltr"</code>, <code>"rtl"</code></div>
		</div>
	</div>

	<div class="side">

		<?php code('direction'); ?>

		<div class="viewer-header">Show the slider value</div>

		<div class="viewer-content">
			<?php code('direction-link'); ?>
		</div>
	</div>

</section>


<?php sect('tooltips'); ?>
<h2>Tooltips</h2>

<section>

	<div class="view">

		<p>noUiSlider can provide a basic tooltip without using its events system. Set the <code>tooltips</code> option to <code>true</code> to enable. This option can also accept <a href="/nouislider/slider-read-write/#section-formatting">formatting options</a> to format the tooltips content. In that case, pass an <code>array</code> with a formatter for each handle, <code>true</code> to use the default or <code>false</code> to display no tooltip.</p>

		<div class="example overflow">
			<div id="slider-tooltips"></div>
			<?php run('tooltips'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><code>false</code></div>

			<strong>Accepted values</strong>
			<div><code>false</code>, <code>true</code>, <code><em>formatter</em></code>, <code>array[<em>formatter</em> or false]</code></div>
		</div>
	</div>

	<div class="side">

		<?php code('tooltips'); ?>
	</div>

</section>


<?php sect('animate'); ?>
<h2>Animate</h2>

<section>

	<div class="view">

		<p>Set the animate option to <code>false</code> to prevent the slider from animating to a new value with when calling <code>.set()</code>.</p>

		<div class="example" style="margin: 0; padding-bottom: 20px">
			<div class="sliders" id="slider-animate-true"></div>
			<button id="set-sliders">Set sliders</button>
		</div>

		<div class="example" style="margin: 0;">
			<div class="sliders" id="slider-animate-false"></div>
			<?php run('animate'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><code>true</code></div>

			<strong>Accepted values</strong>
			<div><code>true</code>, <code>false</code></div>
		</div>

		<br>

		<p>The <code>animationDuration</code> option can be used to set the animation speed assumed by the slider library. In <strong>addition</strong> to this, you must <strong>manually</strong> set the CSS <code>(-webkit-)transition</code> property for the <code>.noUi-state-tap .noUi-origin</code> selector.</p>

		<div class="options">
			<strong>Default</strong>
			<div><code>300</code></div>

			<strong>Accepted values</strong>
			<div><code>number</code></div>
		</div>
	</div>

	<div class="side">
		<?php code('animate'); ?>
	</div>

</section>


<?php sect('multitouch'); ?>

<h2>Multitouch</h2>

<section>
	<div class="view">
		<p>Set the multitouch option to <code>true</code> to allow simultaneous interaction with a slider and other content on the page (e.g. another slider). It is even possible to simultaneously control several handles of the same slider.</p>

		<div class="example" style="margin: 0;">
			<div class="sliders" id="slider-multitouch-1" style="margin-bottom: 20px"></div>
			<div class="sliders" id="slider-multitouch-2" style="margin-bottom: 20px"></div>
			<div class="sliders" id="slider-multitouch-3"></div>
			<?php run('multitouch'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><code>false</code></div>

			<strong>Accepted values</strong>
			<div><code>true</code>, <code>false</code></div>
		</div>

	</div>

	<div class="side">
		<?php code('multitouch'); ?>
	</div>
</section>
