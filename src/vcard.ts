import foldLine from 'foldline'
import { JCardProperty, Property } from './property'

export type CardVersion = '2.1' | '3.0' | '4.0'

export type JCard = ['vcard', JCardProperty[]]

export class VCard {
	public static mimeType: 'text/vcard' = 'text/vcard'
	public static extension: '.vcf' = '.vcf'
	public static versions: CardVersion[] = ['2.1', '3.0', '4.0']
	public static eol: '\r\n' = '\r\n'

	public version: CardVersion = VCard.versions[VCard.versions.length - 1]
	public props: Map<string, Property[]>

	constructor(input?: string | Buffer | JCard) {
		this.props = new Map<string, Property[]>()

		if (!input) return
		// read from vCard
		else if (typeof input === 'string' || input instanceof Buffer) {
			this.parseFromVcf(input)
		}

		// read from jCard
		else if (typeof input === 'object') {
			this.parseFromJCard(input)
		} else throw new Error('error reading vcard')
	}

	private parseFromVcf(vcf: string | Buffer) {
		const lines = normalizeCard(vcf).split(/\r\n/g)

		// keep for error messages
		const begin = lines[0]
		const version = lines[1]
		const end = lines[lines.length - 1]

		if (!/BEGIN:VCARD/i.test(begin))
			throw new SyntaxError(
				`Invalid vCard: Expected "BEGIN:VCARD" but found "${begin}"`
			)

		if (!/END:VCARD/i.test(end))
			throw new SyntaxError(
				`Invalid vCard: Expected "END:VCARD" but found "${end}"`
			)

		// TODO: For version 2.1, the VERSION can be anywhere between BEGIN & END
		if (!/VERSION:\d\.\d/i.test(version))
			throw new SyntaxError(
				`Invalid vCard: Expected "VERSION:\\d.\\d" but found "${version}"`
			)

		this.version = version.substring(8, 11) as CardVersion

		if (!VCard.isSupported(this.version))
			throw new Error(`Unsupported version "${this.version}"`)

		lines.forEach(line => {
			const p = new Property(line)
			const ignoreProps = ['begin', 'end']
			if (!ignoreProps.includes(p.getField())) this.add(new Property(line))
		})
	}

	private parseFromJCard(_json: JCard) {
		const json: JCard = JSON.parse(JSON.stringify(_json))
		if (!/vcard/i.test(json[0])) throw new SyntaxError('Incorrect jCard format')

		json[1].forEach(jprop => this.add(new Property(jprop)))
	}

	public get(key: string, type?: string): Property[] {
		return this.props.get(key) || []

		// TODO with type filter-er
	}

	public set(
		arg: string | Property,
		value?: string,
		params?: { [key: string]: string | string[] },
		group?: string
	): Property {
		if (typeof arg === 'string') {
			const field = String(arg)
			const newProp = new Property(field, value, params, group)
			this.props.set(field, [newProp])
			return newProp
		} else if (arg instanceof Property) {
			const field = arg.getField()
			this.props.set(field, [arg])
			return arg
		} else
			throw new Error(
				'invalid argument of VCard.set(), expects ' +
					'string arguments or a Property'
			)
	}

	public add(
		arg: string | Property,
		value?: string,
		params?: { [key: string]: string | string[] },
		group?: string
	): Property {
		// string arguments
		if (typeof arg === 'string') {
			const field = String(arg)
			const newProp = new Property(field, value, params, group)
			if (this.props.get(field)) this.props.get(field)?.push(newProp)
			else this.props.set(field, [newProp])
			return newProp
		}

		// Property arguments
		else if (arg instanceof Property) {
			const field = arg.getField()
			if (this.props.get(field)) this.props.get(field)?.push(arg)
			else this.props.set(field, [arg])
			return arg
		}

		// incorrect arguments
		else
			throw new Error(
				'invalid argument of VCard.add(), expects ' +
					'string arguments or a Property'
			)
	}

	public remove(
		arg: string | Property,
		paramFilter?: { [key: string]: string | string[] }
	) {
		// string arguments
		if (typeof arg === 'string') {
			//TODO filter by param
			this.props.delete(arg)
		}

		// Property argument
		else if (arg instanceof Property) {
			const propArray = this.props.get(arg.getField())
			if (!propArray?.includes(arg))
				throw new Error(
					`Attempted to remove property VCard does not have: ${arg}`
				)

			propArray.splice(propArray.indexOf(arg))
			if (propArray.length === 0) this.props.delete(arg.getField())
		}

		// incorrect arguments
		else
			throw new Error(
				'invalid argument of VCard.remove(), expects ' +
					'string and optional param filter or a Property'
			)
	}

	public has(field: string): boolean {
		return this.props.has(field)
	}

	public toString(version?: CardVersion): string {
		const v = version || this.version
		return formatCard(this, v)
	}

	public toJCard(): JCard {
		const data: JCardProperty[] = [['version', {}, 'text', '4.0']]

		// this.props.forEach((props, field) => {
		// 	if (field === 'version') return
		// 	props.forEach(prop => {
		// 		if (prop.isEmpty()) return
		// 		data.push(prop.toJSON())
		// 	})
		// })

		for (const [field, props] of this.props.entries()) {
			if (field === 'version') continue
			for (const prop of props) {
				if (prop.isEmpty()) continue
				data.push(prop.toJSON())
			}
		}

		return ['vcard', data]
	}

	// public toJSON(): JCard {
	// 	return this.toJCard()
	// }

	public static fromMultiCardString(input: string | Buffer): VCard[] {
		const cardStrings = String(input).split(/(?=BEGIN\:VCARD)/gi)
		return cardStrings.map(cardString => new VCard(cardString))
	}

	public static isSupported(version: string) {
		return (
			/^\d\.\d$/.test(version) &&
			VCard.versions.includes(version as CardVersion)
		)
	}
}

export const normalizeCard = (input: string | Buffer): string => {
	return (
		String(input)
			// Trim whitespace
			.replace(/^[\s\r\n]+|[\s\r\n]+$/g, '')
			// Trim blank lines
			.replace(/(\r\n)[\x09\x20]?(\r\n)|$/g, '$1')
			// Unfold folded lines
			.replace(/\r\n[\x20\x09]/g, '')
	)
}

export const formatCard = (card: VCard, _version: CardVersion) => {
	const version =
		_version || card.version || VCard.versions[VCard.versions.length - 1]

	if (!VCard.isSupported(version))
		throw new Error(`Unsupported vCard version "${version}"`)

	const vcf: string[] = ['BEGIN:VCARD', 'VERSION:' + version]

	card.props.forEach((props, field) => {
		if (field === 'version') return
		props.forEach(prop => {
			if (prop.isEmpty()) return
			vcf.push(foldLine(prop.toString(version), 75))
		})
	})

	vcf.push('END:VCARD')

	return vcf.join(VCard.eol)
}