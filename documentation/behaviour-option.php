<?php
	$title = "noUiSlider - User Interaction Settings";
	$description = "noUiSlider supports a ton of features, such as dragging the range, or setting fixed handle distances.";
?>

<h1>Slider behaviour</h1>

<section>

	<div class="view">

		<p>noUiSlider offers several ways to handle user interaction. The range can be set to drag, and handles can move to taps. All these effects are optional, and can be enable by adding their keyword to the <code>behaviour</code> option.</p>

		<p>This option accepts a <code>"-"</code> separated list of <code>"drag"</code>, <code>"tap"</code>, <code>"fixed"</code>, <code>"snap"</code> or <code>"none"</code>.</p>

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
		<p>Make the range dragable.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "drag-fixed"</code></pre>
		<p>The range is dragable. The range width can't be changed.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "tap"</code></pre>
		<p>Make the closest handle when the slider gets tapped.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "tap-drag"</code></pre>
		<p>Make the closest handle jump when the slider bar is tapped, make the range dragable.</p>
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
		<p>Makes the range dragable. Requires two handles. The <code>slide</code> event fires for both handles.</p>
		<div class="example">
			<div id="drag"></div>
			<?php run('drag'); ?>
		</div>
	</div>

	<div class="side">
		<?php code('drag'); ?>
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
