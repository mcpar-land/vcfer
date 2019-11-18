---
id: "property"
title: "Property"
sidebar_label: "Property"
---

[vcfer](../index.md) › [Property](property.md)

A vCard property.

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

\+ **new Property**(`arg`: string | [JCardProperty](../index.md#jcardproperty), `value?`: undefined | string, `params?`: undefined | object, `group?`: undefined | string): *[Property](property.md)*

*Defined in [property.ts:41](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L41)*

A class describing a single vCard property.
Will almost always be a member of a
[VCard](vcard.md)'s [props](vcard.md#props) map.

Accepts either 2-4 arguments, or 1 argument in jCard property format.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arg` | string &#124; [JCardProperty](../index.md#jcardproperty) | the field, or a jCard property |
`value?` | undefined &#124; string | - |
`params?` | undefined &#124; object | - |
`group?` | undefined &#124; string |   |

**Returns:** *[Property](property.md)*

## Properties

### `Private` field

• **field**: *string* = ""

*Defined in [property.ts:22](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L22)*

___

###  group

• **group**: *string | undefined*

*Defined in [property.ts:32](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L32)*

the group of the property.

**`example`** 'item1'

___

###  params

• **params**: *object*

*Defined in [property.ts:41](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L41)*

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

*Defined in [property.ts:27](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L27)*

the value of the property.

**`example`** '(123) 456 7890'

## Methods

### `Private` addParam

▸ **addParam**(`key`: string, `value`: string): *void*

*Defined in [property.ts:144](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | string |

**Returns:** *void*

___

###  getField

▸ **getField**(): *string*

*Defined in [property.ts:160](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L160)*

Returns a readonly string of the property's field.

**Returns:** *string*

___

###  isEmpty

▸ **isEmpty**(): *boolean*

*Defined in [property.ts:155](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L155)*

Returns `true` if the property is empty.

**Returns:** *boolean*

___

### `Private` parseFromJCardProperty

▸ **parseFromJCardProperty**(`_jCardProp`: [JCardProperty](../index.md#jcardproperty)): *void*

*Defined in [property.ts:134](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`_jCardProp` | [JCardProperty](../index.md#jcardproperty) |

**Returns:** *void*

___

### `Private` parseFromLine

▸ **parseFromLine**(`line`: string): *void*

*Defined in [property.ts:92](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`line` | string |

**Returns:** *void*

___

###  toJSON

▸ **toJSON**(): *[JCardProperty](../index.md#jcardproperty)*

*Defined in [property.ts:193](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L193)*

Returns a JSON array in a [jCard property](../index.md#jcardproperty) format

**Returns:** *[JCardProperty](../index.md#jcardproperty)*

___

###  toString

▸ **toString**(`version?`: [CardVersion](../index.md#cardversion)): *string*

*Defined in [property.ts:168](https://github.com/mcpar-land/vcfer/blob/117f851/src/property.ts#L168)*

Returns a `.vcf` formatted line.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`version?` | [CardVersion](../index.md#cardversion) | (unfinished)  |

**Returns:** *string*
