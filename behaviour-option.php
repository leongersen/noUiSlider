<?php
	$title = "noUiSlider - User Interaction Settings";
	$description = "noUiSlider supports a ton of features, such as dragging the range, or setting fixed handle distances.";
?>

<h1>Slider behaviour</h1>

<section>

	<div class="double">

		<p>noUiSlider offers several ways to handle user interaction. The range can be set to drag, and handles can move to taps. All these effects are optional, and can be enable by adding their keyword to the <code>behaviour</code> option.</p>

		<div class="example">
			<div id="behaviour"></div>
			<?php run('behaviour-option', false); ?>
		</div>
	</div>

	<div class="double">
		<?php code('behaviour-option'); ?>
	</div>

</section>

<section>

	<h2>Behaviour</h2>

	<div class="double">

		<p>This option can be used to set the slider response to dragging or tapping. The <code>"extend"</code> keyword will contain the handles within the slider bar.</p>
	</div>

	<div class="double">

		<p>This option accepts a <code>"-"</code> separated list of <code>"drag"</code>, <code>"tap"</code>, <code>"extend"</code>, <code>"fixed"</code>, <code>"snap"</code> or <code>"none"</code>.</p>
	</div>
</section>

<section class="under">

	<h2>Example configurations</h2>

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

		<pre><code>behaviour: "extend-drag"</code></pre>
		<p>Extend events to the '.noUi-target' element.</p>
	</div>

	<div class="double">

		<pre><code>behaviour: "none"</code></pre>
		<p>Turn off all behaviour, except for standard moving.</p>
	</div>
</section>

<section>
	<div class="double">
		<h3>Tap</h3>
		<p>A handle snaps to a clicked location. A smooth transition is used. This option is default.</p>
		<div class="example">
			<div id="tap"></div>
			<?php run('tap', false); ?>
		</div>
	</div>
	<div class="double">
		<?php code('tap'); ?>
	</div>
</section>

<section>
	<div class="double">
		<h3>Drag</h3>
		<p>Makes the range dragable. Requires two handles.</p>
		<div class="example">
			<div id="drag"></div>
			<?php run('drag', false); ?>
		</div>
	</div>
	<div class="double">
		<?php code('drag'); ?>
	</div>
</section>

<section>
	<div class="double">
		<h3>Fixed dragging</h3>
		<p>Keeps the distance between handles fixed when the <code>'drag'</code> flag is set.</p>
		<div class="example">
			<div id="drag-fixed"></div>
			<?php run('drag-fixed', false); ?>
		</div>
	</div>
	<div class="double">
		<?php code('drag-fixed'); ?>
	</div>
</section>

<section>
	<div class="double">
		<h3>Snap</h3>
		<p>A handle snaps to a clicked location. It can immediatly be moved.</p>
		<div class="example">
			<div id="snap"></div>
			<?php run('snap', false); ?>
		</div>
	</div>
	<div class="double">
		<?php code('snap'); ?>
	</div>
</section>

<section>
	<div class="double">
		<h3>Combined options</h3>
		<p>Most <code>'behaviour'</code> flags can be combined.</p>
		<div class="example">
			<div id="combined"></div>
			<?php run('combined', false); ?>
		</div>
	</div>
	<div class="double">
		<?php code('combined'); ?>
	</div>
</section>

<h2>Extending slider events</h2>

<section class="demo">

	<div class="double">

		<p>The behaviour option also offers the <code>extend</code> keyword, which instructs the slider to receive tap event on the <code>.noUi-target</code> element.</p>

		<p>With the <code>extend</code> option enabled, a padding can be set on the <code>.noUi-target</code> to contain the handles in the slider bar. This padding will accept events and pass tapping on to the slider. To demonstrate the difference, the handles are transparent.</p>

		<div class="example">
			<div id="slider1"></div>
			<?php run('extend1', false); ?>
		</div>
		<?php code('extend1'); ?>

	</div>

	<div class="double">

		<p>Otherwise, the handles will overlap the slider bar, so that the handle center is equal to its relative position. Padding can still be set on the <code>.noUi-target</code>, but tapping on this padding will not be passed on to the slider. </p>

		<div class="example">
			<div id="slider2"></div>
			<?php run('extend2', false); ?>
		</div>
		<?php code('extend2'); ?>

	</div>
</section>

