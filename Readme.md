
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

# SkypeIt

SkypeIt takes the hassle out of dialing a long number and
can be extraordinarily helpful when those long phone
numbers have extensions as well.

# Usage

&nbsp;&nbsp;`skypeit [phone# [ext]]`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--debug]**            : Logs extra diagnostic debug info

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--completion[=zsh]]** : Prints completion commands

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--sampleConfig]**     : Prints sample yaml config

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--version]**          : Prints just the version

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--help]**             : Prints this help info


# Examples

&nbsp;&nbsp;`skypeit "(555)555-5555 ext:1234"`

&nbsp;&nbsp;`skypeit "some garbage text (555)    555  5555  #1234"`

&nbsp;&nbsp;`skypeit "(555)555-5555"` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<-- (no extension)

&nbsp;&nbsp;`skypeit "(555)555-5555" --debug` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<-- Use `--debug` to see a verbose log
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and diagnoses issues.

&nbsp;&nbsp;`skypeit "(555)555-5555" --completion` <-- Get a list of the auto-completion
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options stored in `~/.skypeitrc` or
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;your local project's `.skypeitrc`

# Alias phone numbers for quick access

If you want to take advantage of skypeit's aliases:

1. Create the following file `~/.skypeitrc` or in your local project's `.skypeitrc`
2. Fill it with the aliases you'd like.

```yaml
alias:
  office:
    number: 555-555-5555 ext 5555
  mom:
    number: 555-555-5555 ext 5555

```

> the local `.skypeitrc` is merged with the global `~/.skypeitrc` file to determine the final result of auto-completion options provided by `skypeit --completion`

# Tab Completion

If you've setup a `~/.skypeitrc` config file with the above structure, you can check out [how to install](completion/Readme.md) tab completion.


# Troubleshoot?

If you're having trouble first try using the `--debug` parameter which will print a bit of log info.
