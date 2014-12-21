
# SkypeIt

Quickly and easily paste a conference call text at the command line and let SkypeIt dial the number and extension for you.

EX:

- To a regular number `skypeit "(555)555-5555"`
- To a conference call `skypeit "(555)555-5555 ext #1234"`

# Requirements

- OS: Mac
- [NPM - Node Package Manager](http://nodejs.org/download/)

# How to Install

`npm install -g skypeit`

# Tab Completion

Check out [how to install](completion/Readme.md).

# SkypeIt

SkypeIt takes the hassle out of dialing a long number and
can be extraordinarily helpful when those long phone
numbers have extensions as well.


# Usage

&nbsp;&nbsp;`skypeit "<phone number>"`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **"<phone number>"**     : Phone # including Extension (see examples below)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--debug]**            : Logs debug info & doesn't run the applescript in the background

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--completion=bash|fish|powershell|zsh]**   : Prints just the version.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--version]**          : Prints just the version.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--help]**             : Prints this help info.


# Examples

&nbsp;&nbsp;`skypeit "(555)555-5555 ext:1234"`

&nbsp;&nbsp;`skypeit "some garbage text (555)    555  5555  #1234"`

&nbsp;&nbsp;`skypeit "(555)555-5555"` <-- (no extension)

&nbsp;&nbsp;`skypeit "(555)555-5555" --debug` <-- Debug if you're having trouble.

# Troubleshoot?

If you're having trouble first try using the `--debug` parameter which will print a bit of log info.
