[vcfer](README.md)

# vcfer

## Index

### Classes

* [Property](classes/property.md)
* [VCard](classes/vcard.md)

### Type aliases

* [CardVersion](README.md#cardversion)
* [JCard](README.md#jcard)
* [JCardProperty](README.md#jcardproperty)

### Functions

* [formatCard](README.md#const-formatcard)
* [normalizeCard](README.md#const-normalizecard)

## Type aliases

###  CardVersion

Ƭ **CardVersion**: *"2.1" | "3.0" | "4.0"*

Defined in vcard.ts:4

___

###  JCard

Ƭ **JCard**: *["vcard", [JCardProperty](README.md#jcardproperty)[]]*

Defined in vcard.ts:6

___

###  JCardProperty

Ƭ **JCardProperty**: *[string, object, string, string | string[]]*

Defined in property.ts:5

## Functions

### `Const` formatCard

▸ **formatCard**(`card`: [VCard](classes/vcard.md), `_version`: [CardVersion](README.md#cardversion)): *string*

Defined in vcard.ts:294

**Parameters:**

Name | Type |
------ | ------ |
`card` | [VCard](classes/vcard.md) |
`_version` | [CardVersion](README.md#cardversion) |

**Returns:** *string*

___

### `Const` normalizeCard

▸ **normalizeCard**(`input`: string | Buffer): *string*

Defined in vcard.ts:282

**Parameters:**

Name | Type |
------ | ------ |
`input` | string &#124; Buffer |

**Returns:** *string*
