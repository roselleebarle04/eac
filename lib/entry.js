Entry.count = function(fn){
db.llen('entries', fn);
};