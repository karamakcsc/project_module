// Copyright (c) 2024, Ishaq and contributors
// For license information, please see license.txt

frappe.listview_settings['Risks Log'] = {
    hide_name_column: true,
};


frappe.ui.form.on('Risks Log', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter on responsible_party when the form loads and no project is selected
            frm.set_query('responsible_party', function() {
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
            // Apply filter to the responsible_party field based on the selected project
            frm.set_query('responsible_party', function() {
                return {
                    filters: {
                        project: frm.doc.project // Show members linked to the selected project only
                    }
                };
            });
        } else {
            // Clear the responsible_party field and apply an empty filter
            frm.set_value('responsible_party', null);
            frm.set_query('responsible_party', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all members
                    }
                };
            });
        }
    }
});


frappe.ui.form.on('Risks Log', {
    onload: function(frm) {
        if (!frm.doc.project) {
            // Apply an empty filter on task_related when the form loads and no project is selected
            frm.set_query('task_related', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all tasks initially
                    }
                };
            });
        }
    },
    project: function(frm) {
        if (frm.doc.project) {
            // Apply filter to the task_related field based on the selected project
            frm.set_query('task_related', function() {
                return {
                    filters: {
                        project: frm.doc.project // Show tasks linked to the selected project only
                    }
                };
            });
        } else {
            // Clear the task_related field and apply an empty filter
            frm.set_value('task_related', null);
            frm.set_query('task_related', function() {
                return {
                    filters: {
                        name: ['is', 'not set'] // Prevent listing all tasks
                    }
                };
            });
        }
    }
});

