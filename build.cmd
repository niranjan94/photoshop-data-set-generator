rmdir /Q /S dist
python setup.py py2exe
mkdir dist\ui
xcopy ui dist\ui /s /h
rmdir /Q /S dist\ui\.idea
rmdir /Q /S build
cd dist
"C:\Program Files\7-Zip\7za.exe" a -mx9 -tzip IDCardGenerator.zip *.* -r