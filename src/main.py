from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from jinja2 import Template
import src.caching as caching

from src.utils import load_html

server = FastAPI()
server.mount("/static", StaticFiles(directory="static"), name="static")

@server.get("/", response_class = HTMLResponse)
def root():
    return full_page("home")

@server.get("/{page}", response_class = HTMLResponse)
def full_page(page : str):
    return caching.layout.render(navbar=caching.get_navbar(page), page=caching.get_page(page))

@server.get("/fragments/{page}", response_class = HTMLResponse)
def page_fragment(page : str):
    return caching.pages[page]