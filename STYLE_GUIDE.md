# Abbreviations

- When an Abbreviation forms part of the variable name and is not used as a
  prefix it must always be in uppercase

    Do this: rawHTML
    Dont do this: rawHtml

- When an Abbreviation makes the prefix of a variable name it should always be
  in lowercase

  Do this: htmlRaw
  Dont do this: HTMLRaw

- When an Abbreviation forms the whole name of a variable, it must be in lowercase

  Do this: html
  Dont do this: Html

- When an Abbreviation is used as a prefix and must be capitalized (such as when
  naming classes, types, interfaces, enums, etc) it must always be in uppercase

  Do this: IHTML
  Dont do this: IHtml or this Ihtml

# Importing Modules

- When importing a third party module (be it one from the standard library or
  from the community) always import all exported objects.

    Do this: * as ...
    Dont do this: { ... }

- The name of the variable must exactly match the name of the library and be capitalized

    Do this: import * as Htmlparser2 from "htmlparser2"
    Dont do this: import * as parser from "htmlparser2"

# Typescript types

- Always prefix Types with T
- Always prefix Enums with E
- Always prefix Interfaces with I
# Programming Paradigm

- Strong preference for functional or procedural paradigm.
- Use Object-Oriented model only when the performance cost of not
  using it would be too great.
