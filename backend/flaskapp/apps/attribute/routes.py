from . import bp
from flask import jsonify, request
from ...services.AttributeService import attribute_service
from ...services.AttributeDataService import attribute_data_service
from ..auth.utils import token_required
from flask_sieve import validate
from .validators import NewAttributeRequest, UpdateAttributeRequest, UpdateAttributeDataRequest, NewAttributeDataRequest

@bp.route("/", methods=["GET",])
@token_required
def all(current_user):
    attributes = attribute_service.get_all()
    return jsonify({"data": [attribute.to_dict() for attribute in attributes], "result": "OK"})

@bp.route("/with_data", methods=["GET"])
@token_required
def with_data(current_user):
    attributes = attribute_service.get_all_with_data()
    return jsonify({"data": [attribute.to_dict_with_data() for attribute in attributes], "result": "OK"})

@bp.route('/create', methods=["POST"])
@token_required
@validate(NewAttributeRequest)
def create(current_user):
    data = request.get_json()
    
    if "name" in data:
        name = data["name"]
        
        if name:
            attribute = attribute_service.create(name=name)
            
            if attribute != False:
                return jsonify({"data": attribute.to_dict(), "result": "OK"})

    return jsonify({"data": [], "result": "NOTOK"})

@bp.route('/update', methods=["PATCH"])
@token_required
@validate(UpdateAttributeRequest)
def update(current_user):
    json_data = request.get_json()
    
    if "id" in json_data and "name" in json_data:
        id = json_data["id"]
        name = json_data["name"]
        
        attribute = attribute_service.update(id, name)
        
        if attribute != False:
            return jsonify({"data": attribute.to_dict(), "result": "OK"})

    return jsonify({"data": [], "result": "NOTOK"})


@bp.route('/delete', methods=["DELETE"])
@token_required
def delete(current_user):
    data = request.get_json()
    
    if "id" in data:
        id = data["id"]
        
        result = attribute_service.destroy(id)
        
        if result != False:
            return jsonify({"data": result, "result": "OK"})

    return jsonify({"data": [], "result": "NOTOK"})

@bp.route('/find_with_data', methods=["GET",])
@token_required
def find_with_data(current_user):
    args = request.args
    
    if "id" in args:
        id = args["id"]
        
        data = attribute_service.find_with_data(id)
        
        return jsonify({"data": data.to_dict_with_data(), "result": "OK"})
        
    return jsonify({"data": [], "result": "NOTOK"})

@bp.route('/data/create', methods=["POST"])
@token_required
@validate(NewAttributeDataRequest)
def data_create(current_user):
    json_data = request.get_json()
    
    if "value" in json_data and "attribute_id" in json_data:
        attribute_id = int(json_data["attribute_id"])
        value = json_data["value"]
        
        attribute_data = attribute_data_service.create(attribute_id=attribute_id, value=value)
        
        if attribute_data != False:
            return jsonify({"data": attribute_data.to_dict(), "result": "OK"});

    return jsonify({"data": [], "result": "NOTOK"})

@bp.route('/data/update', methods=["PATCH"])
@token_required
@validate(UpdateAttributeDataRequest)
def data_update(current_user):
    json_data = request.get_json()
    
    if "id" in json_data and "value" in json_data:
        id = json_data["id"]
        value = json_data["value"]
        
        attribute_data = attribute_data_service.update(id, value)
        
        if attribute_data != False:
            return jsonify({"data": attribute_data.to_dict(), "result": "OK"})

    return jsonify({"data": [], "result": "NOTOK"})
    

@bp.route('/data/delete', methods=["DELETE"])
@token_required
def data_delete(current_user):
    json_data = request.get_json()
    
    if "id" in json_data:
        id = json_data["id"]
        
        result = attribute_data_service.destroy(id)
        
        if result != False:
            return jsonify({"data": result, "result": "OK"})

    return jsonify({"data": [], "result": "NOTOK"})