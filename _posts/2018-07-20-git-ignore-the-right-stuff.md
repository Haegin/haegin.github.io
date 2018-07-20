---
layout: post
title: Git ignore the right stuff
date: 2018-07-20 10:52:00
---

I recently set up a new laptop for working on a few different work projects and
as part of it I found a few files that turned up in the project that I needed
to add to the git ignore. This reminded me about the two different ignore
files, and what they're for.

The first ignore file, which most git users probably know about, is the
`.gitignore` file in the repository. This is for repository specific files.
As several of the projects I'm working on have `.env` files to set app secrets
(which should never be committed) these should be in this repo specific git
ignore file.

The second ignore file, is the global ignore file. This defaults to
`~/.config/git/ignore` (though you can change it with a setting in
`~/gitconfig`) and it applies to every repository you check out on the machine,
but it only applies on your machine (as it's not shared with anyone else). This
is where you should put anything specific to your machine or editor. For
example, I have `.DS_Store` in mine, because I use a Mac and MacOS likes to
generate these files. I also have `.sw[a-z]` to stop Vim swap files sneaking in
to any repositories I use.

If you set up your global ignore file correctly, you'll never need to add
editor temporary files, or OS files to your repository ignore file, leaving it
free for files that actually relate to the repository.
