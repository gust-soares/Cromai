from flask import Flask, request
import paramiko

app = Flask(__name__)

# Configurações para autenticação SSH
SSH_HOST = 'your_ssh_host'
SSH_PORT = 22
SSH_USERNAME = 'your_ssh_username'
SSH_PASSWORD = 'your_ssh_password'

# Função para executar comandos SSH
def execute_ssh_command(command):
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(SSH_HOST, port=SSH_PORT, username=SSH_USERNAME, password=SSH_PASSWORD)
    stdin, stdout, stderr = ssh_client.exec_command(command)
    output = stdout.read().decode('utf-8')
    ssh_client.close()
    return output

@app.route('/execute_command', methods=['POST'])
def execute_command():
    if request.method == 'POST':
        command = request.json.get('command')
        if command:
            result = execute_ssh_command(command)
            return result, 200
        else:
            return 'Comando ausente ou inválido', 400
    else:
        return 'Método não permitido', 405

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
