from jinja2 import Environment, FileSystemLoader, select_autoescape

def load_html_template(template_dir, template_name, context):
    env = Environment(
        loader=FileSystemLoader(template_dir),
        autoescape=select_autoescape(['html', 'xml'])
    )

    template = env.get_template(template_name)
    return template.render(context)
