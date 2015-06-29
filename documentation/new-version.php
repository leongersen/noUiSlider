<?php
	$title = "noUiSlider - New Version: noUiSlider 7";
	$description = "";
?>

<h1>noUiSlider 8 release information</h1>

<style>ul { list-style: disc; padding: 0 20px; }</style>

<section>

	<div class="view">

		<p>After a slower, more incremental development period for noUiSlider, it is time for a shakeup. With a lot of attention going to <a href="http://youmightnotneedjquery.com/">'You might not need jQuery'</a> and other initiatives, I felt removing the jQuery dependancy in noUiSlider would be a nice project to spend some time on.</p>

		<p>Add to that the rapid progress on the Internet Explorer front. Up to noUiSlider 7, IE7 remained supported, mainly because there was never any need to explicity break compatibility. With IE currently at version 11 and Microsoft Edge ('Project Spartan') approaching, now is as good a time as any to drop the really old versions.</p>

		<p><strong>noUiSlider 8 removes the jQuery dependancy completely.</strong></p>

		<p>Rewriting the plugin, all tests and the documentation is quite an undertaking, so I wanted to get at least the following out of it:</p>

		<ul>
			<li>The release cycle has to be easier</li>
			<li>Overall file size has to go down</li>
			<li>API's had to be simplified</li>
		</ul>

		<p>The LibLink project, which I've always liked working on, formed a problem in this port. It's API is completely rooted in jQuery's method system. Considering the number of support request for this feature, even though it is rather complex, was low, I'm going to assume it wasn't used a lot. I wanted the spirit to remain in place, so I put a lot of thought into a replacement feature. It had to be 1) simpler, 2) have a smaller footprint and 3) be more obvious to use.</p>

		<p>The solution I came up with is the new <code>update</code> event. It fires on any change in the slider value, <strong>and when it is bound</strong>. This allows synchronizing with input elements without calling the bound function manually. A feature that is missing is the automatic adding of <code>change</code> events to the inputs: I've attempted to compensate this by providing some additional examples.</p>

	</div>

</section>


<h2>What else is new?</h2>

<section>

	<ul>
		<li>Rebuilding is gone => destroy and rebuild now.</li>
		<li><code>GetOriginalOptions</code> removed</li>
		<li>Looping and iterating in the initializer have been removed.<br>
			<code>create</code> takes one node, and one node only. This saves a <em>lot</em> of code.</li>
		<li>Slider fires no native events anymore.</li>
			<ul>
				<li>No issues in change events with inputs</li>
				<li>The <code>slide</code> event now fires for both handles when using the <code>drag</code> option.</li>
				<li>Events now have the handle number as an argument.</li>
			</ul>
		<li>Submodules are no longer in the repository. Want wNumb()? Include it!</li>
		<li>The Pips feature, an optional addition in noUiSlider 7, has been merged into the core.<br>
			This allowed removing some overhead, shrinking the overall file size.</li>
		<li>Individual handles can now be disabled.</li>
		<li>Slider no longer responds to middle/right clicks.</li>
	</ul>
</section>


<h2>Version 7 to 8 migration guide</h2>

<section>

	<table>
		<tr><th>noUiSlider 7</th><th>noUiSlider 8</th></tr>

<tr><td colspan="2">Initialization</td></tr>

<tr>
	<td><pre><code>$('#slider').noUiSlider({options});</code></pre></td>
	<td><pre><code>var slider = document.getElementById('slider');
noUiSlider.create(slider, {options});</code></pre></td>
</tr>

<tr><td colspan="2">Get the slider value</td></tr>

<tr>
	<td><pre><code>var value = $('#slider').val();</code></pre></td>
	<td><pre><code>var value = slider.noUiSlider.get();</code></pre></td>
</tr>

<tr><td colspan="2">Set the slider value</td></tr>

<tr>
	<td><pre><code>$('#slider').val( 50 );</code></pre></td>
	<td><pre><code>slider.noUiSlider.set( 50 );</code></pre></td>
</tr>

<tr><td colspan="2">Add an event listener</td></tr>

<tr>
	<td><pre><code>$('#slider').on('change', function());</code></pre></td>
	<td><pre><code>slider.noUiSlider.on('change', function());</code></pre></td>
</tr>

<tr><td colspan="2">Bind to an <code>&lt;input&gt;</code> element</td></tr>

<tr>
	<td><pre><code>$('#slider').Link().to($('input'));</code></pre></td>

<td><pre><code>slider.noUiSlider.on('update', function( values, handle ) {
	input.value = values[handle];
});

input.addEventListener('change', function(){
	slider.noUiSlider.set(this.value);
});</code></pre></td>
</tr>
	</table>

</section>
