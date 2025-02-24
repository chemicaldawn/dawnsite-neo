import hmac
import hashlib
import subprocess

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
import server.loading.cache as cache

router = APIRouter()

def verify_signature(payload_body, secret, signature_header):
    if not signature_header:
        return False

    hash_object = hmac.new(secret.encode('utf-8'), msg=payload_body.encode('utf-8'), digestmod=hashlib.sha256)
    expected_signature = "sha256=" + hash_object.hexdigest()

    if not hmac.compare_digest(expected_signature, signature_header):
        return False

    return True

@router.post("/git/onpush", response_class = HTMLResponse)
def onpush(request : Request):
    if (verify_signature(request.body, cache.secrets["github"], request.headers.get("X-Hub-Signature-256"))):
        subprocess.run(["sh","./reload.sh"])
    print("Reloading server...")