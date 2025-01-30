from src.utils import load_json, load_html
from os import listdir
from fast_html import *

from jinja2 import Template

def spacer():
    return p("/", class_="spacer")

def load_pages():
    pgs = {}
    for page in page_list:
        pgs[page] = load_html(f"templates/pages/{page}.html")
    return pgs

def build_navbar():
    page_tags = [spacer()]
    for page in page_list:
        page_tags.append(
            p(page, class_=f"{page}* nav-link", hx_get=f"/fragments/{page}", hx_trigger="click", hx_target="#page", hx_swap="innerHTML", hx_push_url=f"/{page}")
        )
        page_tags.append(spacer())
    return render(page_tags)

layout = Template(load_html("templates/layout.html"))

page_list = load_json("templates/pages/meta.json")["pages"]
pages = load_pages()
navbar = build_navbar()

def get_navbar(page = "home"):
    return navbar.replace(f"{page}*", "active")

def get_page(page : str):
    try:
        return pages[page]
    except:
        return "404"