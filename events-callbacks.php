<?php
	$title = "noUiSlider - Events and callbacks";
	$description = "Listen to everything that happens, and run your code when you want too. noUiSlider has a bunch of events and callbacks. Read all about them!";
?>

<h1>Events</h1>

<section>

	<div class="view-more">

		<p>noUiSlider offers several ways to listen to interaction: <code>'change'</code>, <code>'set'</code> and <code>'slide'</code>. You can use these events all at the same time.</p>

		<div class="example">

			<div id="slider-events"></div>

			<div class="logger">
				<div id="l-slide">Slide</div>
				<div id="l-set">Set</div>
				<div id="l-change">Change</div>
			</div>

			<div class="logger">
				<input id="input-log">
				<button id="setter1">.val([ 5, 15 ])</button>
			</div>

			<?php run('demo'); ?>
			<?php run('binding-events'); ?>
		</div>

		<table class="data-table events-table">
			<thead>
				<tr>
					<th>&nbsp;</th>
					<th width="90">Slide</th>
					<th width="90">Set</th>
					<th width="90">Change</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><span>A handle is <strong>released</strong> after dragging</span></td>
					<td class="no"><span>No</span></td>
					<td class="yes"><span>Yes</span></td>
					<td class="yes"><span>Yes</span></td>
				</tr>
				<tr>
					<td><span>A slider is moved by <strong>tapping</strong> it</span></td>
					<td class="yes"><span>Yes</span></td>
					<td class="yes"><span>Yes</span></td>
					<td class="yes"><span>Yes</span></td>
				</tr>
				<tr>
					<td><span>A handle moves while <strong>dragging</strong></span></td>
					<td class="yes"><span>Yes</span></td>
					<td class="no"><span>No</span></td>
					<td class="no"><span>No</span></td>
				</tr>
				<tr>
					<td><span>A linked <strong>input</strong> field changes</span></td>
					<td class="no"><span>No</span></td>
					<td class="yes"><span>Yes</span></td>
					<td class="no"><span>No</span></td>
				</tr>
				<tr>
					<td><span>The <strong><code>.val()</code></strong> method is called</span></td>
					<td class="no"><span>No</span></td>
					<td class="yes"><span>Yes</span></td>
					<td class="no"><span>No</span></td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="side">



		<div class="viewer-header">Setting up the slider and buttons</div>

		<div class="viewer-content">
			<?php code('demo'); ?>
		</div>

		<?php code('binding-events'); ?>

	</div>
</section>


<?php sect('slide'); ?>
<h2>Slide</h2>

<section>

	<div class="view">
		<p>This event is useful when you want to update a value or perform an actions every time a handle is dragged. For example, you can use the <code>'slide'</code> event to update graphs. For convenience, this function also fires on a change by 'tap'.</p>

		<p><strong>Alternative available:</strong> noUiSlider has a support for the powerful <code>libLink</code> library, which probably does everything you need <code>slide</code> for, such as displaying numbers in text labels or input fields. Additionally, it can also format the slider output. Read more about <a href="/liblink/">libLink</a>.</p>
	</div>
</section>


<?php sect('set'); ?>
<h2>Set</h2>

<section>

	<div class="view">
		<p>Whenever a slider is changed to a new value, this event is fired. This function will trigger every time a slider <em>stops</em> changing, <strong>including</strong> after calls to the <code>.val()</code> method. You can consider this 'end of slide'.</p>
	</div>

</section>


<?php sect('change'); ?>
<h2>Change</h2>

<section>

	<div class="view">
		<p>This event is great when you use the slider as 'just-another-input-type'. When your slider is part of a form, you can keep listening to the form <code>change</code> events, without using any events specific to the slider.</p>

		<p><strong>Please note:</strong> The slider does not fire the change event when an input linked by <a href="/liblink/">libLink</a> is changed. Therefore, those fields can be in the same form, without triggering a <code>change</code> event twice.</p>
	</div>
</section>


<?php sect('functions'); ?>
<h2>Passing functions as arguments</h2>

<section>

	<div class="view">

		<p>For a full documentation on binding events, have a look at the <a href="http://api.jquery.com/on/">jQuery .on()</a> documentation.</p>

		<p>In JavaScript, there are multiple ways of providing a function as an argument. In any case, the slider that triggered the event will be the scope of the function, so you can use <code>$(this)</code> to access it again.</p>

		<p>If you'd like to know more about function declarations, this <a href="http://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname">StackOverflow question</a> is a good starting point.</p>
	</div>

	<div class="side">
		<?php code('pass'); ?>
	</div>
</section>
