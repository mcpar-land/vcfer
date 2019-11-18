---
id: "vcard"
title: "VCard"
sidebar_label: "VCard"
---

[vcfer](../index.md) › [VCard](vcard.md)

## Hierarchy

* **VCard**

## Index

### Constructors

* [constructor](vcard.md#constructor)

### Properties

* [props](vcard.md#props)
* [version](vcard.md#version)
* [eol](vcard.md#static-eol)
* [extension](vcard.md#static-extension)
* [mimeType](vcard.md#static-mimetype)
* [versions](vcard.md#static-versions)

### Methods

* [add](vcard.md#add)
* [get](vcard.md#get)
* [has](vcard.md#has)
* [parseFromJCard](vcard.md#private-parsefromjcard)
* [parseFromVcf](vcard.md#private-parsefromvcf)
* [remove](vcard.md#remove)
* [set](vcard.md#set)
* [toJCard](vcard.md#tojcard)
* [toString](vcard.md#tostring)
* [fromMultiCardString](vcard.md#static-frommulticardstring)
* [isSupported](vcard.md#static-issupported)

## Constructors

###  constructor

\+ **new VCard**(`input?`: string | Buffer | [JCard](../index.md#jcard)): *[VCard](vcard.md)*

*Defined in [vcard.ts:49](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L49)*

A class describing a single vCard object.
Accepts a `string` or `Buffer` with the contents of a `.vcf` file,
or a JSON `object` in [JCard](../index.md#jcard) format.

**`example`** 
```javascript
new VCard(fs.readFileSync('card.vcf'));
```

**`example`** 
```javascript
new VCard('...vcf string...');
```

**`example`** 
```javascript
new VCard(require('./jcard.json'));
```

**Parameters:**

Name | Type |
------ | ------ |
`input?` | string &#124; Buffer &#124; [JCard](../index.md#jcard) |

**Returns:** *[VCard](vcard.md)*

## Properties

###  props

• **props**: *Map‹string, [Property](property.md)[]›*

*Defined in [vcard.ts:49](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L49)*

Map of [Property](property.md) arrays associated with a vCard property name.
A property with a single value will simply be an array of size 1.

___

###  version

• **version**: *[CardVersion](../index.md#cardversion)*

*Defined in [vcard.ts:44](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L44)*

___

### `Static` eol

▪ **eol**: *"
"* = "
"

*Defined in [vcard.ts:42](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L42)*

___

### `Static` extension

▪ **extension**: *".vcf"* = ".vcf"

*Defined in [vcard.ts:40](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L40)*

___

### `Static` mimeType

▪ **mimeType**: *"text/vcard"* = "text/vcard"

*Defined in [vcard.ts:39](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L39)*

___

### `Static` versions

▪ **versions**: *[CardVersion](../index.md#cardversion)[]* =  ['2.1', '3.0', '4.0']

*Defined in [vcard.ts:41](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L41)*

## Methods

###  add

▸ **add**(`arg`: string | [Property](property.md), `value?`: undefined | string, `params?`: undefined | object, `group?`: undefined | string): *[Property](property.md)*

*Defined in [vcard.ts:197](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L197)*

Adds a [Property](property.md) without modifying other properties.

Accepts either 2.4 arguments to construct a [Property](property.md),
or 1 argument of a preexisting [Property](property.md) object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | string &#124; [Property](property.md) | the field, or a [Property](property.md) object |
`value?` | undefined &#124; string | the value for the Property object |
`params?` | undefined &#124; object | the parameters for the Property object |
`group?` | undefined &#124; string | the group for the Property object  |

**Returns:** *[Property](property.md)*

___

###  get

▸ **get**(`field`: string, `type?`: undefined | string): *[Property](property.md)[]*

*Defined in [vcard.ts:136](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L136)*

Retrieve an array of [Property](property.md) objects under the specified field.
Returns [] if there are no Property objects found.
Properites are always stored in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`field` | string | to get. |
`type?` | undefined &#124; string | If provided, only return [Property](property.md)s with the specified type as a param.  |

**Returns:** *[Property](property.md)[]*

___

###  has

▸ **has**(`field`: string): *boolean*

*Defined in [vcard.ts:268](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L268)*

Returns true if the vCard has at least one @{link Property}
of the given field.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`field` | string | The field to query  |

**Returns:** *boolean*

___

### `Private` parseFromJCard

▸ **parseFromJCard**(`_json`: [JCard](../index.md#jcard)): *void*

*Defined in [vcard.ts:121](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`_json` | [JCard](../index.md#jcard) |

**Returns:** *void*

___

### `Private` parseFromVcf

▸ **parseFromVcf**(`vcf`: string | Buffer): *void*

*Defined in [vcard.ts:85](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`vcf` | string &#124; Buffer |

**Returns:** *void*

___

###  remove

▸ **remove**(`arg`: string | [Property](property.md), `paramFilter?`: undefined | object): *void*

*Defined in [vcard.ts:233](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L233)*

Removes a [Property](property.md), or all properties of the supplied field.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | string &#124; [Property](property.md) | the field, or a [Property](property.md) object |
`paramFilter?` | undefined &#124; object | (incomplete)  |

**Returns:** *void*

___

###  set

▸ **set**(`arg`: string | [Property](property.md), `value?`: undefined | string, `params?`: undefined | object, `group?`: undefined | string): *[Property](property.md)*

*Defined in [vcard.ts:164](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L164)*

Set the contents of a field to contain a single [Property](property.md).

Accepts either 2-4 arguments to construct a Property,
or 1 argument of a preexisting Property object.

This will always overwrite all existing properties of the given
field. For just adding a new property, see {@link VCard#add}

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | string &#124; [Property](property.md) | the field, or a Property object |
`value?` | undefined &#124; string | the value for the Property object |
`params?` | undefined &#124; object | the parameters for the Property object |
`group?` | undefined &#124; string | the group for the Property object  |

**Returns:** *[Property](property.md)*

___

###  toJCard

▸ **toJCard**(): *[JCard](../index.md#jcard)*

*Defined in [vcard.ts:284](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L284)*

Returns a [JCard](../index.md#jcard) object as a JSON array.

**Returns:** *[JCard](../index.md#jcard)*

___

###  toString

▸ **toString**(`version?`: [CardVersion](../index.md#cardversion)): *string*

*Defined in [vcard.ts:276](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L276)*

returns a `.vcf` formatted string with CRLF endings.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`version?` | [CardVersion](../index.md#cardversion) | (incomplete)  |

**Returns:** *string*

___

### `Static` fromMultiCardString

▸ **fromMultiCardString**(`input`: string | Buffer): *[VCard](vcard.md)[]*

*Defined in [vcard.ts:310](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L310)*

Creates an array of vCard objects from a multi-card `.vcf` string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`input` | string &#124; Buffer | string or Buffer containing 1 or more vCards  |

**Returns:** *[VCard](vcard.md)[]*

___

### `Static` isSupported

▸ **isSupported**(`version`: string): *boolean*

*Defined in [vcard.ts:319](https://github.com/mcpar-land/vcfer/blob/5c26500/src/vcard.ts#L319)*

Returns true if the version is supported.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`version` | string | The version to query  |

**Returns:** *boolean*