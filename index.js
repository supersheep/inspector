
// Opt in to strict mode of JavaScript, [ref](http://is.gd/3Bg9QR)
// Use this statement, you can stay away from several frequent mistakes
'use strict';


var Dyer = require("dyer");
var Event = require("emitter");

function Inspector(opt){
    var doc = this.doc = opt.doc || document;
    var self = this;

    var dyer = this.dyer = new Dyer({
        doc:doc,
        active:true
    });

    this._active = opt.active || false;

    doc.addEventListener("mouseover", function(e){
        if(self._active && e.target != doc.body){
            dyer.clear();
            dyer.dye(e.target);
        }
    });

    doc.addEventListener("click", function(e){
        if(self._active){
            e.stopPropagation();
            e.preventDefault();
            self.emit("pick",e, e.target);
        }
    });
}

Event(Inspector.prototype);

Inspector.prototype.setActive = function(active){
    this._active = active
}

Inspector.prototype.toggleActive = function(){
    this._active = !this._active;
    if(!this._active){
        this.dyer.clear();
    }
}

module.exports = Inspector;
