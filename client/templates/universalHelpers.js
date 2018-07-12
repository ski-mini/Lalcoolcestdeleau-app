Template.registerHelper('equals', (a1, a2) => {
    return a1 === a2;
});

Template.registerHelper( 'notEquals', ( a1, a2 ) => {
    return a1 !== a2;
});

Template.registerHelper('and', (a, b) => {
    return a && b;
});

Template.registerHelper('or', (a, b) => {
    return a || b;
});

Template.registerHelper('arrayify',function(obj){
    var result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});