class Canvas {
	constructor(width, height, bg, elem) {
		this.width = width;
		this.height = height;
		this.bg = bg;
		this.canvas = elem;

		this.__init();
	}

	__init() {
		this.ctx = this.canvas.getContext("2d");
		this.ctx.width = this.canvas.width = this.width;
		this.ctx.height = this.canvas.height = this.height;
	}
}