from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import server.loading.cache as cache

router = APIRouter()

@router.get("/fragments/{page}", response_class = HTMLResponse)
def page_fragment(page : str):
    return cache.pages[page]

@router.get("/fragments/blog/{category}/{id}", response_class = HTMLResponse)
def blog_post_fragment(category: str, id: str):
    return cache.get_blog_post(category, id)