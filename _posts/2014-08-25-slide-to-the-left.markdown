---
layout: post
title: Slide to the left
date: 2014-08-25 09:33:36.000000000 +01:00
---
Github has recently made some small changes to how you comment on pull requests. The button to add a comment is now between the line number gutter and the code and when the form opens it's aligned with the leftmost edge of the line number columns.

The button change I'm fine with but that left aligned form is ugly and annoys me (and most other people I've spoken to about it). Until Github fix it (hopefully soon) I've written a quick Stylish style to get the form (and the comments on the PR) back to where they should be. Feel free to use it yourself if you want.

```css
.inline-comment-form, .comment-holder {
    position: relative;
    left: 70px;
}
```
