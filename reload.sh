git pull origin main
kill -HUP $(cat ./gunicorn.pid)