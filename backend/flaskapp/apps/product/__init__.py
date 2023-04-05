from flask import Blueprint

bp = Blueprint('product', __name__, url_prefix="/api/product")

from . import routes