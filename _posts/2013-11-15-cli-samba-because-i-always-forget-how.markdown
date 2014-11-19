---
layout: post
title: CLI Samba - Because I ALWAYS Forget How
date: 2013-11-15 11:06:28.000000000 +00:00
---

I always forget how to copy files easily over the network using Samba so now I've just worked it out again for the umpteenth time I'll record it here.

Firstly you need to know the share you want to access so run the following to get a list of the shares on your network.

    smbtree

Once you know what server and share you want to connect to you can connect using smbclient which works in a similar fashion to an ftp client.

    smbclient //SERVER/"Share Name"

Notice I quoted the share name because it had a space in it, if you don't have spaces in your share names don't bother quoting it. It will prompt you for a password, if you are browsing as a guest and don't need a password you can just use -N on the command line to stop it asking you for one.

Once you are connected you should be at the smbclient prompt. From here you can use commands like ls and cd on the remote share and use lls and lcd (local ls and local cd respectively) to work on your local PC.

If you want to recursively grab a load of files from the remote machine without it asking you on every file you need to do the following.

    smb: \> recurse
    smb: \> prompt
    smb: \> mget "directory you want to grab"

The recurse option toggles on recursing (it's off by default), the prompt option toggles off prompting when doing things to multiple files (it's on by default) and then you need to use mget to get the remote files.
