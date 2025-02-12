from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from jinja2 import Template
import src.caching as caching

from src.utils import load_html

server = FastAPI()
server.mount("/static", StaticFiles(directory="static"), name="static")

@server.get("/", response_class = HTMLResponse)
def root():
    return full_page("home")

@server.get("/roll-the-dice", response_class=JSONResponse)
def random():
    return {
        "url" : caching.get_roll()
    }

@server.get("/ip", response_class=JSONResponse)
def ip(request: Request):
    return request.client

@server.get("/{page}", response_class = HTMLResponse)
def full_page(page : str):
    return caching.layout.render(navbar=caching.get_navbar(page), page=caching.get_page(page))

@server.get("/blog/{post}", response_class = HTMLResponse)
def blog_post(post : str):
    return caching.layout.render(navbar=caching.get_navbar("blog"), page=caching.get_blog_post(post))

@server.get("/random/{page}", response_class = HTMLResponse)
def random_page(page: str):
    return caching.get_random(page)

@server.get("/fragments/{page}", response_class = HTMLResponse)
def page_fragment(page : str):
    return caching.pages[page]

@server.get("/fragments/blog/listing", response_class = HTMLResponse)
def blog_listing():
    return "<p>hello</p>"
