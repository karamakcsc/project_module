# custom_app/custom_app/doctype/your_doctype/your_doctype.py
import frappe

@frappe.whitelist()
def get_context_list(doctype, filters, fieldname):
    context = frappe.db.get_list(doctype, filters = filters, fields = fieldname)
    return context

@frappe.whitelist()
def get_context_value(doctype, filters, fieldname):
    context = frappe.db.get_value(doctype, filters = filters, fields = fieldname)
    return context

@frappe.whitelist()
def get_status_options():
    query = """
        SELECT options
        FROM `tabDocField`
        WHERE parent = 'Task' AND fieldname = 'status'
    """
    result = frappe.db.sql(query, as_dict=True)
    
    if result and result[0].options:
        return result[0].options.split("\n")  # Split options by newline
    else:
        return []  # Return an empty list if no options found

@frappe.whitelist()
def get_task_status_options():
    query = """
        SELECT options
        FROM `tabDocField`
        WHERE parent = 'Task' AND fieldname = 'status'
    """
    result = frappe.db.sql(query, as_dict=True)
    
    if result and result[0].options:
        return result[0].options.split("\n")  # Split options by newline
    else:
        return []  # Return an empty list if no options found

# Example Python route in Frappe to get project data
@frappe.whitelist()
def get_project(project_id):
    project = frappe.get_doc('Project', project_id)
    return project.as_dict()



@frappe.whitelist()
def your_route():
    project_name = frappe.form_dict.selectedProjectId  # Get the project ID from the form submission
    project = frappe.get_doc('Project', project_name)  # Fetch the project document
    # Now you can render a template or return JSON data as needed
    return frappe.render_template('erpnext/erpnext/templates/pages/MyPage/wsr.html', {'project': project})

