from flask import Blueprint

bp = Blueprint("attribute", __name__, url_prefix="/api/attribute")

from . import routes