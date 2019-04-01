---
layout: post
title: Working over SSH - opening URLs locally
date: 2019-04-01 15:10:31
---

For the last six months or so I've been doing the majority of my development
work on an AWS box that I SSH into. I use Tmux so I don't lose everything if my
connection goes down and Vim for editing and almost everything works great
(with a few port forwards set up so I can access development servers running on
the AWS box in my local browser).

One thing that has been a bit annoying in the process, is that I have to copy
URLs to open locally. The breaking point was last Friday when a command I ran
just assumed the browser would work and happily opened
[links](http://www.jikos.cz/~mikulas/links/). It's a lovely little browser, but
the JS based app that launched it was a bit too modern for it. It was finally
time to fix the issue once and for all.

A lot of this is entirely stolen from how my copy/paste support works which
I pieced together from various places when I first set things up. Also sorry,
this requires some set up on both ends so it's not a great solution for using
with lots of remote servers.

## Opening URLs over SSH

You will need:

- A remote server running Linux with:
  - tmux
  - xdg-utils
  - netcat
  - base64
- A Mac (though this would be fairly easy to adapt to a local Linux host)

### Local Setup

1. Create a new script somewhere in your path (I used ~/bin/open)

```
#!/bin/bash

echo "opening $@"
open $(cat "$@" | base64 -D)
```

2. Make it executable. `chmod +x ~/bin/open`

3. Create a LaunchAgent plist for it

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
     <key>Label</key>
     <string>localhost.open</string>
     <key>ProgramArguments</key>
     <array>
       <string>/Users/harry/bin/net-open</string>
     </array>
     <key>inetdCompatibility</key>
     <dict>
          <key>Wait</key>
          <false/>
     </dict>
     <key>Sockets</key>
     <dict>
          <key>Listeners</key>
               <dict>
                    <key>SockServiceName</key>
                    <string>20501</string>
                    <key>SockNodeName</key>
                    <string>localhost</string>
               </dict>
     </dict>
</dict>
</plist>
```

4. Launch it. `launchctl load ~/Library/LaunchAgents/open.plist`

Ok, that should be everything working locally. Remember the port number, we'll
need it later (20501 above). It's only listening locally for security.

### Remote setup

1. We need a script to send the URL over the network.

```
#!/bin/bash

# A script to open a webpage on any platform

set -eu

is_app_installed() {
  type "$1" &>/dev/null
}

# If we're called with an argument, open that, otherwise assume it's stdin
if [ "$#" -eq 0 ]; then
  echo "Reading from stdin. Enter the URL followed by EOF (Ctrl+D)."
  buf=$(cat "$@")
else
  buf=$1
fi

open_backend_remote_tunnel_port=$(tmux show-option -gvq "@open_backend_remote_tunnel_port")

# Resolve open backend: open (OSX), xdg-open (Linux)
open_backend=""
echo $0
if is_app_installed open && [ "$(which open)" != "$0" ]; then
  open_backend="open"
elif [ -n "${open_backend_remote_tunnel_port-}" ] && [ "$(ss -n -4 state listening "( sport = $open_backend_remote_tunnel_port )" | tail -n +2 | wc -l)" -eq 1 ]; then
  open_backend="base64 | nc -c localhost $open_backend_remote_tunnel_port"
elif [ -n "${DISPLAY-}" ] && is_app_installed xdg-open; then
  open_backend="xdg-open"
fi

# if open backend is resolved, open and exit
if [ -n "$open_backend" ]; then
  printf "%s" "$buf" | eval "$open_backend"
  exit;
else
  echo "No backend available. Ensure open or xdg-open is available, or the remote server is listening if using over SSH."
  exit 1
fi
```

2. We need to tell the script what port we're listening on. This is done
   through Tmux in `~/.tmux.conf`.

`set -g "@open_backend_remote_tunnel_port" 20501`

3. We need to forward the port in SSH so we hit the local listening server.
   This is done in `~/.ssh/config`. Set up an entry for the remote host.

```
Host devbox
  HostName my_sweet_devbox.example.com
  RemoteForward 20501 127.0.0.1:20501
```

4. Ok, start tmux and let's test the script. Run `open https://google.com` and
   it should open in your browser on your local machine. Awesome! We're 95% of
   the way there.

The last thing to do is to tell your remote machine about the new command so it
knows to use that instead of `links` to open URLs in future. We can do that
using xdg-utils.

5. We need a `open.desktop` file in the correct format for XDG so it knows how
   to use our new script.

```
# Desktop file for use with `open` to support xdg-utils
[Desktop Entry]
Name=Open
Type=Application
Exec=open %u
Terminal=true
```

6. Finally we can tell our system that we want to use this for URLs. To do that
   we just need to run two commands (one for HTTP and one for HTTPS).

```
xdg-mime default bin/open.desktop x-scheme-handler/https
xdg-mime default bin/open.desktop x-scheme-handler/http
```

You should be all done! Remote applications opening URLs will launch in your
local browser (provided they respect the XDG specification - see below) and you
can open URLs manually with `open <URL>`.

## Troubleshooting

- Some apps don't respect the XDG specification. I'm not sure what they use to
  decide which browser to use but for Create React App you can set a `BROWSER`
  env var to `open` and it'll work correctly.
