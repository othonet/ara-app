# 🔧 Troubleshooting - Deploy GitHub Actions

## Erro: `dial tcp ***:22: i/o timeout`

Este erro indica que o GitHub Actions não consegue se conectar à VPS via SSH.

### Possíveis Causas e Soluções

#### 1. **Problema Temporário de Rede**
- **Solução**: Tente executar o workflow novamente
- No GitHub: Actions → Selecione o workflow → "Re-run all jobs"

#### 2. **IP da VPS Mudou**
- **Verificar IP atual da VPS:**
  ```bash
  curl -s https://api.ipify.org
  # ou
  hostname -I
  ```
- **Atualizar secret no GitHub:**
  1. Acesse: https://github.com/othonet/pkg-app/settings/secrets/actions
  2. Edite o secret `VPS_HOST`
  3. Atualize com o novo IP

#### 3. **Firewall Bloqueando Conexões do GitHub**
- **Verificar se SSH está acessível:**
  ```bash
  ss -tlnp | grep :22
  ```
- **Verificar firewall:**
  ```bash
  ufw status
  # ou
  iptables -L -n | grep 22
  ```
- **Permitir conexões SSH (se necessário):**
  ```bash
  ufw allow 22/tcp
  ufw reload
  ```

#### 4. **Porta SSH Diferente**
- Se a VPS usa uma porta SSH diferente de 22:
  1. Acesse: https://github.com/othonet/pkg-app/settings/secrets/actions
  2. Adicione/edite o secret `VPS_PORT` com a porta correta

#### 5. **Chave SSH Inválida ou Expirada**
- **Verificar se a chave SSH está correta:**
  1. Acesse: https://github.com/othonet/pkg-app/settings/secrets/actions
  2. Verifique o secret `VPS_SSH_KEY`
  3. Certifique-se de que a chave privada está completa (inclui `-----BEGIN` e `-----END`)

#### 6. **Problema com o Provedor de Hosting**
- Alguns provedores bloqueiam conexões de IPs do GitHub
- **Solução**: Contate o suporte do provedor para permitir conexões do GitHub Actions

### Verificações Rápidas

#### Na VPS:
```bash
# Verificar se SSH está rodando
systemctl status ssh
# ou
ss -tlnp | grep :22

# Verificar IP público
curl -s https://api.ipify.org

# Testar conexão SSH localmente
ssh -v localhost
```

#### No GitHub:
1. Verifique os secrets em: https://github.com/othonet/pkg-app/settings/secrets/actions
2. Confirme que todos os secrets estão configurados:
   - `VPS_HOST` - IP ou domínio da VPS
   - `VPS_USER` - Usuário SSH (geralmente `root`)
   - `VPS_SSH_KEY` - Chave privada SSH completa
   - `VPS_PORT` - Porta SSH (opcional, padrão: 22)

### Teste Manual de Conexão

Para testar se a conexão funciona manualmente:

```bash
# Na sua máquina local
ssh -i ~/.ssh/sua_chave root@IP_DA_VPS
```

Se funcionar localmente mas não no GitHub Actions, o problema pode ser:
- Firewall bloqueando IPs do GitHub
- Chave SSH diferente no GitHub
- Timeout muito curto

### Solução Temporária: Deploy Manual

Se o GitHub Actions continuar falhando, você pode fazer deploy manual:

```bash
cd /root/app
git pull origin main
npm ci --production=false
npm run db:generate
npm run build
pm2 reload ecosystem.config.js --update-env
pm2 save
```

### Aumentar Timeout (Opcional)

Se o problema for timeout, você pode aumentar no workflow:

```yaml
- name: Deploy to VPS
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.VPS_HOST }}
    username: ${{ secrets.VPS_USER }}
    key: ${{ secrets.VPS_SSH_KEY }}
    port: ${{ secrets.VPS_PORT || 22 }}
    timeout: 60s  # Aumentar timeout
    command_timeout: 300s  # Timeout para comandos
```

