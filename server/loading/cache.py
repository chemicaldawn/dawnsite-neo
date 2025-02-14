from server.loading.utils import load_json, load_html
from os import listdir, path
from fast_html import *
from random import randint

from collections import defaultdict
from jinja2 import Template

def spacer():
    return hr(class_="spacer")

def build_navbar():
    page_tags = [spacer()]
    tag_layout = load_html("content/templates/page_tag_layout.html")

    for page in page_list:

        additional = ""
        if (page == "random"):
            additional = "desktop-only"

        page_tags.append(Template(tag_layout).render(page_name = page, additional = additional))
        page_tags.append(spacer())
    return render(page_tags)

def get_navbar(page = "home"):
    return navbar

def get_page(page : str):
    try:
        return pages[page]
    except:
        return "404"

def get_blog_post(category : str, post : str):
    try:
        return blog_posts[category][post]
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

def load_blog_listing():

    blog_card_raw = load_html("content/templates/blog_card_layout.html")
    builder = {}

    for d in listdir("content/blog"):
        path = f"content/blog/{d}"
        meta = load_json(f"{path}/meta.json")
        builder[d] = ""

        for post in meta.keys():
            blog_card = Template(blog_card_raw).render(post_title=meta[post]["title"], post_description=meta[post]["description"], post_thumbnail=meta[post]["thumbnail"], post_id=post, post_category=d)
            builder[d] += blog_card

    return builder

def load_blog_posts():
    builder = {}
    blog_post_layout = load_html("content/templates/blog_post_layout.html")

    for d in listdir("content/blog"):
        path = f"content/blog/{d}"
        meta = load_json(f"{path}/meta.json")
        builder[d] = {}

        for post in meta.keys():
            builder[d][post] = Template(blog_post_layout).render(post_title=meta[post]["title"], post_description=meta[post]["description"], post_content=load_html(f"{path}/{post}.html"), post_thumbnail=meta[post]["thumbnail"], post_id=post, post_category=d)

    return builder

blog_listing = load_blog_listing()
special_arguments = defaultdict(dict)
special_arguments["blog"] = {
    "artmusic_listing" : blog_listing["art-music"],
    "ramblings_listing" : blog_listing["personal-ramblings"],
    "politics_listing" : blog_listing["politics"],
    "other_listing" : blog_listing["other"]
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
blog_posts = load_blog_posts()
roll = load_json("content/random/roll.json")["urls"]
random = load_random()
navbar = build_navbar()