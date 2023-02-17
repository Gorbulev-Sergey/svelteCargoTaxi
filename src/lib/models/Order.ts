export class Order {
	constructor(
		public from?: string,
		public to?: string,
		public whenTake: Date = new Date(),
		public whenGive: Date = new Date(),
		public product?: string,
		public length?: number,
		public width?: number,
		public height?: number,
		public count?: number,
		public totalWeight?: number,
		public created: Date = new Date(),
		public description?: string
	) {}
}
