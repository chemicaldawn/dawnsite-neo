import subprocess

from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import server.loading.cache as cache

router = APIRouter()

@router.post("/git/onpush", response_class = HTMLResponse)
def onpush():
    subprocess.run(["sh","./reload.sh"])
    print("Reloading server...")