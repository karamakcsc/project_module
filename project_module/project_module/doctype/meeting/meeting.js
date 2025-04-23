// Copyright (c) 2024, Ishaq and contributors
// For license information, please see license.txt

frappe.ui.form.on('Meeting', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter for all rows in the child table when no project is selected
            frm.fields_dict['attendees'].grid.get_field('name1').get_query = function(doc, cdt, cdn) {
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
        frm.fields_dict['attendees'].grid.get_field('name1').get_query = function(doc, cdt, cdn) {
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
frappe.ui.form.on('attendees', { // Replace with your actual child table name
    name1: function(frm, cdt, cdn) {
        let child = locals[cdt][cdn]; // Access the current row in the child table
        if (!frm.doc.project) {
            frappe.throw(__('Please select a project in the parent form first.'));
        }
    }
});

frappe.ui.form.on('Meeting', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter on contact_person when the form loads and no project is selected
            frm.set_query('contact_person', function() {
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
            // Apply filter to the contact_person field based on the selected project
            frm.set_query('contact_person', function() {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            });
        } else {
            // Clear the contact_person field and apply an empty filter
            frm.set_value('contact_person', null);
            frm.set_query('contact_person', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            });
        }
    }
});


frappe.ui.form.on('Meeting', {
    onload: function(frm) {
        frm.fields_dict["actions"].grid.get_field("milestone").get_query = function(doc, cdt, cdn) {
            let child = locals[cdt][cdn]; // Reference to the current row in the child table
            return {
                filters: {
                    project: frm.doc.project // Filters the milestone field based on the project field in the parent
                }
            };
        };
    }
});

frappe.ui.form.on('Meeting', {
    meeting_schedule: function(frm) {
        if (frm.doc.meeting_schedule) {
            // Clear Child Table Attendees
            frm.clear_table("attendees");

            // Fetch data from the Participants Child Table of the selected Meeting Schedule
            frappe.call({
                method: "frappe.client.get",
                args: {
                    doctype: "Meeting Schedule",
                    name: frm.doc.meeting_schedule
                },
                callback: function(r) {
                    if (r.message) {
                        let participants = r.message.participants || []; // Ensure participants is handled safely
                        
                        if (participants.length > 0) {
                            participants.forEach(row => {
                                let new_row = frm.add_child("attendees");
                                new_row.party = row.party;
                                new_row.party_type = row.party_type;
                                new_row.role = row.role;
                                new_row.name1 = row.name1;
                                new_row.email = row.email;
                            });
                            frm.refresh_field("attendees");
                        } else {
                            frappe.msgprint(__('No participants found for the selected Meeting Schedule.'));
                        }
                    }
                }
            });
        } else {
            // Clear Child Table Attendees if Meeting Schedule is not selected
            frm.clear_table("attendees");
            frm.refresh_field("attendees");
        }
    }
});
