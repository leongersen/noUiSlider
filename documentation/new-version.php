<?php
	$title = "noUiSlider - New Version: noUiSlider 7";
	$description = "";
?>

<h1>Version 7</h1>

<h2>New version</h2>

<section>

	<div class="view">

		<p>noUiSlider has been updated to version 7! This version adds optional libLink and wNumb support, resulting in a smaller base file. While the serialization API has changed, the concept is still the same, and porting your code should be straightforward. If you require help with any specifics, feel free to <a href="mailto:leon.gersen+public@gmail.com">email me</a>. If you do, consider providing a <a href="http://jsfiddle.net/">jsFiddle</a> demonstrating your problem.</p>

		<ul style="list-style:disc;padding:0 20px;">
			<li>Removed .val() modifiers
				<ul style="list-style:disc;padding:0 20px;">
				<li>removed 'update': libLink can work without this hint</li>
				<li>removed 'animate': value setting is now animated by default</li>
				<li>removed 'set': set callback now always fires on value setting</li>
				<li>removed 'link': libLink support value encoding/decoding. Input must now match slider encoding.</li>
				</ul>
			</li>
			<li>Improved performance by reducing browser paints</li>
			<li>Added 'animate' option to disable animation on value setting</li>
			<li>Animated setting is now default.</li>
			<li>Removed serialization</li>
			<li>Added support for libLink</li>
			<li>Added support for wNumb</li>
			<li>Removed 'extend' behaviour</li>
			<li>Added painting sliders in new layers for performance improvement</li>
			<li>Added generation of legend</li>
			<li>Complete documentation overhaul</li>
			<li>Better testing with more structure</li>
		</ul>
	</div>

</section>
