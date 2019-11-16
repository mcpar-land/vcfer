[vcfer](../README.md) › [Property](property.md)

# Class: Property

A vCard property

## Hierarchy

* **Property**

## Index

### Constructors

* [constructor](property.md#constructor)

### Properties

* [field](property.md#private-field)
* [group](property.md#group)
* [params](property.md#params)
* [value](property.md#value)

### Methods

* [addParam](property.md#private-addparam)
* [getField](property.md#getfield)
* [isEmpty](property.md#isempty)
* [parseFromJCardProperty](property.md#private-parsefromjcardproperty)
* [parseFromLine](property.md#private-parsefromline)
* [toJSON](property.md#tojson)
* [toString](property.md#tostring)

## Constructors

###  constructor

\+ **new Property**(`arg`: string | [JCardProperty](../README.md#jcardproperty), `value?`: undefined | string, `params?`: undefined | object, `group?`: undefined | string): *[Property](property.md)*

Defined in property.ts:34

A class describing a single vCard property.

Accepts either 2-4 arguments, or 1 argument in jCard property format.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | string &#124; [JCardProperty](../README.md#jcardproperty) | the field, or a jCard property |
`value?` | undefined &#124; string | - |
`params?` | undefined &#124; object | - |
`group?` | undefined &#124; string |   |

**Returns:** *[Property](property.md)*

## Properties

### `Private` field

• **field**: *string* = ""

Defined in property.ts:15

___

###  group

• **group**: *string | undefined*

Defined in property.ts:25

the group of the property.

**`example`** 'item1'

___

###  params

• **params**: *object*

Defined in property.ts:34

An jCard parameters object.

**`example`** 
{
	type: ['work', 'voice', 'pref'],
	value: 'uri'
}

#### Type declaration:

* \[ **key**: *string*\]: string | string[]

___

###  value

• **value**: *string* = ""

Defined in property.ts:20

the value of the property.

**`example`** '(123) 456 7890'

## Methods

### `Private` addParam

▸ **addParam**(`key`: string, `value`: string): *void*

Defined in property.ts:134

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | string |

**Returns:** *void*

___

###  getField

▸ **getField**(): *string*

Defined in property.ts:150

Returns a readonly string of the property's field.

**Returns:** *string*

___

###  isEmpty

▸ **isEmpty**(): *boolean*

Defined in property.ts:145

Returns `true` if the property is empty.

**Returns:** *boolean*

___

### `Private` parseFromJCardProperty

▸ **parseFromJCardProperty**(`_jCardProp`: [JCardProperty](../README.md#jcardproperty)): *void*

Defined in property.ts:124

**Parameters:**

Name | Type |
------ | ------ |
`_jCardProp` | [JCardProperty](../README.md#jcardproperty) |

**Returns:** *void*

___

### `Private` parseFromLine

▸ **parseFromLine**(`line`: string): *void*

Defined in property.ts:83

**Parameters:**

Name | Type |
------ | ------ |
`line` | string |

**Returns:** *void*

___

###  toJSON

▸ **toJSON**(): *[JCardProperty](../README.md#jcardproperty)*

Defined in property.ts:183

Returns a JSON array in a jCard property format

**Returns:** *[JCardProperty](../README.md#jcardproperty)*

___

###  toString

▸ **toString**(`version?`: [CardVersion](../README.md#cardversion)): *string*

Defined in property.ts:158

Returns a `.vcf` formatted line.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`version?` | [CardVersion](../README.md#cardversion) | (unfinished)  |

**Returns:** *string*
