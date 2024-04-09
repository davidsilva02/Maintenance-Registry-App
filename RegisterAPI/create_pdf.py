import pdfkit
from jinja2 import Environment, FileSystemLoader
import os


def create_pdf_register(data):
    path_wkhtmltopdf_input = r'C:\Program Files (x86)\wkhtmltopdf\bin\wkhtmltopdf.exe'
    env = Environment(loader=FileSystemLoader('.'))
    template = env.get_template("Register_Template.html")
    template_vars = data
    html_string = template.render(template_vars)
    path_wkhtmltopdf = path_wkhtmltopdf_input
    config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
    options = {
    'page-size': 'A4',
    'margin-top': '0.75in',
    'margin-right': '0.75in',
    'margin-bottom': '0.75in',
    'margin-left': '0.75in',
    'encoding': "UTF-8",
    'enable-local-file-access': None,
    'no-outline': None
    }
    pdfkit.from_string(html_string
                   , f'relatorio_{data["RegisterId"]}.pdf'
                   , configuration = config
                   , options = options)
    return f'relatorio_{data["RegisterId"]}.pdf'

def create_pdf_SF(data):
    path_wkhtmltopdf_input = r'C:\Program Files (x86)\wkhtmltopdf\bin\wkhtmltopdf.exe'
    env = Environment(loader=FileSystemLoader('.'))
    template = env.get_template("SF_Template.html")
    template_vars = data
    html_string = template.render(template_vars)
    path_wkhtmltopdf = path_wkhtmltopdf_input
    config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
    options = {
    'page-size': 'A4',
    'margin-top': '0.75in',
    'margin-right': '0.75in',
    'margin-bottom': '0.75in',
    'margin-left': '0.75in',
    'encoding': "UTF-8",
    'enable-local-file-access': None,
    'no-outline': None
    }
    pdfkit.from_string(html_string
                   , f'sf_{data["SFId"]}.pdf'
                   , configuration = config
                   , options = options)
    return f'sf_{data["SFId"]}.pdf'


