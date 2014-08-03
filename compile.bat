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

set "result=jquery.nouislider.min.js"

:: Remove the existing file so we can be sure a new one is generated.
if exist %result% (
	del %result%
)

echo "Removed %result%, ready."

PAUSE

java -jar compiler\compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --externs %jquery% --externs %zepto% --warning_level VERBOSE --js %link% --js %range% --js %options% --js %source% --js %pips% --js_output_file %result%

echo "Done."
PAUSE
