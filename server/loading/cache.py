from server.loading.utils import load_json, load_html
from os import listdir, path
from fast_html import *
from random import randint

from collections import defaultdict
from jinja2 import Template

def spacer():
    return p("——————", class_="spacer")

def build_navbar():
    page_tags = [spacer()]
    for page in page_list:
        page_tags.append(
            p(page, class_=f"{page}* nav-link", hx_get=f"/fragments/{page}", hx_trigger="click", hx_target="#page", hx_swap="innerHTML", hx_push_url=f"/{page}")
        )
        page_tags.append(spacer())
    return render(page_tags)

def build_blog_listing():
    return "<p>yuh</p>"

def get_navbar(page = "home"):
    return navbar.replace(f"{page}*", "active")

def get_page(page : str):
    try:
        return pages[page]
    except:
        return "404"

def get_blog_post(post : str):
    try:
        return blog_posts[post]
    except:
        return "404"

def get_roll():
    return roll[randint(0, len(roll) - 1)]

def get_random(page : str):
    return random[page]

def load_pages():
    builder = {}
    for page in page_list:
        builder[page] = Template(load_html(f"content/pages/{page}.html")).render(**special_arguments[page])
    return builder

def load_blog_posts():
    builder = {}
    blog_post_layout = load_html("content/templates/blog_post_layout.html")

    for post in blog_meta.keys():
        builder[post] = Template(blog_post_layout).render(post_title=blog_meta[post]["title"], post_description=blog_meta[post]["description"], post_content=load_html(f"content/blog/{post}.html"))

    return builder

special_arguments = defaultdict(dict)
special_arguments["blog"] = {
    "listing" : build_blog_listing()
}

def load_random():
    builder = {}
    for f in listdir("content/random"):
        frag = f.split(".")
        if (frag[1] == "html"):
            builder[frag[0]] = load_html(f"content/random/{f}")
    return builder

layout = Template(load_html("content/templates/layout.html"))

page_list = load_json("content/pages/meta.json")["pages"]
pages = load_pages()
blog_meta = load_json("content/blog/meta.json")
blog_posts = load_blog_posts()
roll = load_json("content/random/roll.json")["urls"]
random = load_random()
navbar = build_navbar()