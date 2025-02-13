from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import server.loading.cache as cache

router = APIRouter()

@router.get("/roll-the-dice", response_class=JSONResponse)
def random():
    return {
        "url" : cache.get_roll()
    }

@router.get("/ip", response_class=JSONResponse)
def ip(request: Request):
    return request.client