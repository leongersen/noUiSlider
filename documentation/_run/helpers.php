<?php

	function fgc ( $name ) {
		return file_get_contents( './' . $GLOBALS['page'] . '/' .$name);
	}

	function code ( $name, $encode = false ) {

		$c = fgc($name . '.js');

		if ( $encode ) {
			$c = htmlentities($c);
		}

		echo "\r\n".'<pre><code>' . $c . '</code></pre>';
	}

	function run ( $name ){
		echo "\r\n".'<script>'."\r\n" . fgc($name . '.js') . '</script>';
	}

	function showHTML ( $code ) {

		echo "\r\n".'
	<div class="showHTML">
		<div class="Actual">
		'.$code.'
		</div>
		<pre class="language-markup"><code>'.htmlentities($code).'</code></pre>
	</div>';
	}

	function sect ( $title ) {
		echo '<a href="#section-' . $title . '" id="section-' . $title . '" class="sect">&sect;</a>';
	}
