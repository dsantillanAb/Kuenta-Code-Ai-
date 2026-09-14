$API_KEY = "apimed_5127f87dac74fdf25af5679c9770c6eb781c8cc923ebea1cdeb0197f34ddc9f4"
$BASE_URL = "https://apimedex.dploy.lol"
$HEADERS = @{
    "X-API-Key" = $API_KEY
    "Accept" = "application/json"
}

$endpoints = @(
    "/api/procedimientos",
    "/api/servicios",
    "/api/areas",
    "/api/area",
    "/api/servicio",
    "/api/procedimiento",
    "/v1/procedimientos",
    "/v1/servicios",
    "/v1/areas",
    "/v1/area",
    "/v1/servicio",
    "/v1/procedimiento",
    "/procedimientos",
    "/servicios",
    "/areas",
    "/area",
    "/servicio",
    "/procedimiento"
)

$results = @()

foreach ($endpoint in $endpoints) {
    $url = $BASE_URL + $endpoint
    try {
        $response = Invoke-RestMethod -Uri $url -Headers $HEADERS -Method GET -TimeoutSec 10
        $results += [PSCustomObject]@{
            Endpoint = $endpoint
            Status = "SUCCESS"
            Data = $response
        }
        Write-Host "FOUND: $endpoint" -ForegroundColor Green
    } catch {
        Write-Host "NOT FOUND: $endpoint" -ForegroundColor Yellow
    }
}

if ($results.Count -gt 0) {
    $results | ConvertTo-Json -Depth 10
    $results | Export-Csv -Path ".\api_discovery_results.csv" -NoTypeInformation
    Write-Host "`nResults saved to api_discovery_results.csv" -ForegroundColor Cyan
}
