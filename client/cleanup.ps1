param (
    [String]$path
)

if (!$path) {
    Write-Host "Missing path, Exiting session"
    Exit
}

$username = "admin"
$password = ConvertTo-SecureString "secret" -AsPlainText -Force
$cred = New-Object -typename System.Management.Automation.PSCredential -argumentlist $username, $password
$uri = "https://cleanup.dgi.no:8443/fetch/$($env:computername)"
$deleteUri = "https://cleanup.dgi.no:8443/deleteOne/"

$result = Invoke-RestMethod -Uri $uri -Credential $cred
if ($result -eq "No data") {
    Write-Host "No data, Exiting session"
    Exit
}

$result | ForEach-Object {
    if (($_.username -eq $null) -or ($_.username -eq "")) {
        Write-Host "No username, breaking loop"
        break
    }
    else {
        $user = $_.username
        $deleteBody = @{"username" = "$($_.username)";"serverName" = "$($env:computername)"}
        
        $folders = Get-ChildItem -Path $path -Force | Where-Object { $($_.Name) -like "$($user).AD*" }
        if (($folders) -and ($folders.Length -gt 0)) {
            try {
                $folders | Remove-Item -Force -Recurse -WhatIf -ErrorAction Stop -ErrorVariable $folderError
            }
            catch {
                if ($folderError) {
                    Write-Host $folderError
                }
            }
        }
        try {
            Invoke-RestMethod `
                -Method "DELETE" `
                -Uri $deleteUri `
                -Body ($deleteBody|ConvertTo-Json) `
                -ContentType "application/json" `
                -Credential $cred `
                -ErrorAction Stop `
                -ErrorVariable $restError
        }
        catch {
            if ($restError) {
                Write-Host $restError
            }
        }
    }
}