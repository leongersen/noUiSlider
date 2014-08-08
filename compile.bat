@echo off

:: Set all paths as variables
set "wnumb=wnumb\wnumb.js"
set "link=libLink\jquery.liblink.js"

set "jquery=compiler\jquery-1.9.js"
set "zepto=compiler\zepto.js"

set "range=src\module.range.js"
set "options=src\module.options.js"
set "source=src\module.base.js"
set "pips=src\optional.pips.js"

set "minresult=jquery.nouislider.min.js"
set "fullresult=jquery.nouislider.full.min.js"

:: Remove the existing file so we can be sure a new one is generated.
if exist %minresult% (
	del %minresult%
	echo "Removed %minresult%."
)
if exist %fullresult% (
	del %fullresult%
	echo "Removed %fullresult%,"
)

echo "Ready."

PAUSE

java -jar compiler\compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --externs %jquery% --externs %zepto% --warning_level VERBOSE --js %range% --js %options% --js %source% --js_output_file %minresult%
java -jar compiler\compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --externs %jquery% --externs %zepto% --warning_level VERBOSE --js %wnumb% --js %link% --js %range% --js %options% --js %source% --js %pips% --js_output_file %fullresult%

echo "Done."
PAUSE
