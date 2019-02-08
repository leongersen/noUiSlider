<?php
	$title = "noUiSlider - Options and settings";
	$description = "There are many options to make noUiSlider do exactly what you need. Read all about these options and find the one you need.";
?>

<h1>Options</h1>

<section>

	<div class="double">

		<p>noUiSlider can be configured with a wide variety of options, which can be use to customize a slider's behaviour.</p>

		<p>For options regarding the slider range, see <a href="/nouislider/slider-values/"> slider values</a>.</p>
	</div>
</section>

<section>
    <div class="notice">For a complete overview of all slider options, method and properties, see <a href="/nouislider/reference/"> reference</a>.</div>
</section>

<section>
	<ul>
		<li><a href="#section-start">Start</a></li>
		<li><a href="#section-connect">Connect</a></li>
		<li><a href="#section-margin">Margin</a></li>
		<li><a href="#section-limit">Limit</a></li>
		<li><a href="#section-padding">Padding</a></li>
		<li><a href="#section-step">Step</a></li>
		<li><a href="#section-orientation">Orientation</a></li>
		<li><a href="#section-direction">Direction</a></li>
		<li><a href="#section-tooltips">Tooltips</a></li>
		<li><a href="#section-animate">Animate</a></li>
		<li><a href="#section-keyboard-support">Keyboard Support</a></li>
		<li><a href="#section-document-element">Document Element <small>(advanced)</small></a></li>
	</ul>
</section>


<?php sect('start'); ?>
<h2>Start</h2>

<section>

	<div class="view">

		<p>The start option sets the number of handles and corresponding start positions.</p>

		<p>The start option uses the slider's <code>'format'</code> option to decode the input. Number input will be cast to string and decoded.</p>

		<div class="example">
			<div id="slider-start"></div>
			<?php run('start', false); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><em>none</em></div>

			<strong>Accepted values</strong>
			<div><code>'string'</code>,<br>
				<code>array['string']</code>,<br>
				<code>array['string', 'string', ...]</code>
			</div>
		</div>
	</div>

	<div class="side">
		<?php code('start'); ?>
	</div>

</section>


<?php sect('connect'); ?>
<h2>Connect</h2>

<section>

	<div class="view">

		<p>The connect option can be used to control the bar between the handles or the edges of the slider.</p>

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
			<div><code>number</code>,<br>
				<code>array[number]</code>,<br>
				<code>array[number, number]</code>
			</div>
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
		<p>By default, the slider slides fluently. In order to make the handles jump between intervals, you can use the step option.</p>

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

		<p>noUiSlider can provide a basic tooltip using the <code>tooltips</code> option. This option can also accept <a href="/nouislider/slider-read-write/#section-formatting">formatting options</a> to format the tooltips content. In that case, pass an <code>array</code> with a formatter for each handle, <code>true</code> to use the default or <code>false</code> to display no tooltip.</p>

        <p>Tooltips can be removed from a slider using the <code>removeTooltips()</code> method.</p>

		<div class="example overflow">
			<div id="slider-tooltips"></div>
			<?php run('tooltips'); ?>
		</div>

		<div class="options">
			<strong>Default</strong>
			<div><code>false</code></div>

			<strong>Accepted values</strong>
			<div><code>false</code>, <code>true</code>, <code>formatter</code>, <code>array[formatter or true or false, ...]</code></div>
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

		<p>The <code>animationDuration</code> option can be used to set the animation speed assumed by the slider library. In <strong>addition</strong> to this, you must <strong>manually</strong> alter the CSS <code>(-webkit-)transition</code> property for the <code>.noUi-state-tap .noUi-origin</code> selector.</p>

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


<?php sect('keyboard-support'); ?>
<h2>Keyboard Support</h2>

<section>

    <div class="view">

        <p>Handles in the slider can receive keyboard focus and be moved by arrow keys.</p>

        <p>When moved by the arrow keys on a keyboard, handles obey the <code>step</code> value for the range they are in.
            When moving in a range that has no <code>step</code> value set, handles move by 10% of the range they are in.</p>

        <p>Keyboard support can be disabled:</p>

        <div class="example overflow">
            <div id="slider-keyboard"></div>
            <?php run('keyboard-support'); ?>
        </div>

        <div class="options">
            <strong>Default</strong>
            <div><code>true</code></div>

            <strong>Accepted values</strong>
            <div><code>true</code>, <code>false</code></div>
        </div>
    </div>

    <div class="side">

        <?php code('keyboard-support'); ?>
    </div>

</section>


<?php sect('document-element'); ?>
<h2>Document Element</h2>

<section>

    <div class="view">

        <p>When moving the slider through documents, or in other advanced scenarios, the <code>documentElement</code> that events are bound to can be changed.</p>

        <p>See <a href="https://github.com/leongersen/noUiSlider/pull/821">this pull request</a> for more information.</p>

        <div class="options">
            <strong>Default</strong>
            <div>The document the slider is in</div>

            <strong>Accepted values</strong>
            <div>Any other document element</div>
        </div>
    </div>

    <div class="side">

        <?php code('document-element'); ?>
    </div>

</section>
