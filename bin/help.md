# SkypeIt (v{{version}})

SkypeIt takes the hassle out of dialing a long number and
can be extraordinarily helpful when those long phone
numbers have extensions as well.

# Usage

&nbsp;&nbsp;`skypeit "<phone number>"`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **"<phone number>"**     : Phone # including Extension (see examples below)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--debug]**            : Logs debug info & doesn't run the applescript in the background

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--version]**          : Prints just the version.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--help]**             : Prints this help info.


# Examples

&nbsp;&nbsp;`skypeit "(555)555-5555 ext:1234"`

&nbsp;&nbsp;`skypeit "some garbage text (555)    555  5555  #1234"`

&nbsp;&nbsp;`skypeit "(555)555-5555"` <-- (no extension)

&nbsp;&nbsp;`skypeit "(555)555-5555" --debug` <-- Debug if you're having trouble.
