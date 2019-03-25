param (
    [String]$username
)

if (!$username) {
    exit
}

$uri = 'https://cleanup.dgi.no/eadmin'
$reqUser = 'admin'
$reqPassword = ConvertTo-SecureString "secret" -AsPlainText -Force
$cred = New-Object -typename System.Management.Automation.PSCredential -argumentlist $reqUser, $reqPassword
$body = @{username = $username}

try {
    Invoke-RestMethod `
        -uri $uri `
        -Credential $cred `
        -Method 'POST' `
        -Body ($body|ConvertTo-Json) `
        -ContentType 'application/json' `
        -ErrorAction Stop `
        -ErrorVariable $postError
}
catch {
    Write-Host $postError
}