---
layout: post
title: Unchecking Trello Cards
date: 2014-01-17 12:02:32.000000000 +00:00
---
I use [Trello](http://trello.com) quite a lot at work and one feature that's always been quite handy is the checklists you can add to cards. Unfortunately, sometimes these lists get quite long and if you ever need to uncheck them all it can take a while.

To fix this I wrote a quick bit of JS that finds all the checked items on the current card and clicks them so they all end up unchecked. I then wrapped this up in a bookmarklet so just copy the code below and use it as the URL for your bookmark and uncheck ALL THE THINGS!

``` javascript
javascript:(function(e,a,g,h,f,c,b,d)%7Bif(!(f%3De.jQuery)%7C%7Cg>f.fn.jquery%7C%7Ch(f))%7Bc%3Da.createElement("script")%3Bc.type%3D"text/javascript"%3Bc.src%3D"http://ajax.googleapis.com/ajax/libs/jquery/"%2Bg%2B"/jquery.min.js"%3Bc.onload%3Dc.onreadystatechange%3Dfunction()%7Bif(!b%26%26(!(d%3Dthis.readyState)%7C%7Cd%3D%3D"loaded"%7C%7Cd%3D%3D"complete"))%7Bh((f%3De.jQuery).noConflict(1),b%3D1)%3Bf(c).remove()%7D%7D%3Ba.documentElement.childNodes%5B0%5D.appendChild(c)%7D%7D)(window,document,"1.3.2",function(%24,L)%7B%24(%27.checklist-item-state-complete .checklist-item-checkbox%27).click()%7D)%3B
```
