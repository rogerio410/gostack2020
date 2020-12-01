## Macro Features TODO

# Recuperação de Senha
  **R. Funcionais**
    - O usuário deve poder recuperar sua senha informando o seu email
    - O usuário deve receber um email com instruções de recuperação de senha
    - O usuário deve poder resetar sua senhã

  **R. N. Funcionais**
    - Utilizar mailtrap para testar envios de email em ambiente Dev
    - Utilizar Amazon SES para envios em Produção
    - O Envio de Emails deve acontecer em segundo plano (backgroud job)

  **Regras de Negócio**
    - O Link enviado por email para recuperar a senha deve expirar em 2h
    - O usuário precisa confirmar a novasenha ao restartar sua senha

# Atualização do Perfil
  **R. Funcionais**
    - O usuário deve poder atualizar seu perfil (nome, email, senha)

  **R. N. Funcionais**
    -

  **Regras de Negócio**
    - O usuário não pode atualizar se email par aum email já em uso por outro usuário.
    - Para atualizar a senha é necessário informar a senha atual
    - Para atualizar a senha pedir confirmação da nova senha


# Agendamento de Serviço
  **R. Funcionais**
    - O Usuário deve poder listar todos os Prestadores de Serviço cadastrado
    - O usuário deve poder listar os dias de um mês que tenha horários disponíveis para um dado prestador
    - O usuário deve poder listar os horários para um dia específico de um prestador
    - O usuário deve poder realizar um novo agendamento com um prestador

  **R. N. Funcionais**
    - A Listagem de Prestadores deve ser armazenada em Cache (evitar acessos ao BD principal)

  **Regras de Negócio**
    - Cada agendamento deve durar exatamente 1h
    - Os agendamentos devem estar disponíveis entre 8h da manhã às 17h (o início)
    - O usuário não pode agendar em um horário já ocupado
    - O usuário não pode agendar em um horário passado
    - O usuário não pode agendar serviços consigo mesmo


# Painel do Prestador
  **R. Funcionais**
    - O usuário deve poder listar seu agendamentos de um dia específico
    - O Prestador deve receber uma notificação, sempre que houver um novo agendamento
    - O prestador deve poder visualizar as notificações não lidas


  **R. N. Funcionais**
    - Os agendamento do prestador do dia deve ficar em Cache (ou Real Time)
    - A cada novo agendamento resetar Cache
    - As notificações do prestador devem ser armazenadsa em BD não relacional (mongoDB)
    - As notificações do prestador devem ser enviados em tempo real via (SocketIO/WebSocket)

  **Regras de Negócio**
    - A notificação deve ter um Status de Lida ou Não-lida
