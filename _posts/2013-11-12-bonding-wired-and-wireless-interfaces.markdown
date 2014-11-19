---
layout: post
title: Bonding wired and wireless ethernet devices together to improve reliability
date: 2013-11-12 14:46:07.000000000 +00:00
---

A short while ago I was having some problems with certain housemates deciding to unplug my server (which I use for IRC, general tasks, file sharing, remote access and torrenting) from the network. This began to get slightly annoying as I was often using the server remotely at the time so I grabbed an old wireless USB stick I had lying around and set up bonding using my wired ethernet as the main connection and the wireless as the fallback.

It took a while to get the configuration right as the various guides on the Internet all seem to be aimed at bonding two wired devices together for extra speed (a nice idea but gigabit is plenty fast enough and when I was trying this I didn't have a spare gigabit interface on both my desktop and my server). In the end I got it working with the configuration below. The wireless key has been changed for security reasons.

    # Bring up lo and bond0 on boot
	auto lo bond0

    # The loopback interface
    iface lo inet loopback

	iface bond0 inet dhcp
		bond_mode		active-backup
		bond_primary	eth0
		bond_miimon		100
		bond_downdelay	200
		bond_updelay	200
		slaves			eth0 wlan0
    # You only need the lines below if you don't use DHCP
	#	netmask			255.255.255.0
	#	address			192.168.1.100
	#	network			192.168.1.0
	#	gateway			192.168.1.1
	#	broadcast		192.168.1.255
		wpa-driver		wext
		wpa-ssid		"my-wireless-network-name"
		wpa-iface		wlan0
		wpa-key-mgmt	WPA-PSK
		wpa-psk			"my-wireless-network-password"

This brings up the bond0 interface on startup which starts the eth0 and wlan0 interfaces. The `bond_` entries control the bonding. `bond_mode` ensures we use the primary interface where possible and fall back to the slave when it isn't available. `bond_primary` sets eth0 as the primary interface leaving wlan0 as the slave. `bond_miimon` seems to be set to 100 in every guide I found and is apparently the MII monitor time interval, whatever that is. `bond_downdelay` sets how long to wait after a host is found to be down before confirming it is down and switching to a fallback host. `bond_updelay` works similarly when an interface comes back up. This stops a flakey network connection causing so many problems. All these time settings are measured in milliseconds.
