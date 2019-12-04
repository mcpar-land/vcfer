import { VCard, normalizeCard, JCard } from './vcard'
import { Property } from './property'
import { readFileSync, readdirSync } from 'fs'

let card: VCard

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

	test('create multiple', () => {
		const cards = VCard.fromMultiCardString(
			readFileSync(testFileName('multiple.vcf'))
		)
		expect(cards.length).toBe(3)
	})

	test('read all cards in test data directory', async () => {
		const files = readdirSync(__dirname + '/test_data/')
		await Promise.all(
			files
				.filter(fname => fname.includes('.vcf'))
				.map(async (fname, index) => {
					const file = readFileSync(__dirname + '/test_data/' + fname)
					try {
						return expect(new VCard(file)).toBeDefined()
					} catch (err) {
						throw new Error(`ERROR reading file: ${fname}: ${err.message}`)
					}
				})
		)
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

	test('get() with filter', () => {
		expect(card.get('tel', 'voice').length).toBe(3)
		expect(card.get('tel', 'home').length).toBe(2)
		expect(card.get('tel', 'pref').length).toBe(1)
		expect(card.get('tel', 'pref')[0].value).toBe('tel:+11115551212')
	})

	test('getOne()', () => {
		expect(card.getOne('tel')?.value).toBe('tel:+11115551212')
		expect(card.getOne('tel', 'home')?.value).toBe('tel:+14045551212')
		expect(card.getOne('adr')?.value).toBe(
			';;100 Waters Edge;Baytown;LA;30314;United States of America'
		)
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

	test('remove()', () => {
		expect(card.get('title')[0].value).toBe('Shrimp Man')
		card.remove('title')
		expect(card.get('title').length).toBe(0)
		expect(card.get('tel')[0].value).toBe('tel:+11115551212')
		card.remove(card.get('tel')[0])
		expect(card.get('tel')[0].value).toBe('tel:+14045551212')
		card.remove(card.get('tel')[1])
		expect(card.get('tel')[0].value).toBe('tel:+14045551212')
		expect(card.get('tel').length).toBe(1)
		card.remove(card.get('tel')[0])
		expect(card.get('tel').length).toBe(0)

		expect(() => card.remove(new Property('asdf', '1234'))).toThrowError(
			'Attempted to remove property VCard does not have: ASDF:1234'
		)
		// @ts-ignore
		expect(() => card.remove({})).toThrowError(
			'invalid argument of VCard.remove(), expects ' +
				'string and optional param filter or a Property'
		)
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

	test('toJCard()', () => {
		const json: JCard = require('./test_data/jcard')
		const c = new VCard(json)
		expect(c.toJCard()).toEqual(json)
	})

	test('parseFullName()', () => {
		const c = new VCard()
		const oldFn = c.getOne('fn')?.getValue()
		c.set('n', 'Doe;John;;;')
		expect(c.parseFullName().value).toBe('John Doe')
		expect(c.getOne('fn')?.getValue()).toBe(oldFn)

		c.set('n', 'Doe;John;Delaware;Dr.;Esq.')
		expect(c.parseFullName().value).toBe('Dr. John Delaware Doe Esq.')
		expect(c.getOne('fn')?.getValue()).toBe(oldFn)

		// absent values in the middle
		c.set('n', 'Doe;John;;;PhD.')
		expect(c.parseFullName().value).toBe('John Doe PhD.')
		expect(c.getOne('fn')?.getValue()).toBe(oldFn)

		c.set('n', 'Doe;John;Joe,Bob;;PhD.,M.D.')
		expect(c.parseFullName().value).toBe('John Joe Bob Doe PhD. M.D.')
		expect(c.getOne('fn')?.getValue()).toBe(oldFn)

		// set (no append)
		c.set('n', 'Doe;John;Delaware;Dr.;Esq.')
		c.parseFullName({
			set: true
		})
		expect(c.get('fn').length).toBe(1)
		expect(c.getOne('fn')?.getValue()).toBe('Dr. John Delaware Doe Esq.')

		// set append
		c.set('n', 'Dean;Jimmy')
		c.parseFullName({
			set: true,
			append: true
		})
		expect(c.get('fn').length).toBe(2)
		expect(c.get('fn')[0].value).toBe('Dr. John Delaware Doe Esq.')
		expect(c.get('fn')[1].value).toBe('Jimmy Dean')
	})
})
