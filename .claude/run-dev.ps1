# Launch the Vite dev server for MyWorkDrive Admin.
# Path is derived from this script's location so it works regardless of CWD.
$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root
& npm.cmd run dev
