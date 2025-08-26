
export type Notification = {
	id: string,
	type: 'warning' | 'success' | 'error' | 'info',
	duration: number,
	title: string,
	description: string,
}
