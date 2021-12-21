
export default interface IEvent {
	readonly name: string,
	readonly once: boolean,
	execute(...args: any[]): void;
}