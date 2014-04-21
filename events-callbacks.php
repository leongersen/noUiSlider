<?php
	$title = "noUiSlider - Events and callbacks";
	$description = "Listen to everything that happens, and run your code when you want too. noUiSlider has a bunch of events and callbacks. Read all about them!";
?>

<h1>Events</h1>

<section>

	<div class="double">

		<p>noUiSlider offers several ways to listen to interaction: <code>'change'</code>, <code>'set'</code> and <code>'slide'</code>. You can use these events all at the same time.</p>
	</div>

	<div class="double">

		<div class="example">

			<div id="eventslider"></div>
			<div class="logger">
				<div id="l-slide">Slide</div>
				<div id="l-set">Set</div>
				<div id="l-change">Change</div>
			</div>

			<div class="logger">
				<button id="setter1">.val([ 5, 15 ])</button>
				<button id="setter2">.val([ 5, 15 ], true)</button>
			</div>

			<?php run('demo', false); ?>
		</div>
	</div>
</section>

<section>

	<h2>Overview</h2>

	<table class="events-table">
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
				<td><span>A linked <strong>serialization</strong> field changes</span></td>
				<td class="no"><span>No</span></td>
				<td class="yes"><span>Yes</span></td>
				<td class="no"><span>No</span></td>
			</tr>
			<tr>
				<td><span>The <strong><code>.val()</code></strong> method is called</span></td>
				<td class="no"><span>No</span></td>
				<td class="maybe"><span>Yes/No</span></td>
				<td class="no"><span>No</span></td>
			</tr>
		</tbody>
	</table>
</section>

<section>

	<h2>Usage</h2>

	<div class="double">
		 <p>For a full documentation on binding events, have a look at the <a href="http://api.jquery.com/on/">jQuery .on()</a> documentation.</p>
	</div>
	
	<?php code('bind'); ?>
</section>

<section>

	<h2 id="slide">Slide</h2>

	<div class="lonely">
		<p>This event is useful when you want to update a value or perform an actions every time a handle is dragged. For example, you can use the <code>'slide'</code> event to update graphs. For convenience, this function also fires on a change by 'tap'.</p>
	</div>

	<div class="notification">
		<p><strong>Alternative available.</strong> noUiSlider has a powerful <code>serialization</code> feature, which probably does everything you need <code>slide</code> for, such as displaying numbers in text labels or input fields. Additionally, it can also format the slider output. Read more about <a href="/nouislider/serialization">serialization</a>.</p>
	</div>
</section>

<section>

	<h2 id="set">Set</h2>

	<div class="lonely">
		<p>Whenever a slider is changed to a new value, this event is fired. This function will trigger every time a slider <em>stops</em> changing, optionally even on calls to the <code>.val()</code> method. Because this creates the hazard of an infinite loop, any <code>.val()</code> call will have to explicitly request this event. You can consider this 'end of slide'.</p>
	</div>

	<?php code('set'); ?>
</section>

<section>

	<h2 id="change">Change</h2>

	<div class="lonely">
		<p>This event is great when you use the slider as 'just-another-input-type'. When your slider is part of a form, you can keep listening to the form <code>change</code> events, without using any events specific to the slider.</p>
	</div>

	<div class="notification alert">
		<p><strong>Please note:</strong> The slider does not fire the change event when an input linked in the <a href="/nouislider/serialization">serialization options</a> is changed, so those fields can be in the same form, without triggering a <code>change</code> event twice.</p>
	</div>
</section>

<section>

	<h2>Passing functions as arguments</h2>

	<div class="lonely">

		<p>In JavaScript, there are multiple ways of providing a function as an argument. In any case, the slider that triggered the event will be the scope of the function, so you can use <code>$(this)</code> to access it again.</p>

		<p>If you'd like to know more about function declarations, this <a href="http://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname">StackOverflow question</a> is a good starting point.</p>
	</div>

	<?php code('pass'); ?>
</section>
