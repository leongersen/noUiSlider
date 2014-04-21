<?php
	$title = "noUiSlider - Formatting numbers";
	$description = "noUiSlider can read and display values formatting using a bunch of options. Read more here.";
?>

<h1>Number formatting</h1>

<section>

	<div class="double">
		<p>Number formatting is a powerful part of serialization in noUiSlider. It can be used to create multiple output formats for one slider.</p>
	</div>
	
	<div class="double">
		<p>Options can be set for the entire slider in the <code>serialization.format</code> option, and will be inherited by individual link elements. Formatting options specified for individual Link elements take precedence.</p>
	</div>
</section>

<section>

	<h2>Usage</h2>
	
	<div class="lonely">
		<p>Formatting options can be provided in an object. All options are optional.</p>
	</div>
	<?php code('format'); ?>

	<table class="formatting-table">
		<tr>
			<th style="width:180px">&nbsp;</th>
			<th style="width:100px">Default</th>
			<th>Description</th>
		</tr>
		<tr>
			<td><code>decimals</code></td>
			<td><code>2</code></td>
			<td>The number of <strong>decimals</strong> to include in the result. Limited to <code>7</code>.</td>
		</tr>
		<tr>
			<td><code>mark</code></td>
			<td><code>'.'</code></td>
			<td>The decimal separator.</td>
		</tr>
		<tr>
			<td><code>thousand</code></td>
			<td>-</td>
			<td>Separator for <strong>large numbers</strong>. E.g. <code>' '</code> would result in a formatted number of <code>1 000 000</code>.</td>
		</tr>
		<tr>
			<td><code>prefix</code></td>
			<td>-</td>
			<td>A string to <strong>prepend</strong> to the number. E.g. <code>'$'</code>.</td>
		</tr>
		<tr>
			<td><code>postfix</code></td>
			<td>-</td>
			<td>A number to append to a number. For example: <code>',-'</code>.</td>
		</tr>
		<tr>
			<td><code>negative</code></td>
			<td><code>'-'</code></td>
			<td>The prefix for negative values. Can optionally be set to <code>''</code> for replacement by <code>negativeBefore</code>.</td>
		</tr>
		<tr>
			<td><code>negativeBefore</code></td>
			<td>-</td>
			<td>The prefix for a negative number. Inserted before <code>prefix</code>.</td>
		</tr>
		<tr>
			<td><code>encoder</code></td>
			<td>-</td>
			<td>
<p>This is a powerful option to manually modify the slider output. For example, to show a number in another currency:</p>
<pre><code>function( value ){
	return value * 1.32;
}</code></pre>
			</td>
		</tr>
		<tr>
			<td><code>decoder</code></td>
			<td>-</td>
			<td>
<p>Reverse the operations set in <code>encoder</code>. Only required if you'll use these options to write values back to the slider.</p>
<pre><code>function( value ){
	return value / 1.32;
}</code></pre>
			</td>
		</tr>
	</table>

</section>
