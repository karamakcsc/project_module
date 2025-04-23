// Copyright (c) 2024, Ishaq and contributors
// For license information, please see license.txt

frappe.views.calendar["Meeting Schedule"] = {
	field_map: {
		"start": "scheduled_from",
		"end": "scheduled_to",
		"id": "name",
		"title": "meeting_agenda"
	}
};

frappe.ui.form.on('Meeting Schedule', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter for all rows in the child table when no project is selected
            frm.fields_dict['participants'].grid.get_field('name1').get_query = function(doc, cdt, cdn) {
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
        frm.fields_dict['participants'].grid.get_field('name1').get_query = function(doc, cdt, cdn) {
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
frappe.ui.form.on('participants', { // Replace with your actual child table name
    name1: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn]; // Access the current row in the child table
        if (!frm.doc.project) {
            frappe.throw(__('Please select a project in the parent form first.'));
        }
    }
});

frappe.ui.form.on('Meeting Schedule', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter on meeting_arranged_by when the form loads and no project is selected
            frm.set_query('meeting_arranged_by', function() {
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
            // Apply filter to the meeting_arranged_by field based on the selected project
            frm.set_query('meeting_arranged_by', function() {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            });
        } else {
            // Clear the meeting_arranged_by field and apply an empty filter
            frm.set_value('meeting_arranged_by', null);
            frm.set_query('meeting_arranged_by', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            });
        }
    }
});
