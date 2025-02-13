from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from server.routing.primary import router as primary_router
from server.routing.fragments import router as fragment_router
from server.routing.api import router as api_router

server = FastAPI()
server.mount("/static", StaticFiles(directory="static"), name="static")

server.include_router(primary_router)
server.include_router(fragment_router)
server.include_router(api_router)