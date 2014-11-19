---
layout: post
title: Regular Expressions - \z and \Z
date: 2014-06-19 10:13:27.000000000 +01:00
---
I recently discovered that `\z` and `\Z` (which match the end of the input) have subtly different behaviour (this is in Ruby but it behaves the same in most languages other than Python for some reason).

**`\Z` will allow a trailing newline character whereas `\z` will not.**

This is important to bear in mind when using either of them. If you're matching against a file you probably want to be using `\Z` as files should have a trailing newline. If you're reading input from the web however you probably want to use `\z` as inputs shouldn't have trailing newlines. You probably don't want any extra newlines sneaking through when you weren't expecting them, especially if you're going to be rendering the match to the page later.

