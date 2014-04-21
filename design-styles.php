<?php
	$title = "noUiSlider - Slider design and styling";
	$description = "noUiSlider comes with a beautiful theme. Find out everything about styling and design.";
?>

<h1>Styling</h1>

<section>

	<div class="lonely">
		<p>Styling noUiSlider is easy. The default stylesheet contains helpful comments to get a head start. I <strong>strongly</strong> recommend using the default stylesheet as a starting point when re-styling noUiSlider.</p>
	</div>

	<table class="language-css styling-table">
		<thead>
			<tr>
				<th width="250">Selector</th>
				<th>Effect</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>.noUi-target</code></td>
				<td>This class is added to the element you call <code>.noUiSlider()</code> on. Has <code>border</code>, <code>background</code> and other styling properties to establish the slider design. </td>
			</tr>
			<tr>
				<td><code>.noUi-base</code></td>
				<td>The slider bar. Serves as the calculating point for the slider handles, and has no visible styling.</td>
			</tr>
			<tr>
				<td><code>.noUi-origin</code></td>
				<td>The elements connected to the base, defining the handle locations.</td>
			</tr>
			<tr>
				<td><code>.noUi-handle</code><br><code>.noUi-handle-lower</code><br><code>.noUi-handle-upper</code></td>
				<td>The actual, visible handles. Style these any way you like! The lower and upper handles can be targeted individually.</td>
			</tr>
			<tr>
				<td><code>.noUi-connect</code></td>
				<td>Styling class for setting properties related to the slider <code>connect</code> segment.</td>
			</tr>
			<tr>
				<td><code>.noUi-background</code></td>
				<td>Styling class for setting properties related to the slider background.</td>
			</tr>
			<tr>
				<td><code>.noUi-state-tap</code></td>
				<td>This class is added when the slider bar is tapped or clicked. A slider with this call will reject any user input. noUiSlider will remove this class after 300ms, leaving that timespan to perform visual animations.</td>
			</tr>
			<tr>
				<td><code>[disabled]</code></td>
				<td>Apply this to your slider to disable it, and make sure the slider visuals reflect the disabled state.</td>
			</tr>
		</tbody>
	</table>
</section>

<section>

	<h2>Things to watch out for</h2>

	<ul style="margin: 20px">
		<li>If you want the handles to stay within the slider bar, see <a href="/nouislider/behaviour-option">this article</a>.</li>
		<li>The <code>.noUi-connect</code> and <code>.noUi-background</code> classes are applied to various elements.</a>
		<li>To position your handles on the center of its relative position, it should have a <strong>negative offset</strong> of half the handle width. See the default theme for reference.</li>
	</ul>
</section>
