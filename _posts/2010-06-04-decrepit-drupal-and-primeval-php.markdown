---
layout: post
title: Decrepit Drupal and Primeval PHP
category: webdev
---

A few days ago I got a call from a charity I had done some web development work for in the past saying they couldn't log in to their [Drupal](http://drupal.org) powered website. After checking the permissions in the database and on the files I tracked the problem down with the help of the Drupal FAQs. Turns out an old version of Drupal on a new version of PHP was causing problems.

The site was made back when PHP 4 was still all we had but since then my webhost, [Dreamhost](http://www.dreamhost.com/r.cgi?433924), who I highly recommend for their great service, gave me the option of switching to PHP 5 and I took it but didn't check that the version of Drupal used by [the Shonda website](http://shonda.org.uk) worked on PHP 5. A quick visual check of the site seem to show it to be fine but as soon as anyone logged in they were logged out once they reached the next page, as if the session cookie wasn't being saved.

The fix from the Drupal website was to add a line to the config file as a temporary solution with the advice to upgrade the site as soon as possible. As there are more changes for the site planned this summer the upgrade will probably wait until then but if anyone else is running a suitably old version of Drupal with PHP5 you might have problems.
