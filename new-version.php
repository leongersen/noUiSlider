<?php
	$title = "noUiSlider - New Version: noUiSlider 6";
	$description = "";
?>

<h1>Version 6</h1>

<section>

	<h2>New version</h2>

	<div class="double">

		<p>noUiSlider has been updated to version 6! This version fixes overhauls the serialization system and adds non-linear slider behaviour.</p>

		<p>Version 6 also improves general performance, and, when used with Zepto, no longer requires the data module.</p>
	</div>

	<div class="double">

		<p>All changes should be relatively easy to patch into your current implementation. If you require help with any specifics, feel free to <a href="mailto:leon.gersen+public@gmail.com">email me</a>. If you do, consider providing a <a href="http://jsfiddle.net/">jsFiddle</a> demonstrating your problem.</p>
	</div>
</section>

<section>

	<h2>Upgrading</h2>

	<div class="double">

		<p>noUiSlider 6 <strong>breaks compatibility</strong> with noUiSlider 5. Several options have been altered or removed.</p>

		<p>1) The handles option has been removed. Use the <a href="/nouislider/slider-values">start option</a> to set the number of handles.</p>

		<p>2) All callbacks have been removed. You can now use jQuery's <code>.on()</code> and <code>.off()</code> to bind and unbind events at will. See <a href="/nouislider/events-callbacks">the events documentation</a> for more information.</p>
	</div>

	<div class="double">

		<p>3) All formatting options have been merged into their own object. Several other options have been added too. See <a href="/nouislider/number-formatting">number formatting</a> for a complete documentation.</p>

		<p>4) The serialization API has been replaced by an object oriented system. See <a href="/nouislider/serialization">serialization</a> for all information.</p>

		<p>5) Faulty configuration options will now throw errors with detailed debugging messages.</p>

		<p>6) The <code>'block'</code> event is removed. It provided limited use cases that can more easily be implemented with the existing API.</p>
	</div>
</section>
