import { VCard, normalizeCard, JCard } from './vcard'
import { Property } from './property'
import { readFileSync } from 'fs'

let card: VCard
let cards: VCard[]

const testFileName = (name: string) => __dirname + '/test_data/' + name

describe('utilities', () => {
	test('normalizeCard() should trim empty lines', () => {
		const data = readFileSync(testFileName('empty-lines.vcf'))
		const str = normalizeCard(data)

		expect(/^\s*$/m.test(str)).toBe(true)
		expect(str.indexOf('\r\nREV:2014-03-01T22:11:10Z\r\nEND')).not.toBe(-1)
	})
})

describe('VCard instantiation', () => {
	test('create empty VCard', () => {
		expect(new VCard()).toBeDefined()
	})

	test('create VCard from .vcf string or Buffer', () => {
		const data = readFileSync(testFileName('vcard-4.0.vcf'))
		expect(new VCard(data)).toBeDefined()
		expect(new VCard(String(data))).toBeDefined()
	})

	test('create VCard from JCard', () => {
		const json = require('./test_data/jcard')
		expect(new VCard(json)).toBeDefined()
	})
})

describe('VCard class', () => {
	beforeEach(() => {
		const data = readFileSync(testFileName('vcard-4.0.vcf'))
		card = new VCard(data)
	})

	test('should not have BEGIN prop', () => {
		expect(card.has('begin')).toBe(false)
	})

	test('should not have END prop', () => {
		expect(card.has('end')).toBe(false)
	})

	test('version number', () => {
		expect(card.version).toBe('4.0')
		expect(card.get('version')).toBeDefined()
		expect(card.get('version')[0].value).toBe('4.0')
	})

	test('name', () => {
		expect(card.get('n')[0].value).toBe('Gump;Forrest;;;')
	})

	test('full name', () => {
		expect(card.get('fn')[0].value).toBe('Forrest Gump')
	})

	test('groups', () => {
		expect(card.get('tel')[2].group).toBe('item1')
	})

	test('set()', () => {
		card.set('role', 'Communications')
		expect(card.get('role')[0].value).toBe('Communications')

		card.set('role', 'Janitor', { type: 'pref' }, 'group1')
		expect(card.get('role')[0].value).toBe('Janitor')
		expect(card.get('role')[0].params['type']).toBe('pref')
		expect(card.get('role')[0].group).toBe('group1')

		card.set(new Property('nickname', 'Cool Gump'))
		expect(card.get('nickname')[0].value).toBe('Cool Gump')
	})

	test('set() overwrites arrays', () => {
		expect(card.get('tel').length).toBe(3)
		card.set('tel', 'tel:+11234567890')
		expect(card.get('tel').length).toBe(1)
		expect(card.get('tel')[0].value).toBe('tel:+11234567890')
	})

	test('add()', () => {
		expect(card.get('tel').length).toBe(3)

		card.add('tel', 'tel:+11234567890')
		expect(card.get('tel').length).toBe(4)

		card.add('tel', 'tel:+16666666666', { type: ['work', 'pref'] }, 'group1')
		expect(card.get('tel').length).toBe(5)
		expect(card.get('tel')[4].value).toBe('tel:+16666666666')
		expect(card.get('tel')[4].params['type']).toStrictEqual(['work', 'pref'])
		expect(card.get('tel')[4].group).toBe('group1')

		card.add(
			new Property(
				'tel',
				'tel:+12222222222',
				{ type: ['work', 'pref'] },
				'group1'
			)
		)
		expect(card.get('tel').length).toBe(6)
		expect(card.get('tel')[5].value).toBe('tel:+12222222222')
		expect(card.get('tel')[5].params['type']).toStrictEqual(['work', 'pref'])
		expect(card.get('tel')[5].group).toBe('group1')

		// console.log(card.toString())
	})

	test('toString() renders populated properties', () => {
		const c = new VCard()
		c.set('tel', '000')
		expect(/TEL:000/i.test(c.toString())).toBe(true)
	})

	test('toString() does not render empty properties', () => {
		const c = new VCard()
		c.set('tel', undefined)
		expect(/TEL/i.test(c.toString())).toBe(false)
	})

	test('toString prefixes group', () => {
		const c = new VCard()
		card.set('tel', '000', {}, 'item1')
		expect(/item1.TEL:00/i.test(card.toString())).toBe(true)
	})

	test('toJSON()', () => {
		const json: JCard = require('./test_data/jcard')
		const c = new VCard(json)
		expect(c.toJCard()).toEqual(json)
	})
})
