var rp = require('request-promise').defaults({ transform: function(data) {
    return JSON.parse(data);
}});
var Promise = require('bluebird');

function getService(url, type, name) {
    var servicesUrl = name ? url + '/services/of/name/' + name : url + '/services/of/type/' + type;

    return rp(servicesUrl).then(function(data) {
        return data.services[data.services.length - 1];
    }).then(function(service) {
        return rp(url + service);
    }).then(function(service) {
        console.log('Got response for type ' + type + ': ' + JSON.stringify(service));
        return {
            type: service.service,
            url: service.uri
        }
    });
}

module.exports = function(url, types) {
    var lookups = [];
    types.forEach(function(type) {
        lookups.push(getService(url, type.value, type.name));
    });

    return Promise.all(lookups);
};
