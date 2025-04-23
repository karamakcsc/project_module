// Copyright (c) 2024, Ishaq and contributors
// For license information, please see license.txt

frappe.ui.form.on('Project Charter', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter for all rows in the child table when no project is selected
            frm.fields_dict['team_weekly_status_review_members'].grid.get_field('member_name').get_query = function(doc, cdt, cdn) {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members initially
                    }
                };
            };
            // Apply an empty filter for all rows in the child table when no project is selected
            frm.fields_dict['team_monthly_status_review_members'].grid.get_field('member_name').get_query = function(doc, cdt, cdn) {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members initially
                    }
                };
            };
            // Apply an empty filter for all rows in the child table when no project is selected
            frm.fields_dict['steering_committee_review_members'].grid.get_field('member_name').get_query = function(doc, cdt, cdn) {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members initially
                    }
                };
            };
        }
    },

    project: function(frm) {
        // Trigger when the project field changes in the parent form
        frm.fields_dict['team_weekly_status_review_members'].grid.get_field('member_name').get_query = function(doc, cdt, cdn) {
            let child = locals[cdt][cdn]; // Get the current child row
            if (frm.doc.project) {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            } else {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            }
        };
        // Trigger when the project field changes in the parent form
        frm.fields_dict['team_monthly_status_review_members'].grid.get_field('member_name').get_query = function(doc, cdt, cdn) {
            let child = locals[cdt][cdn]; // Get the current child row
            if (frm.doc.project) {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            } else {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            }
        };
        // Trigger when the project field changes in the parent form
        frm.fields_dict['steering_committee_review_members'].grid.get_field('member_name').get_query = function(doc, cdt, cdn) {
            let child = locals[cdt][cdn]; // Get the current child row
            if (frm.doc.project) {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            } else {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            }
        };
    }
});

// Script for Child Table
frappe.ui.form.on('team_weekly_status_review_members', { // Replace with your actual child table name
    name1: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn]; // Access the current row in the child table
        if (!frm.doc.project) {
            frappe.throw(__('Please select a project in the parent form first.'));
        }
    }
});
// Script for Child Table
frappe.ui.form.on('team_monthly_status_review_members', { // Replace with your actual child table name
    name1: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn]; // Access the current row in the child table
        if (!frm.doc.project) {
            frappe.throw(__('Please select a project in the parent form first.'));
        }
    }
});
// Script for Child Table
frappe.ui.form.on('steering_committee_review_members', { // Replace with your actual child table name
    name1: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn]; // Access the current row in the child table
        if (!frm.doc.project) {
            frappe.throw(__('Please select a project in the parent form first.'));
        }
    }
});




frappe.ui.form.on('Project Charter', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter for all rows in the child table when no project is selected
            frm.fields_dict['key_stakeholders'].grid.get_field('stakeholder_name').get_query = function(doc, cdt, cdn) {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members initially
                    }
                };
            };
        }
    },

    project: function(frm) {
        // Trigger when the project field changes in the parent form
        frm.fields_dict['key_stakeholders'].grid.get_field('stakeholder_name').get_query = function(doc, cdt, cdn) {
            let child = locals[cdt][cdn]; // Get the current child row
            if (frm.doc.project) {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            } else {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            }
        };
    }
});

// Script for Child Table
frappe.ui.form.on('key_stakeholders', { // Replace with your actual child table name
    name1: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn]; // Access the current row in the child table
        if (!frm.doc.project) {
            frappe.throw(__('Please select a project in the parent form first.'));
        }
    }
});




frappe.ui.form.on('Project Charter', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter on project_sponsor when the form loads and no project is selected
            frm.set_query('project_sponsor', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members initially
                    }
                };
            });
            // Apply an empty filter on project_manager when the form loads and no project is selected
            frm.set_query('project_manager', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members initially
                    }
                };
            });
        }
    },
    project: function(frm) {
        if (frm.doc.project) {
            // Apply filter to the project_sponsor field based on the selected project
            frm.set_query('project_sponsor', function() {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            });
            // Apply filter to the project_manager field based on the selected project
            frm.set_query('project_manager', function() {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            });
        } else {
            // Clear the project_sponsor field and apply an empty filter
            frm.set_value('project_sponsor', null);
            frm.set_query('project_sponsor', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            });
            // Clear the project_manager field and apply an empty filter
            frm.set_value('project_manager', null);
            frm.set_query('project_manager', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            });
        }
    }
});

frappe.ui.form.on('Project Charter', {
	onload: function (frm) {
        if (frm.doc.docstatus == 1) { // 1 = Submitted
            frm.set_read_only(); // Makes the form read-only
        }
    }
})