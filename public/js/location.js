export class Location {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    static sort(map, width, height) {
        var x = Math.floor(Math.random() * (map.getLimit('right', width) - map.getLimit('left', width)) + map.getLimit('left', width));
        var y = Math.floor(Math.random() * (map.getLimit('bottom', height) - map.getLimit('top', height)) + map.getLimit('top', height));
        return new this(x, y);
    }
}