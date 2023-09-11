# Cromai
Case da Cromai estagio escalabilidade

Abrir a pagina de html
Rodar o codigo Database.py
Rodar o codigo app.py
Entrar no powershell e executar os comandos de linha
$url = 'http://localhost:5000/execute_command'
$command = 'ls -l'  # Substitua pelo seu comando SSH
$body = @{ 'command' = $command } | ConvertTo-Json
$response = Invoke-RestMethod -Uri $url -Method POST -Body $body -ContentType 'application/json'
Write-Host $response


