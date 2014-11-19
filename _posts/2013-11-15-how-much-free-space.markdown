---
layout: post
title: How Much Free Space?
date: 2013-11-15 11:04:04.000000000 +00:00
---
I have several hard drives and when times are hard and space is scarce I often need to work out how much space I have left to stash random crap in. Now I could look at the output of `df -h` and do some fairly basic mental arithmetic and come to a reasonable conclusion. Alternatively I could use my super handy shell script I just wrote.


    #!/usr/bin/zsh

    NUMB=0

    df | while read line; do
        thing=$( echo $line | awk '{ print $4 }' )
        if [ $thing -gt 0 ] 2> /dev/null; then
            NUMB=$(( $NUMB + $thing ))
        fi
    done

    echo $(( $NUMB / 1024 / 1024 )) MB

For those who don't know shell scripting that well there are a few potentially odd constructs in there. Firstly the `df | while read line` bit lets me read the output of the df command line by line. Each iteration through the loop sets the value of `$line` to the next line.

Secondly the `[ $thing -gt 0 ] 2> /dev/null` part prevents any lines where the part we have grabbed isn't a positive number (this should just be the heading line) from causing problems when we try to add it to the running total of free space. The comparison to ensure it is greater than 0 returns true (a return code of 0) if the number is greater than zero, false (returning 1) if it's a number less than 0, and false again (returning 2 this time) if `$thing` wasn't even a number. The `2> /dev/null` sends any error message (one is produced if `$thing` isn't a number) to the black hole device inside your computer.

Finally the `$(( ))` construct is just one way to do maths in bash and zsh.
