@echo off

:: Set all paths as variables
set "wnumb=wnumb\wNumb.js"
set "wnumbMin=wnumb\wNumb.min.js"
set "link=libLink\jquery.liblink.js"

set "jquery=compiler\jquery-1.9.js"
set "zepto=compiler\zepto.js"

set "range=src\module.range.js"
set "options=src\module.options.js"
set "source=src\module.base.js"
set "pips=src\optional.pips.js"

set "nouislidermin=jquery.nouislider.min.js"
set "nouisliderfull=jquery.nouislider.full.min.js"

set "compiler=compiler\compiler.jar"
set "level=--compilation_level SIMPLE_OPTIMIZATIONS"
set "verbose=--warning_level VERBOSE"

:: Remove the existing file so we can be sure a new one is generated.
if exist %nouislidermin% (
	del %nouislidermin%
	echo "Removed %nouislidermin%."
)
if exist %nouisliderfull% (
	del %nouisliderfull%
	echo "Removed %nouisliderfull%,"
)

echo "Ready."

PAUSE

java -jar %compiler% %level% %verbose% --js %wnumb% --js_output_file %wnumbMin%
java -jar %compiler% %level% %verbose% --externs %jquery% --externs %zepto% --js %range% --js %options% --js %source% --js_output_file %nouislidermin%
java -jar %compiler% %level% %verbose% --externs %jquery% --externs %zepto% --js %wnumb% --js %link% --js %range% --js %options% --js %source% --js %pips% --js_output_file %nouisliderfull%

echo "Done."
PAUSE
