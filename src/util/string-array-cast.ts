export const stringArrayCast = (stringOrArray: string | string[]): string[] => {
	if (Array.isArray(stringOrArray)) {
		return stringOrArray
	} else {
		return [stringOrArray]
	}
}
