param (
  [String]$username
)

if (!$username) {
  exit
}

try {
  $cred = Import-Clixml -Path ".\Credentials_$($env:USERNAME)_$($env:COMPUTERNAME).xml" -ErrorAction Stop -ErrorVariable $credentialError
}
catch {
  Write-host "Error getting Credential file"
  if (!$cred) {
    Write-Host "File does not exist."
  }
  Write-Host $credentialError
  Exit
}

$uri = 'https://cleanup.dgi.no/eadmin'
$body = @{username = $username}

try {
  Invoke-RestMethod `
    -uri $uri `
    -Credential $cred `
    -Method 'DELETE' `
    -Body ($body|ConvertTo-Json) `
    -ContentType 'application/json' `
    -ErrorAction Stop `
    -ErrorVariable $deleteError
}
catch {
  Write-Host $postError
}