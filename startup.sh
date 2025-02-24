source .venv/bin/activate
.venv/bin/gunicorn -p gunicorn.pid -k uvicorn.workers.UvicornWorker --workers 4 -D server.main:server
