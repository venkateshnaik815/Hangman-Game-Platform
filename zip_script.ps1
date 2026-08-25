$source = "c:\github projects\Hangman Game Platform"
$temp = "c:\temp_hangman"
$destZip = "c:\github projects\Hangman Game Platform\Hangman_Submission.zip"

If (Test-Path $temp) { Remove-Item -Recurse -Force $temp }
New-Item -ItemType Directory -Path $temp | Out-Null

# Copy everything including hidden files
xcopy "$source\*" "$temp\" /E /H /I /Q /Y | Out-Null

# Clean up unwanted directories
Remove-Item -Recurse -Force "$temp\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$temp\frontend\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$temp\backend\build" -ErrorAction SilentlyContinue
Remove-Item -Force "$temp\*.zip" -ErrorAction SilentlyContinue
Remove-Item -Force "$temp\zip_script.ps1" -ErrorAction SilentlyContinue

If (Test-Path $destZip) { Remove-Item -Force $destZip }

# Zip it up using the .NET class which correctly includes all hidden files like .git
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($temp, $destZip)

# Cleanup
Remove-Item -Recurse -Force $temp
