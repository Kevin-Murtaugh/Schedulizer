module.exports = {
    select: function(value, options){
        return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
    }
    
}