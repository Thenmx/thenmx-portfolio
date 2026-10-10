<#
  PRODUCTION ALLOWLIST BUILD — copies ONLY the public site into ./dist.

  Publish the generated dist/ folder (host "publish directory" = dist),
  never the project root. Nothing in the source project is deleted or
  moved; dist/ is rebuilt from scratch on every run.

  PUBLIC (copied):
    index.html, case-photo-evaluation.html, case-travel-brain.html,
    case-nquadro.html, case-elementa.html, css/, js/, assets/,
    demo/ (unlisted client demos, noindex, e.g. demo/frittoking/)

  EXCLUDED (everything else, e.g.):
    index-bg-test.html, nmx-logo.html, .claude/, internal *.md
    review / consulting files, CV PDFs, deploy/, dist/,
    archive assets listed in $archiveAssets below

  Usage (from the project root or anywhere):
    powershell -NoProfile -ExecutionPolicy Bypass -File deploy\build-dist.ps1
#>
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root 'dist'

$pages = @(
  'index.html',
  'case-photo-evaluation.html',
  'case-travel-brain.html',
  'case-nquadro.html',
  'case-elementa.html'
)
$dirs = @('css', 'js', 'assets', 'demo')

# Archive/source assets kept locally but never published (also in .gitignore).
# Wildcard patterns, relative to the project root.
$archiveAssets = @(
  'assets/about me/io official bk.png',
  'assets/ui/docuflow-*',
  'assets/ui/eroome-*',
  'assets/ui/nova-*',
  'assets/ui/NQUADRO_HOME.png',
  'assets/ui/nquadro-01.png',
  'assets/ui/nquadro-slide-1.png',
  'assets/ui/nquadro-slide-2.png',
  'assets/ui/nquadro-slide-3.png'
)
function Test-ArchiveAsset([string]$relPath) {
  $rel = $relPath -replace '\\', '/'
  foreach ($pat in $archiveAssets) { if ($rel -like $pat) { return $true } }
  return $false
}

if (Test-Path $dist) { Remove-Item -Recurse -Force $dist }
New-Item -ItemType Directory -Force $dist | Out-Null

foreach ($p in $pages) {
  $src = Join-Path $root $p
  if (-not (Test-Path $src -PathType Leaf)) { throw "Missing public page: $p" }
  Copy-Item $src (Join-Path $dist $p)
}
foreach ($d in $dirs) {
  $src = Join-Path $root $d
  if (-not (Test-Path $src -PathType Container)) { throw "Missing public folder: $d" }
  Copy-Item $src (Join-Path $dist $d) -Recurse
}

# drop archive assets from the dist/ copy only (source files are untouched)
Get-ChildItem $dist -Recurse -Force -File |
  Where-Object { Test-ArchiveAsset $_.FullName.Substring($dist.Length + 1) } |
  Remove-Item -Force

# guard: fail loudly if anything outside the allowlist ended up in dist/
$allowedTop = $pages + $dirs
$stray = @(Get-ChildItem $dist -Force | Where-Object { $allowedTop -notcontains $_.Name })
$forbidden = @(Get-ChildItem $dist -Recurse -Force -File |
  Where-Object { $_.Extension -in '.md', '.pdf', '.ps1' -or $_.Name -in 'index-bg-test.html', 'nmx-logo.html' -or
                 (Test-ArchiveAsset $_.FullName.Substring($dist.Length + 1)) })
if ($stray -or $forbidden) {
  throw ("Non-public files found in dist: " + (($stray + $forbidden) | ForEach-Object { $_.FullName }) -join ', ')
}

$files = Get-ChildItem $dist -Recurse -File
$mb = [math]::Round(($files | Measure-Object Length -Sum).Sum / 1MB, 1)
Write-Output ("dist/ ready: {0} files, {1} MB -> {2}" -f $files.Count, $mb, $dist)
