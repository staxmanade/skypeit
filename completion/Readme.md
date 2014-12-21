# Tab Completion for SkypeIt
> Thanks to grunt & gulp team

To enable SkypeIt aliases auto-completion in shell you should add `eval "$(skypeit --completion=shell)"` in your `.shellrc` file.

## Bash

Add `eval "$(skypeit --completion=bash)"` to `~/.bashrc`.

## Zsh

Add `eval "$(skypeit --completion=zsh)"` to `~/.zshrc`.

## Powershell

Add `Invoke-Expression ((skypeit --completion=powershell) -join [System.Environment]::NewLine)` to `$PROFILE`.

## Fish

Add `skypeit --completion=fish | source` to `~/.config/fish/config.fish`.
