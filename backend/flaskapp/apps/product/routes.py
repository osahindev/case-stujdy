from . import bp
from flask import request
from flask_sieve import validate
from flask import jsonify
from ...services.ProductService import product_service
from .dto import Attribute, Product
from .validators import NewProductRequest, UpdateProductRequest
from ..auth.utils import token_required

@bp.route('/', methods=["GET"])
@token_required
def all(current_user):    
    args = request.args
    
    if "page" in args:
        page = int(args["page"])
    else:
        page = 1
        
    if "category_id" in args:
        category_id = int(args["category_id"])
    else:
        category_id = None
        
    if "stock_amount" in args and request.args.get("stock_amount") != 'NaN':
        stock_amount = int(request.args.get("stock_amount"))
    else:
        stock_amount = None
        
    if "stock_details" in args:
        stock_details = args["stock_details"]
    else:
        stock_details = "fazla"
        
    products = product_service.get_all_parents_paginate(page=page, per_page=10, name=request.args.get("name"), category_id=category_id, stock_amount=stock_amount, stock_details=stock_details)
    return jsonify({"data": products.to_dict(), "result": "OK"})

@bp.route('/subProducts', methods=["GET"])
@token_required
def subProducts(current_user):
    args = request.args
    
    if "page" in args:
        page = int(args["page"])
    else:
        page = 1
        
    if "category_id" in args:
        category_id = int(args["category_id"])
    else:
        category_id = None
        
    if "stock_amount" in args and request.args.get("stock_amount") != 'NaN':
        stock_amount = int(request.args.get("stock_amount"))
    else:
        stock_amount = None
        
    if "stock_details" in args:
        stock_details = args["stock_details"]
    else:
        stock_details = "fazla"
        
    if "parent_id" in args:
        parent_id = args["parent_id"]
        
        product = product_service.get_all_sub_products(parent_id=parent_id, page=page, per_page=10, name=request.args.get("name"), category_id=category_id, stock_amount=stock_amount, stock_details=stock_details)
        
        return jsonify({"data": product.to_dict(), "result": "OK"})
    
    return jsonify({"data": [], "result": "NOTOK"})
        
    

@bp.route('/details', methods=["GET"])
@token_required
def details(current_user):
    args = request.args
    
    if "id" in args:
        id = args["id"]
        
        product = product_service.get_details(id)
        
        return jsonify({"data": product.to_dict(), "result": "OK"})
    
    return jsonify({"data": [], "result": "NOTOK"})

@bp.route('/update', methods=["PATCH"])
@token_required
@validate(UpdateProductRequest)
def update(current_user):
    data = request.get_json()
    
    attributes = []
    
    for attribute in data["attributes"]:
        attributes.append(Attribute(attribute_id=attribute["attribute_id"], attribute_data_id=attribute["attribute_data_id"]))
        
    if "parent_id" in data:
        parent_id = data["parent_id"]
    else:
        parent_id = None
        
    product = Product(id=data["id"], sku=data["sku"], parent_id=parent_id, name=data["name"], category_id=data["category_id"], stock_amount=data["stock_amount"], price=data["price"], attributes=attributes)
    
    result = product_service.update(product=product)
    
    if result != False:
        return jsonify({"data": result.to_dict(), "result": "OK"})
    
    return jsonify({"data": [], "result": "NOTOK"})
    
    
@bp.route('/create', methods=["POST",])
@token_required
@validate(NewProductRequest)
def create(current_user):
    data = request.get_json()
    
    attributes = []
    
    for attribute in data["attributes"]:
        attributes.append(Attribute(attribute_id=attribute["attribute_id"], attribute_data_id=attribute["attribute_data_id"]))
        
    if "parent_id" in data:
        parent_id = data["parent_id"]
    else:
        parent_id = None
        
    product = Product(sku=data["sku"], parent_id=parent_id, name=data["name"], category_id=data["category_id"], stock_amount=data["stock_amount"], price=data["price"], attributes=attributes)
    
    result = product_service.create(product=product)
    
    if result != False:
        return jsonify({"data": result.to_dict(), "result": "OK"})
    
    return jsonify({"data": [], "result": "NOTOK"})

@bp.route('/delete', methods=["DELETE"])
@token_required
def delete(current_user):
    data = request.get_json()
    
    if "id" in data:
        id = data["id"]
        
        result = product_service.delete(id)
        
        if result:
            return jsonify({"data": id, "result": "OK"})
        
    return jsonify({"data": [], "result": "NOTOK"})