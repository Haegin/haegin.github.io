---
layout: post
title: Git grep and gitattributes
date: 2014-04-09 16:42:18.000000000 +01:00
---
Git has a grep ability. It's way faster than `grep` and ignores stuff in the `.git` directory that you probably weren't looking for anyway. This `git grep` command takes a `-p` argument that shows *the method or class the matched lines are in*.

That's pretty cool.

Out of the box (on my machine at least) on my Ruby code it shows the class definition lines the matched lines are in. As this is generally easy to derive from the filename that doesn't seem so useful. That's where gitattributes comes in.

Git lets you specify a gitattributes file (`.gitattributes` in a repo, `.config/git/attributes` for all your repos) and you can use this to specify which files should use which diff drivers (among other things).

```
*.rb diff=ruby
```

This sets all files that match `*.rb` to use the ruby diff driver.

Git has several different git drivers built in:

* ada suitable for source code in the Ada language.
* bibtex suitable for files with BibTeX coded references.
* cpp suitable for source code in the C and C++ languages.
* csharp suitable for source code in the C# language.
* fortran suitable for source code in the Fortran language.
* html suitable for HTML/XHTML documents.
* java suitable for source code in the Java language.
* matlab suitable for source code in the MATLAB language.
* objc suitable for source code in the Objective-C language.
* pascal suitable for source code in the Pascal/Delphi language.
* perl suitable for source code in the Perl language.
* php suitable for source code in the PHP language.
* python suitable for source code in the Python language.
* ruby suitable for source code in the Ruby language.
* tex suitable for source code for LaTeX documents.

You can enable some or all of these in your `gitattributes` file as follows:

```
*.rb     diff=ruby
*.html   diff=html
*.htm    diff=html
*.java   diff=java
*.cpp    diff=cpp
*.php    diff=php
*.python diff=python
*.m      diff=objc
*.adb    diff=ada
*.ads    diff=ada
```

Now, when we run the same `git grep -p` command in Ruby the heading that's added shows the method definition line for the method the match was inside. Neat.
