import { camel } from 'change-case'
import capitalDashCase from './util/capital-dash-case'
import { CardVersion } from './vcard'

/**
 * Describes the format of a valid jCard property.
 * @example
 * ```json
 * [ "tel", { "type": [ "home", "voice" ], "group": "item1" }, "uri", "tel:+1-404-555-1213" ]
 * ```
 */
export type JCardProperty = [
	string,
	{ [key: string]: string | string[] },
	string,
	string | string[]
]
const ARRAY_TEXT_FIELDS: string[] = ['n', 'adr']

/** A vCard property. */
export class Property {
	private field: string = ''
	/**
	 * the value of the property.
	 * @example '(123) 456 7890'
	 */
	public value: string = ''
	/**
	 * the group of the property.
	 * @example 'item1'
	 */
	public group: string | undefined
	/**
	 * An jCard parameters object.
	 * @example
	 * {
	 * 	type: ['work', 'voice', 'pref'],
	 * 	value: 'uri'
	 * }
	 */
	public params: { [key: string]: string | string[] } = {}

	/**
	 * A class describing a single vCard property.
	 * Will almost always be a member of a
	 * {@link VCard}'s [props]{@link VCard.props} map.
	 *
	 * Accepts either 2-4 arguments, or 1 argument in jCard property format.
	 * @param arg the field, or a jCard property
	 * @param value
	 * @param params
	 * @param group
	 */
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
		const property = camel(name.pop() as string)
		const group = name.pop()
		const value = match[3]

		// ["TYPE=work,voice", "VALUE=uri"]
		const paramArray = match[2]
			? match[2].replace(/^;|;$/g, '').split(';') // remove leading semicolon
			: []

		for (const p of paramArray) {
			const parts = p.split('=')
			let k = camel(parts[0])
			let v = parts[1]
			if (v == null || v === '') {
				v = parts[0]
				k = 'type'
			}
			if (k === 'type') {
				// TODO what does this line do?
				// https://github.com/jhermsmeier/node-vcf/blob/a1a01dd815d1126b2c200aa4d1748feb323c48b8/lib/parse-lines.js#L27
				if (v[0] === '"' && v[v.length - 1] === '"' && v.indexOf(',') !== -1)
					v = v.slice(1, -1)
				v.toLowerCase()
					.split(',')
					.forEach(val => this.addParam(k, val))
				continue
			}
			this.addParam(k, v)
		}

		this.field = property
		this.value = value
		this.group = group
	}

	private parseFromJCardProperty(_jCardProp: JCardProperty) {
		const jCardProp = JSON.parse(JSON.stringify(_jCardProp))
		this.field = camel(jCardProp[0])
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

	/** Returns `true` if the property is empty. */
	public isEmpty(): boolean {
		return this.value == null && Object.keys(this.params).length === 0
	}

	/** Returns a readonly string of the property's field. */
	public getField(): string {
		return this.field + ''
	}

	/**
	 * Returns a `.vcf` formatted line.
	 * @param version (unfinished)
	 */
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

	/**
	 * Returns a JSON array in a [jCard property]{@link JCardProperty} format
	 */
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
