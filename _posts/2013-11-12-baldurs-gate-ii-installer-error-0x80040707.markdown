---
layout: post
title: Baldur's Gate II installer error 0x80040707
date: 2013-11-12 15:27:17.000000000 +00:00
---
While installing Baldur's Gate II in Linux using WINE the installer threw error 0x80040707 right at the end of the InstallShield preparing to install step. It turned out it was being caused by one of the folders referenced in the registry not actually existing.

The fix is detailed on the [InstallShield website here](http://consumerdocs.installshield.com/selfservice/viewContent.do?externalId=Q108167&sliceId=1). To get to regedit in wine just run it as a normal command from the command line. The folder that was causing me problems was

    ~/.wine/drive_c/windows/profiles/All users/Start Menu/Programs/StartUp
