# Cromai
Case da Cromai estagio escalabilidade

Abrir a pagina de html<br />
Rodar o codigo Database.py<br />
Rodar o codigo app.py<br />
Entrar no powershell e executar os comandos de linha:<br />
$url = 'http://localhost:5000/execute_command'<br />
$command = 'ls -l' <br />
$body = @{ 'command' = $command } | ConvertTo-Json<br />
$response = Invoke-RestMethod -Uri $url -Method POST -Body $body -ContentType 'application/json'<br />
Write-Host $response


