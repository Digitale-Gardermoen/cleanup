param (
  [String]$username
)

if (!$username) {
  Write-Host "No username given, exiting."
  exit
}

$cwd = (Get-Item -Path ".\").FullName

try {
  $cred = Import-Clixml -Path "$($cwd)\Credentials_$($env:USERNAME)_$($env:COMPUTERNAME).xml" -ErrorAction Stop -ErrorVariable $credentialError
}
catch {
  Write-host "Error getting Credential file"
  if (!$cred) {
    Write-Host "File does not exist."
  }
  Write-Host "Current cwd: $($cwd)"
  Write-Host $credentialError
  Exit
}

$uri = "https://cleanup.dgi.no/eadmin/$($username)"

try {
  Invoke-RestMethod `
    -uri $uri `
    -Credential $cred `
    -Method 'POST' `
    -ErrorAction Stop `
    -ErrorVariable $postError
}
catch {
  Write-Host $Error
}