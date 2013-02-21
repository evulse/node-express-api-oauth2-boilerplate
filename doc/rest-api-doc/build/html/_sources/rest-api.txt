.. _shippable-rest-api-page:

*********************************
Shippable REST API Documentation
*********************************

**Overview**

The base URL for development environment:

http://still-journey-7281.herokuapp.com

Say
===

==============
Get single say
==============

This method is used to retrieve say details.

**Authentication**

  Required (*the authentication is not supported yet*)

**Method**

  GET

**Supported URI**

  /say/:name
  /say/:name.json
  /say/:name.xml

**Parameters**

  ============= ======================= ==============
  Paramenter    Description             Remark
  ============= ======================= ==============
  name          name                    Required
  ============= ======================= ==============

**Example Request**

  http://still-journey-7281.herokuapp.com/say/mike.json

  http://still-journey-7281.herokuapp.com/say/mike.xml

**Example Response in JSON format**

  Response headers:

  .. code-block:: javascript
      :emphasize-lines: 3,5

      Content-Type: application/json; charset=utf-8

      Date: Thu, 21 Feb 2013 19:10:15 GMT

      X-Powered-By: Express

      Content-Length: 20

      Connection: keep-alive

  Response body:

  .. code-block:: javascript
      :emphasize-lines: 3,5

      {
        "name": "mike"
      }

**Example Response in XML format**

  Response headers:

  .. code-block:: javascript
      :emphasize-lines: 3,5

      Content-Type: application/xml

      Date: Thu, 21 Feb 2013 19:18:03 GMT

      X-Powered-By: Express

      Content-Length: 45

      Connection: keep-alive

  Response body:

  .. code-block:: javascript
      :emphasize-lines: 3,5

      <response>
        <name>mike</name>
      </response>

**The properties**

  ============= ======= ========================  =============================
  Property      Type    Description                   Remark
  ============= ======= ========================  =============================
  name          String  N/A                       N/A
  ============= ======= ========================  =============================

**Error Codes**

  * **400 Bad Request**. The request cannot be fulfilled due to bad syntax.
  * **404 Not Found**. Resources not found.