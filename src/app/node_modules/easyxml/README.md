## Easy XML

The purpose of this module is to provide an easy to use function for
converting your JS objects into XML. I plan on making it configurable
since a lot of different people have different expectations.

Everything in here is CPU bound and without callbacks, so feel free to run
it synchronously.

## Installation

    $ npm install easyxml

## Config

* singularizeChildren: If an array is plural, its children elements will be singular
* underscoreAttributes: String attributes starting with _ will be XML attributes
* rootElement: A string to wrap around your entire XML object
* dateFormat: A date format for JS dates, currently accepts 'ISO 8601'
* indent: A number representing the spaces to indent children, use 0 for no whitespace
* manifest: Whether or not to add that XML manifest line to the top

## Purpose

I was working on a Node.js API, and I wanted to be able to build a single
object within each of my actions, and have that object automatically
converted into the appropriate response based on request type (JSON, XML).
The existing object to XML converters seemed to be lacking. The biggest
feature I wanted was that an array of elements with a plural name get a
bunch of sub elements with the singular version of the name. This library
allows for all of that. Can be configured globally as well as on a per
usage basis.

## Example

Input Object:

    {
        items: [{
            name: 'one',
            _id: 1
        }, {
            name: 'two',
            _id: 2
        }, {
            name: 'three',
            _id: 3
        }],
        blah: 'http://www.google.com',
        when: new Date(),
        boolz: true,
        nullz: null
    }

Example Config:

    {
        singularizeChildren: true,
        underscoreAttributes: true,
        rootElement: 'response',
        dateFormat: 'ISO',
        indent: 2,
        manifest: true
    }

Output XML:

    <?xml version='1.0' encoding='utf-8'?>
    <response>
      <items>
        <item id="1">
          <name>one</name>
        </item>
        <item id="2">
          <name>two</name>
        </item>
        <item id="3">
          <name>three</name>
        </item>
      </items>
      <blah>http://www.google.com</blah>
      <when>2012-09-25T18:47:39.485Z</when>
      <boolz>true</boolz>
      <nullz />
    </response>

## License

This project is licensed under the MIT license.
