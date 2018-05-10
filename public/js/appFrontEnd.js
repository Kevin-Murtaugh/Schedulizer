$("document").ready(function() {
    const getDepartment = function() {
        $("#department").on("change", function() {
            const department = $("#department").val();
            if(department === "FOH") {
                $.post("/add-shift", department)
                .done(function(data) {
                    console.log(data);
                });
            } else {
                $.post("/add-shift", department)
                .done(function(data) {
                    console.log(data);
                }); 
            }
        });
    }

    getDepartment();
});