<?php
	$title = "noUiSlider - Options and settings";
	$description = "There are many options to make noUiSlider do exactly what you need. Read all about these options and find the one you need.";
?>

<h1>Options</h1>

<section>

	<div class="double">

		<p>noUiSlider can be configured with a wide variety of options, which can be use to customize the slider in to doing exactly what you want. For options regarding the slider range, see <a href="/nouislider/slider-values"> slider values</a>.</p>
	</div>
</section>


<h2 id="start">Start</h2>

<section>

	<div class="view">

		<p>The start option sets the number of handles and their start positions, relative to <code>range</code>.</p>

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
				<code>array[number, number]</code>
			</div>
		</div>
	</div>

	<div class="side">
		<?php code('start'); ?>
	</div>

</section>


<h2 id="connect">Connect</h2>

<section>

	<div class="view">

		<p>The connect setting can be used to control the bar between the handles, or the edges of the slider. Use <code>"lower"</code> to connect to the lower side, or <code>"upper"</code> to connect to the upper side. Setting <code>true</code> sets the bar between the handles.</p>

		<div class="example">
			<div id="slider-connect"></div>
			<?php run('connect', false); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><code>false</code></div>

			<strong>Accepted values</strong>
			<div><code>"lower"</code>, <code>"upper"</code>, <code>true</code>, <code>false</code></div>
		</div>

	</div>

	<div class="side">
		<?php code('connect'); ?>
	</div>

</section>


<h2 id="margin">Margin</h2>

<section>

	<div class="view">

		<p>When using two handles, the minimum distance between the handles can be set using the margin option. The margin value is relative to the value set in 'range'. This option is only available on standard linear sliders.</p>

		<div class="example">
			<div id="slider-margin"></div>
			<?php run('margin', false); ?>
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
		<?php code('margin'); ?>
	</div>

</section>


<h2 id="step">Step</h2>

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


<h2 id="orientation">Orientation</h2>

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


<h2 id="direction">Direction</h2>

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


<h2 id="animate">Animate</h2>

<section>

	<div class="view">

		<p>Set the animate option to <code>false</code> to prevent the slider from animating to a new value with when calling <code>.val()</code>.</p>

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
	</div>

	<div class="side">
		<?php code('animate'); ?>
	</div>

</section>
