[vcfer](../README.md) › [VCard](vcard.md)

# Class: VCard

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

\+ **new VCard**(`input?`: string | Buffer | [JCard](../README.md#jcard)): *[VCard](vcard.md)*

Defined in vcard.ts:15

A class describing a single vCard object.
Accepts a `string` or `Buffer` with the contents of a `.vcf` file,
or a JSON `object` in jCard format.

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
`input?` | string &#124; Buffer &#124; [JCard](../README.md#jcard) |

**Returns:** *[VCard](vcard.md)*

## Properties

###  props

• **props**: *Map‹string, [Property](property.md)[]›*

Defined in vcard.ts:15

___

###  version

• **version**: *[CardVersion](../README.md#cardversion)* =  VCard.versions[VCard.versions.length - 1]

Defined in vcard.ts:14

___

### `Static` eol

▪ **eol**: *"
"* = "
"

Defined in vcard.ts:12

___

### `Static` extension

▪ **extension**: *".vcf"* = ".vcf"

Defined in vcard.ts:10

___

### `Static` mimeType

▪ **mimeType**: *"text/vcard"* = "text/vcard"

Defined in vcard.ts:9

___

### `Static` versions

▪ **versions**: *[CardVersion](../README.md#cardversion)[]* =  ['2.1', '3.0', '4.0']

Defined in vcard.ts:11

## Methods

###  add

▸ **add**(`arg`: string | [Property](property.md), `value?`: undefined | string, `params?`: undefined | object, `group?`: undefined | string): *[Property](property.md)*

Defined in vcard.ts:152

Adds a property without modifying other properties.

Accepts either 2.4 arguments to construct a Property,
or 1 argument of a preexisting Property object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | string &#124; [Property](property.md) | the field, or a Property object |
`value?` | undefined &#124; string | - |
`params?` | undefined &#124; object | - |
`group?` | undefined &#124; string |   |

**Returns:** *[Property](property.md)*

___

###  get

▸ **get**(`field`: string, `type?`: undefined | string): *[Property](property.md)[]*

Defined in vcard.ts:100

Retrieve an array of Property objects under the specified field.
Returns [] if there are no Property objects found.
Properites are always stored in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`field` | string | to get. |
`type?` | undefined &#124; string | (unfinished. Will be able to filter arrays by type.)  |

**Returns:** *[Property](property.md)[]*

___

###  has

▸ **has**(`field`: string): *boolean*

Defined in vcard.ts:223

Returns true if the vCard has at least one property
of the given field.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`field` | string |   |

**Returns:** *boolean*

___

### `Private` parseFromJCard

▸ **parseFromJCard**(`_json`: [JCard](../README.md#jcard)): *void*

Defined in vcard.ts:86

**Parameters:**

Name | Type |
------ | ------ |
`_json` | [JCard](../README.md#jcard) |

**Returns:** *void*

___

### `Private` parseFromVcf

▸ **parseFromVcf**(`vcf`: string | Buffer): *void*

Defined in vcard.ts:50

**Parameters:**

Name | Type |
------ | ------ |
`vcf` | string &#124; Buffer |

**Returns:** *void*

___

###  remove

▸ **remove**(`arg`: string | [Property](property.md), `paramFilter?`: undefined | object): *void*

Defined in vcard.ts:188

Removes a property, or all properties of the supplied field.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | string &#124; [Property](property.md) | the field, or a Property object |
`paramFilter?` | undefined &#124; object | (incomplete)  |

**Returns:** *void*

___

###  set

▸ **set**(`arg`: string | [Property](property.md), `value?`: undefined | string, `params?`: undefined | object, `group?`: undefined | string): *[Property](property.md)*

Defined in vcard.ts:119

Set the contents of a field to contain a single Property.

Accepts either 2-4 arguments to construct a Property,
or 1 argument of a preexisting Property object.

This will always overwrite all existing properties of the given
field. For just adding a new property, see `VCard#add()`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | string &#124; [Property](property.md) | the field, or a Property object |
`value?` | undefined &#124; string | - |
`params?` | undefined &#124; object | - |
`group?` | undefined &#124; string |   |

**Returns:** *[Property](property.md)*

___

###  toJCard

▸ **toJCard**(): *[JCard](../README.md#jcard)*

Defined in vcard.ts:239

Returns a jCard object as a JSON array.

**Returns:** *[JCard](../README.md#jcard)*

___

###  toString

▸ **toString**(`version?`: [CardVersion](../README.md#cardversion)): *string*

Defined in vcard.ts:231

returns a `.vcf` formatted string with CRLF endings.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`version?` | [CardVersion](../README.md#cardversion) | (incomplete)  |

**Returns:** *string*

___

### `Static` fromMultiCardString

▸ **fromMultiCardString**(`input`: string | Buffer): *[VCard](vcard.md)[]*

Defined in vcard.ts:265

Creates an array of vCard objects from a multi-card `.vcf` string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`input` | string &#124; Buffer |   |

**Returns:** *[VCard](vcard.md)[]*

___

### `Static` isSupported

▸ **isSupported**(`version`: string): *boolean*

Defined in vcard.ts:274

Returns true if the version is supported.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`version` | string |   |

**Returns:** *boolean*
