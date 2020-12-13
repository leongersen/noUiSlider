<?php
	$title = "noUiSlider - User Interaction Settings";
	$description = "noUiSlider supports a ton of features, such as dragging the range, or setting fixed handle distances.";
	$canonical = "nouislider/behaviour-option/";
?>

<h1>Slider behaviour</h1>

<section>

	<div class="view">

		<p>noUiSlider offers several ways to handle user interaction. The range can be set to drag, and handles can move to taps. All these effects are optional, and can be enable by adding their keyword to the <code>behaviour</code> option.</p>

		<p>This option accepts a <code>"-"</code> separated list of <code>"drag"</code>, <code>"tap"</code>, <code>"fixed"</code>, <code>"snap"</code>, <code>"unconstrained"</code> or <code>"none"</code>.</p>

		<div class="example">
			<div id="behaviour"></div>
			<?php run('behaviour-option'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('behaviour-option'); ?>
	</div>
</section>


<?php sect('examples'); ?>
<h2>Example configurations</h2>

<section>

	<div class="double">

		<pre><code>behaviour: "drag"</code></pre>
		<p>Make the <strong>range</strong> draggable. <strong>Handles</strong> are <em>always</em> draggable.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "drag-fixed"</code></pre>
		<p>The range is draggable. The range width can't be changed, so dragging one handle will move the other, too.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "tap"</code></pre>
		<p>Make the closest handle when the slider gets tapped.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "tap-drag"</code></pre>
		<p>Make the closest handle jump when the slider bar is tapped, make the range draggable.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "hover"</code></pre>
		<p>Fire <code>hover</code> events when a user with a mouse or pen hovers over the slider.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "unconstrained-tap"</code></pre>
		<p>Allow handles to move past each other.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "none"</code></pre>
		<p>Turn off all behaviour, except for standard moving.</p>
	</div>
</section>


<?php sect('tap'); ?>
<h2>Tap</h2>

<section>

	<div class="view">
		<p>A handle snaps to a clicked location. A smooth transition is used. This option is <strong>default</strong>.</p>
		<div class="example">
			<div id="tap"></div>
			<?php run('tap'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('tap'); ?>
	</div>
</section>


<?php sect('drag'); ?>
<h2>Drag</h2>

<section>

	<div class="view">
		<p>Makes the range (the green connecting bar between handles) draggable. Requires two handles. The <code>connect</code> option <strong>must</strong> be set to <code>true</code>. The <code>slide</code> event fires for both handles when dragging the range.</p>
		<div class="example">
			<div id="drag"></div>
			<?php run('drag'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('drag'); ?>
	</div>
</section>

<?php sect('drag-all'); ?>
<h2>Drag All Handles</h2>
<section>

	<div class="view">
		<p>If you want to drag all handles when you have more than two, you can set the <code>dragAllHandles</code> option to <strong>true</strong>. The <code>slide</code> event fires for all handles when dragging the range.</p>
		<div class="example">
			<div id="drag-all"></div>
			<?php run('drag-all'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('drag-all'); ?>
	</div>
</section>

<?php sect('fixed'); ?>
<h2>Fixed dragging</h2>

<section>

	<div class="view">
		<p>Keeps the distance between handles fixed when the <code>'drag'</code> flag is set.</p>
		<div class="example">
			<div id="drag-fixed"></div>
			<?php run('drag-fixed'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('drag-fixed'); ?>
	</div>
</section>


<?php sect('snap'); ?>
<h2>Snap</h2>

<section>

	<div class="view">
		<p>A handle snaps to a clicked location. It can immediatly be moved, without a <code>mouseup</code> + <code>mousedown</code>.</p>
		<div class="example">
			<div id="snap"></div>
			<?php run('snap'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('snap'); ?>
	</div>
</section>


<?php sect('hover'); ?>
<h2>Hover</h2>

<section>

	<div class="view">
		<p>With this option set, the slider fires <code>hover</code> events when a mouse or pen user hovers over the slider. The event is provided with the slider value at the hovered position. It <strong>does not</strong> fire while the slider is being dragged by mouse or pen, but it <strong>does</strong> for touch events.</p>
		<div class="example">
			<div id="hover"></div>
			<span class="example-val" id="hover-val"></span>
			<style>#hover-val:before { content: "Hovered value: " }</style>
			<?php run('hover'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('hover'); ?>
	</div>
</section>


<?php sect('unconstrained'); ?>
<h2>Unconstrained</h2>

<section>

	<div class="view">
		<p>With this option set, handles are allowed to move past each other. The <code>limit</code> and <code>margin</code> options cannot be used with this behaviour.</p>
        <p>All APIs will return slider values in the original handle order, regardless of whether handles have changed places.</p>
		<div class="example">
			<div id="unconstrained"></div>
            <span class="example-val" id="unconstrained-values"></span>
			<?php run('unconstrained'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('unconstrained'); ?>
	</div>
</section>


<?php sect('combined'); ?>
<h2>Combined options</h2>

<section>

	<div class="view">
		<p>Most <code>'behaviour'</code> flags can be combined.</p>
		<div class="example">
			<div id="combined"></div>
			<?php run('combined'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('combined'); ?>
	</div>
</section>
