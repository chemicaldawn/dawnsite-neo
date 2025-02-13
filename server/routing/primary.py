from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import server.loading.cache as cache

router = APIRouter()

@router.get("/", response_class = HTMLResponse)
def root():
    return full_page("home")

@router.get("/{page}", response_class = HTMLResponse)
def full_page(page : str):
    return cache.layout.render(navbar=cache.get_navbar(page), page=cache.get_page(page))

@router.get("/blog/{post}", response_class = HTMLResponse)
def blog_post(post : str):
    return cache.layout.render(navbar=cache.get_navbar("blog"), page=cache.get_blog_post(post))

@router.get("/random/{page}", response_class = HTMLResponse)
def random_page(page: str):
    return cache.get_random(page)