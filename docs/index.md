---
id: "index"
title: "vcfer"
sidebar_label: "Globals"
---

[vcfer](index.md)

## Index

### Classes

* [Property](classes/property.md)
* [VCard](classes/vcard.md)

### Type aliases

* [CardVersion](index.md#cardversion)
* [JCard](index.md#jcard)
* [JCardProperty](index.md#jcardproperty)

## Type aliases

###  CardVersion

Ƭ **CardVersion**: *"2.1" | "3.0" | "4.0"*

*Defined in [vcard.ts:5](https://github.com/mcpar-land/vcfer/blob/2de0570/src/vcard.ts#L5)*

String literal type containing all supported vCard versions.

___

###  JCard

Ƭ **JCard**: *["vcard", [JCardProperty](index.md#jcardproperty)[]]*

*Defined in [vcard.ts:36](https://github.com/mcpar-land/vcfer/blob/2de0570/src/vcard.ts#L36)*

Describes the format of a valid jCard.

**`example`** 
```json
[ "vcard",
	[
		[ "version", {}, "text", "4.0" ],
		[ "n", {}, "text", [ "Gump", "Forrest", "", "", "" ] ],
		[ "fn", {}, "text", "Forrest Gump" ],
		[ "org", {}, "text", "Bubba Gump Shrimp Co" ],
		[ "title", {}, "text", "Shrimp Man" ],
		[ "photo", { "mediatype": "image/gif" }, "uri", "http://www.example.com/dir_photos/my_photo.gif" ],
		[ "tel", { "type": [ "work", "voice" ] }, "uri", "tel:+1-111-555-1212" ],
		[ "tel", { "type": [ "home", "voice" ] }, "uri", "tel:+1-404-555-1212" ],
		[ "tel", { "type": [ "home", "voice" ], "group": "item1" }, "uri", "tel:+1-404-555-1213" ],
		[
			"adr", { "type": "work", "label": "100 Waters Edge\nBaytown, LA 30314\nUnited States of America" },
			"text", [ "", "", "100 Waters Edge", "Baytown", "LA", "30314", "United States of America" ]
		],
		[
			"adr", { "type": "home", "label": "42 Plantation St.\nBaytown, LA 30314\nUnited States of America" },
			"text", [ "", "", "42 Plantation St.", "Baytown", "LA", "30314", "United States of America" ]
		],
		[ "email", {}, "text", "forrestgump@example.com" ],
		[ "rev", {}, "timestamp", "2008-04-24T19:52:43Z" ]
	]
]
```

___

###  JCardProperty

Ƭ **JCardProperty**: *[string, object, string, string | string[]]*

*Defined in [property.ts:12](https://github.com/mcpar-land/vcfer/blob/2de0570/src/property.ts#L12)*

Describes the format of a valid jCard property.

**`example`** 
```json
[ "tel", { "type": [ "home", "voice" ], "group": "item1" }, "uri", "tel:+1-404-555-1213" ]
```
