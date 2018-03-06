<?php sect('dates'); ?>
<h1>Working with dates</h1>

<section>

	<div class="view">

		<p>This example shows how to convert dates to numerical ranges, and then use the <code>update</code> event to display them in a pretty format.</p>

		<p>We'll be creating timestamps from strings. In order to do this easily, we'll define a new helper function. This function accepts a string, creates a <code>new Date</code> and then returns it as a timestamp.</p>

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
