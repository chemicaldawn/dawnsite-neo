source .venv/bin/activate
.venv/bin/gunicorn -k uvicorn.workers.UvicornWorker --workers 4 server.main:server
