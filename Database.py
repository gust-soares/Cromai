import sqlite3

# Conectar ao banco de dados ou criá-lo se não existir
conn = sqlite3.connect('monitoramento.db')

# Criar um cursor
cursor = conn.cursor()

# Criar uma tabela para armazenar os dados de monitoramento
cursor.execute('''
    CREATE TABLE IF NOT EXISTS dados_monitoramento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uso_cpu REAL,
        uso_memoria REAL,
        uso_disco REAL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

# Salvar as alterações e fechar a conexão
conn.commit()
conn.close()
