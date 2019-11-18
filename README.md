<h1 align="center"><code>vcfer</code> 📇</h1>
<p align="center">An easy-to-use vCard and jCard parser.</p>
<h3 align="center"><a href="https://github.com/mcpar-land/vcfer/blob/master/docs/index.md">Documentation</a></h3>

---

This is a vcf interpreter written in typescript, based heavily on [node-vcf](https://github.com/jhermsmeier/node-vcf) by Jonas Hermsmeier. It's still a work in progress, including this readme file.

---

## Usage

```javascript
import VCard from 'vcfer'

const card = new VCard()

card.add('n', 'Saw;Timber;;;')
card.add('fn', 'Timber Saw')
card.add('title', 'Rizzrack, the Timbersaw')
card.add('tel', '(123) 456 7890')
card.add('tel', '(987) 654 3210', { type: ['work'] })

console.log(card.toString())
console.log(card.toJCard())
```

```
BEGIN:VCARD
VERSION:4.0
N:Saw;Timber;;;
FN:Timber Saw
TITLE:Rizzrack, the Timbersaw
TEL;TYPE=work:(123) 456 7890
END:VCARD
```

```json
[
	"vcard",
	[
		["version", {}, "text", "4.0"],
		["n", {}, "text", ["Saw", "Timber", "", "", ""]],
		["fn", {}, "text", "Timber Saw"],
		["title", {}, "text", "Rizzrack, the Timbersaw"],
		["tel", { "type": ["work"] }, "text", "(123) 456 7890"]
	]
]
```

A card can be loaded from a file.

```javascript
const card = new VCard(fs.readFileSync('timbersaw.vcf'))
```

## Contributing

vCard is a complicated specification, and different providers (iOS, Android, etc.) all export their contacts in slightly different ways and with a multitude of different fields -- some of which are covered by the [8+ year old RFC specification](https://tools.ietf.org/html/rfc6350), but many of which are not.

The goal of this library is a parser that is:

- 100% RFC specification compliant, while also taking into account real-world patterns and properties outside of it (like `X-SOCIAL-PROFILE`)
- heavily typed for a better developer experience
- features utilities for obvious and common actions on vCard objects and properties

Libraries for complicated specs do best with more than one pair of eyes on them, so if you want to contribute, absolutely make a pull request! 🥂

## Goals

- [ ] An `enum` that includes all RFC specification properties, and all common (and perhaps not-so-common) `X-` prefix properties and others.
  - The ability to work with properties outside that enum, if necessary.
- [ ] Methods for common property params like `TYPE=pref`.
