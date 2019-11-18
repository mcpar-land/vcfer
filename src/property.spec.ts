import { Property, JCardProperty } from './property'

let p: Property

test('create property from arguments', () => {
	p = new Property('email', 'bobby@gmail.com')
	expect(p.getField()).toEqual('email')
	expect(p.value).toEqual('bobby@gmail.com')

	p = new Property('email', 'bobby@gmail.com', {
		type: ['work', 'pref']
	})
	expect(p.getField()).toEqual('email')
	expect(p.value).toEqual('bobby@gmail.com')
	expect(p.params).toEqual({
		type: ['work', 'pref']
	})

	p = new Property(
		'email',
		'bobby@gmail.com',
		{
			type: 'work'
		},
		'item1'
	)
	expect(p.getField()).toEqual('email')
	expect(p.value).toEqual('bobby@gmail.com')
	expect(p.params).toEqual({
		type: 'work'
	})
	expect(p.group).toEqual('item1')
})

test('create property from jCard prop', () => {
	p = new Property(['n', {}, 'text', ['Gump', 'Forrest', '', '', '']])
	expect(p.getField()).toEqual('n')
	expect(p.value).toEqual('Gump;Forrest;;;')
	expect(p.params).toEqual({ value: 'text' })

	p = new Property([
		'tel',
		{ type: ['work', 'pref', 'voice'] },
		'uri',
		'tel:+11115551212'
	])
	expect(p.getField()).toEqual('tel')
	expect(p.value).toEqual('tel:+11115551212')
	expect(p.params).toEqual({ value: 'uri', type: ['work', 'pref', 'voice'] })
})

test('create property from vcf line', () => {
	p = new Property('TEL;TYPE=home,voice;VALUE=uri:tel:+14045551212')
	expect(p.getField()).toEqual('tel')
	expect(p.value).toEqual('tel:+14045551212')
	expect(p.params).toEqual({ value: 'uri', type: ['home', 'voice'] })

	p = new Property('EMAIL:forrestgump@example.com')
	expect(p.getField()).toEqual('email')
	expect(p.value).toEqual('forrestgump@example.com')
	expect(p.params).toEqual({})

	p = new Property(
		'ADR;TYPE=work;LABEL="100 Waters Edge\nBaytown, LA 30314\nUnited States ' +
			'of America":;;100 Waters Edge;Baytown;LA;30314;United States of America'
	)
	expect(p.getField()).toEqual('adr')
	expect(p.value).toEqual(
		';;100 Waters Edge;Baytown;LA;30314;United States of America'
	)
	expect(p.params['label']).toEqual(
		'"100 Waters Edge\nBaytown, LA 30314\nUnited States of America"'
	)
})

test('camel case field', () => {
	p = new Property(
		'X-SOCIALPROFILE;type=pref;type=twitter:http://twitter.com/johndoe'
	)
	expect(p.getField()).toBe('xSocialprofile')
})

// X-SOCIALPROFILE;type=pref;type=twitter:http://twitter.com/johndoe
test('concatenate duplicate types', () => {
	p = new Property(
		'X-SOCIALPROFILE;type=pref;type=twitter:http://twitter.com/johndoe'
	)
	console.log(p.params['type'])
	expect(p.params['type']).toEqual(['pref', 'twitter'])
})

test('toJSON()', () => {
	const json: JCardProperty = ['n', {}, 'text', ['Gump', 'Forrest', '', '', '']]
	p = new Property(json)

	expect(p.toJSON()).toStrictEqual(json)
})
