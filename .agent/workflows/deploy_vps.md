---
description: Manual deployment to VPS (backend update)
---
# VPS Deployment Workflow

**Server IP:** `185.208.206.192`
**User:** `root` (Assumed, verify on connection)
**Password:** `BLURAY@ps3`

## Steps

1.  **SSH into Server:**
    ```bash
    ssh root@185.208.206.192
    # Enter password when prompted
    ```

2.  **Navigate to Project:**
    Find the project directory (likely `alevate-spaces-landing`).
    ```bash
    cd /path/to/alevate-spaces-landing
    ```

3.  **Update Code:**
    ```bash
    git pull origin master
    ```

4.  **Restart Services:**
    Depending on setup (Systemd/Gunicorn/Supervisor):
    ```bash
    systemctl restart gunicorn
    # OR
    supervisorctl restart all
    ```
