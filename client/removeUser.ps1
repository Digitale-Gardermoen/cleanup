param (
  [String]$username
)

if (!$username) {
  Write-Host "No username given, exiting."
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

$uri = "https://cleanup.dgi.no/eadmin/$($username)"

try {
  Invoke-RestMethod `
    -uri $uri `
    -Credential $cred `
    -Method 'DELETE' `
    -ErrorAction Stop `
    -ErrorVariable $deleteError
}
catch {
  Write-Host $postError
}