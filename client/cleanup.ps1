param (
    [String]$path
)

$username = "admin"
$password = ConvertTo-SecureString "secret" -AsPlainText -Force
$cred = New-Object -typename System.Management.Automation.PSCredential -argumentlist $username, $password
$uri = "https://cleanup.dgi.no:8443/fetch/$($env:computername)"
$deleteUri = "https://cleanup.dgi.no:8443/deleteOne/"

$result = Invoke-RestMethod -Uri $uri -Credential $cred
$result

if ($result -eq $null) {
    Write-Host "Exiting session"
    Exit-PSSession
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
        $folders.Name
        $folders.Length
        if ($folders.Lenght -gt 0) {
            $folders | Remove-Item -Force -Recurse -WhatIf
        }
        
        #Invoke-RestMethod -Method "DELETE" -Uri $deleteUri -Body ($deleteBody|ConvertTo-Json) -ContentType "application/json" -Credential $cred
    }
}