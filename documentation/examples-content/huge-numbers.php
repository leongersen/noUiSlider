<?php sect('huge-numbers'); ?>
<h1>Using the slider with huge numbers</h1>

<section>

	<div class="view">

		<p>If you are working with arbitrarily large numbers, you should not use these directly in noUiSlider as you'll run into some JavaScript limitations. Instead, you should map your values to an array of string values.</p>

		<p>Numbers is JavaScript are "double precision floats", which can store numbers up to 2^53 <em>(9007199254740992)</em> precisely.</p>
		
		<p>For reference, see <a href="http://stackoverflow.com/questions/15529337/prevent-javascript-number-function-from-rounding-big-numbers">this StackOverflow question</a>, or <a href="https://github.com/leongersen/noUiSlider/issues/427">issue #427 filed on GitHub</a>.</p>

		<p>As an example, see the <code>'range'</code> option for a RAM selector offering 14 steps from 512MB to 8GB. The <code>'step'</code> are omitted for clarity. The values are provided as bytes.</p>
		
		<p>A better solution would be to abstract the byte values away from the slider, looking up the byte values in an array. This keeps the slider configuration simple and prevents issues with floating point precision.</p>

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
