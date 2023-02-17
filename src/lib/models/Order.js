export class Order {
	constructor(
		product = null,
		from = null,
		to = null,
		whenTake = new Date().toISOString(),
		whenGive = new Date().toISOString(),
		length = null,
		width = null,
		height = null,
		count = null,
		totalWeight = null,
		created = new Date().toISOString(),
		description = null
	) {
		(this.product = product),
			(this.from = from),
			(this.to = to),
			(this.whenTake = whenTake),
			(this.whenGive = whenGive),
			(this.length = length),
			(this.width = width),
			(this.height = height),
			(this.count = count),
			(this.totalWeight = totalWeight),
			(this.created = created),
			(this.description = description);
	}
}
