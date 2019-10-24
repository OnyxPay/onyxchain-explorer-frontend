@echo off
set TAG=%1%
set REVISION=%2%
set STABLE_REVISION=%3%
echo tag             = %TAG%
echo revision        = %REVISION%
echo stable tag name = %STABLE_TAG%
git pull
git push --delete origin %TAG%
git tag --delete %TAG%
IF DEFINED %STABLE_REVISION% git tag -a %STABLE_TAG% %REVISION% -m "Create stable tag"
git tag -a %TAG% %REVISION% -m "Tag"
git push --follow-tags
