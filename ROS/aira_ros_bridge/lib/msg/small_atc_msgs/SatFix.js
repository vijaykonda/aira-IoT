// Init libs
var ROSLIB = require('roslib');
var Helpers = require('../helpers');
// Solidity message definition
var bytecode = '6060604052604051606080608683395060c06040525160805160a05160009283556001919091556002556050908190603690396000f3606060405260e060020a60003504634fd7d76a8114602e578063589af69c146036578063d906896a14603e575b005b604660005481565b604660015481565b604660025481565b6060908152602090f3'; 
var abi = [{"constant":true,"inputs":[],"name":"latitude","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":true,"inputs":[],"name":"longitude","outputs":[{"name":"","type":"int256"}],"type":"function"},{"constant":true,"inputs":[],"name":"altitude","outputs":[{"name":"","type":"int256"}],"type":"function"},{"inputs":[{"name":"_latitude","type":"int256"},{"name":"_longitude","type":"int256"},{"name":"_altitude","type":"int256"}],"type":"constructor"}];
// JSON message converter
function eth2json(address, web3) {
    var msg = Helpers.getContract(abi, address, web3);
    return {
        // Message fields START
        latitude: parseInt(msg.latitude()) / 1000000.0,
        longitude: parseInt(msg.longitude()) / 1000000.0,
        altitude: parseInt(msg.altitude()) / 1000000.0
        // Message fields END
    };
}
// Setup exports
module.exports = {
/*
 * This message converter should be autogenerated from
 * ROS message definition language.
 * TODO: converter implementation.
 */
    abi: abi,
    eth2json: eth2json,
    eth2ros: function(address, web3) {return new ROSLIB.Message(eth2json(address, web3))},
    ros2eth: function(msg, web3, fun) {
    var latitude = msg.latitude * 1000000;
    var longitude = msg.longitude * 1000000;
    var altitude = msg.altitude * 1000000;
    var args = [latitude, longitude, altitude];
    Helpers.newContract(abi, bytecode, web3, args, fun);
}
}