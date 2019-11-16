export default function capitalDashCase(s: string): string {
	return s.replace(/([A-Z])/g, '-$1').toUpperCase()
}
