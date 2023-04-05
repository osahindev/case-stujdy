from flask import Blueprint

bp = Blueprint('imports', __name__, url_prefix="/api/import")

from . import routes