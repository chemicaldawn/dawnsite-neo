import json

def load_html(path : str):
    file = open(path)
    content = file.read()
    file.close()
    return content

def load_json(path : str):
    file = open(path)
    content = file.read()
    file.close()
    return json.loads(content)