import { Attribute, NewProduct } from "../../../redux/slices/product/interfaces/NewProduct";
import Product from "../../../redux/slices/product/interfaces/Product";

export const handleAttribute = (form: NewProduct|Product, attribute_id: number, attribute_data_id: number) => {
    const attribute_exist: Boolean = Object.keys(form).includes("attributes") && form.attributes.filter((att) => att.attribute_id === attribute_id).length > 0;
    let newForm = form;

    if (attribute_exist) {
        newForm = { ...newForm, attributes: [...newForm.attributes.filter((att) => att.attribute_id !== attribute_id)] };
    }

    return { ...newForm, attributes: [...newForm.attributes, { attribute_id: attribute_id, attribute_data_id: attribute_data_id } as Attribute] };
}

export const getAttribute = (form: NewProduct|Product, attribute_id: number) => {
    if (!Object.keys(form).includes("attributes")) {
        return null;
    }
    const data = form.attributes.filter((att) => att.attribute_id === attribute_id);

    return data.length > 0 ? data[0].attribute_data_id : null;
}