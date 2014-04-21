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

<section>

	<h2 id="start">Start</h2>

	<div class="wide">

		<p>The start option sets the number of handles and their start positions, relative to <code>range</code>.</p>

		<div class="example">
			<div id="slider-start"></div>
			<?php run('start', false); ?>
		</div>

		<?php code('start'); ?>
	</div>

	<div class="options">
		<strong>Option</strong>
		<div><code>start</code></div>

		<strong>Default</strong>
		<div><em>none</em></div>

		<strong>Accepted values</strong>
		<div><code>number</code>,<br>
			<code>array[number]</code>,<br>
			<code>array[number, number]</code>
		</div>
	</div>
</section>

<section>

	<h2 id="connect">Connect</h2>

	<div class="wide">

		<p>The connect setting can be used to control the bar between the handles, or the edges of the slider. Use <code>"lower"</code> to connect to the lower side, or <code>"upper"</code> to connect to the upper side. Setting <code>true</code> sets the bar between the handles.</p>

		<div class="example">
			<div id="slider-connect"></div>
			<?php run('connect', false); ?>
		</div>

		<?php code('connect'); ?>
	</div>

	<div class="options">
		<strong>Option</strong>
		<div><code>connect</code></div>

		<strong>Default</strong>
		<div><code>false</code></div>

		<strong>Accepted values</strong>
		<div><code>"lower"</code>,<br>
			<code>"upper"</code>,<br>
			<code>true</code>,<br>
			<code>false</code>
		</div>
	</div>
</section>

<section>

	<h2 id="margin">Margin</h2>

	<div class="wide">

		<p>When using two handles, the minimum distance between the handles can be set using the margin option. The margin value is relative to the value set in 'range'. This option is only available on standard linear sliders.</p>

		<div class="example">
			<div id="slider-margin"></div>
			<?php run('margin', false); ?>
		</div>

		<?php code('margin'); ?>
	</div>

	<div class="options">
		<strong>Option</strong>
		<div><code>margin</code></div>

		<strong>Default</strong>
		<div><em>none</em></div>

		<strong>Accepted values</strong>
		<div><code>number</code>
		</div>
	</div>
</section>

<section>

	<h2 id="step">Step</h2>

	<div class="wide">
		<p>By default, the slider slides fluently. In order to make the handles jump between intervals, you can use this option. The step option is relative to the values provided to <code>range</code>.</p>

		<div class="example">
			<div id="slider-step"></div>
			<?php run('step', false); ?>
		</div>

		<?php code('step'); ?>
	</div>

	<div class="options">
		<strong>Option</strong>
		<div><code>step</code></div>

		<strong>Default</strong>
		<div><em>none</em></div>

		<strong>Accepted values</strong>
		<div><code>number</code>
		</div>
	</div>
</section>

<section>

	<h2 id="orientation">Orientation</h2>

	<div class="wide">

		<p>The orientation setting can be used to set the slider to <code>"vertical"</code> or <code>"horizontal"</code></p>

		<div class="example vertical">
			<div id="slider-vertical"></div>
			<?php run('orientation', false); ?>
		</div>

		<?php code('orientation'); ?>
	</div>

	<div class="options">
		<strong>Option</strong>
		<div><code>orientation</code></div>

		<strong>Default</strong>
		<div><code>"horizontal"</code></div>

		<strong>Accepted values</strong>
		<div><code>"vertical"</code>,<br>
			<code>"horizontal"</code></div>
	</div>
</section>

<section>

	<h2 id="direction">Direction</h2>

	<div class="wide">

		<p>By default the sliders are <em>top-to-bottom</em> and <em>left-to-right</em>, but you can change this using the direction option, which decides where the upper side of the slider is.</p>

		<div class="example">
			<div id="slider-direction"></div>
			<div class="example-val" id="field"></div>
			<?php run('direction'); ?>
		</div>

		<?php code('direction'); ?>
	</div>

	<div class="options">
		<strong>Option</strong>
		<div><code>direction</code></div>

		<strong>Default</strong>
		<div><code>"ltr"</code></div>

		<strong>Accepted values</strong>
		<div><code>"ltr"</code>,<br>
			<code>"rtl"</code></div>
	</div>
</section>
