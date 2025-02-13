from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import server.loading.cache as cache

router = APIRouter()

@router.get("/fragments/{page}", response_class = HTMLResponse)
def page_fragment(page : str):
    return cache.pages[page]

@router.get("/fragments/blog/listing", response_class = HTMLResponse)
def blog_listing():
    return "<p>hello</p>"