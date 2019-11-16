import camelCase from 'camelcase'
import capitalDashCase from './util/capital-dash-case'
import { CardVersion } from './vcard'

export type JCardProperty = [
	string,
	{ [key: string]: string | string[] },
	string,
	string | string[]
]
const ARRAY_TEXT_FIELDS: string[] = ['n', 'adr']

/** A vCard property */
export class Property {
	private field: string = ''
	public value: string = ''
	public group: string | undefined
	public params: { [key: string]: string | string[] } = {}

	constructor(
		arg: string | JCardProperty,
		value?: string,
		params?: { [key: string]: string | string[] },
		group?: string
	) {
		// Construct from arguments
		if (value !== undefined && typeof arg === 'string') {
			this.field = arg
			this.value = value
			this.params = params || {}
			this.group = group
		}

		// Construct from vcf property line
		else if (
			value === undefined &&
			params === undefined &&
			typeof arg === 'string'
		) {
			this.parseFromLine(arg)
		}

		// construct from jcard
		else if (
			value === undefined &&
			params === undefined &&
			typeof arg === 'object'
		) {
			this.parseFromJCardProperty(arg)
		}

		// invalid property
		else {
			throw new Error('invalid Property constructor')
		}
	}

	private parseFromLine(line: string): void {
		const pattern = /^([^;:]+)((?:;(?:[^;:]+))*)(?:\:([\s\S]+))?$/i

		const match = pattern.exec(line)
		if (!match) throw new Error('Invalid format for vcf line:\n' + line)

		const name = match[1].split('.')
		const property = name.pop()
		const group = name.pop()
		const value = match[3]

		// ["TYPE=work,voice", "VALUE=uri"]
		const paramArray = match[2]
			? match[2].replace(/^;|;$/g, '').split(';') // remove leading semicolon
			: []

		for (const p of paramArray) {
			const parts = p.split('=')
			let k = camelCase(parts[0])
			let v = parts[1]
			if (v == null || v === '') {
				v = parts[0]
				k = 'type'
			}
			if (k === 'type') {
				// TODO what does this line do?
				if (v[0] === '"' && v[v.length - 1] === '"' && v.indexOf(',') !== -1)
					v = v.slice(1, -1)
				v.toLowerCase()
					.split(',')
					.forEach(val => this.addParam(k, val))
				continue
			}
			this.addParam(k, v)
		}

		this.field = (property as string).toLowerCase()
		this.value = value
		this.group = group
	}

	private parseFromJCardProperty(_jCardProp: JCardProperty) {
		const jCardProp = JSON.parse(JSON.stringify(_jCardProp))
		this.field = camelCase(jCardProp[0])
		this.params = jCardProp[1]
		this.params['value'] = jCardProp[2]
		this.value = Array.isArray(jCardProp[3])
			? jCardProp[3].join(';')
			: jCardProp[3]
	}

	private addParam(key: string, value: string) {
		if (Array.isArray(this.params[key])) {
			;(this.params[key] as string[]).push(value)
		} else if (this.params[key] != null) {
			this.params[key] = [this.params[key] as string, value]
		} else {
			this.params[key] = value
		}
	}

	public isEmpty(): boolean {
		return this.value == null && Object.keys(this.params).length === 0
	}

	public getField(): string {
		return this.field
	}

	public toString(version?: CardVersion): string {
		const paramReducer = (accumulator: string, key: string) => {
			const param = this.params[key]
			return (
				accumulator +
				';' +
				key.toUpperCase() +
				'=' +
				(Array.isArray(param) ? param.join(',') : param)
			)
		}

		return (
			(this.group ? this.group.toLowerCase() + '.' : '') +
			capitalDashCase(this.field) +
			// (Object.keys(this.params).length > 0 ? ';' : '') +
			Object.keys(this.params).reduce(paramReducer, '') +
			':' +
			this.value
		)
	}

	public toJSON(): JCardProperty {
		const newParams = { ...this.params }

		delete newParams['value']

		return [
			this.field,
			newParams,
			(this.params['value'] as string) || 'text',
			ARRAY_TEXT_FIELDS.includes(this.field)
				? this.value.split(';')
				: this.value
		]
	}
}
