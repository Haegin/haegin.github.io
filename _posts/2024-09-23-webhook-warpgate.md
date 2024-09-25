---
layout: post
title: Webhook Warpgate
date: 2024-09-23 16:00:03
---

At Relay Platform we worked with a lot of API integrations and many of these
supported webhooks. Working with webhooks in development can be a pain because
you need a public URL for the webhook to hit that you've registered with the
API. Many of the services we integrated with had a very manual process to
update the webhook URL (as in, we emailed their team and they changed it for
us) so it wasn't feasible to change it every time a developer needed to test
features that used webhooks.

Initially, we used Ngrok[ngrok] which provides a public URL that tunnels to your local
client. We had a paid account with an endpoint that we'd register with the
external systems so we didn't need to change them each time. This worked okay
initially, though only one developer could use Ngrok at once so it required
some coordination between developers. As we grew we added more services using
webhooks and the coordination became more difficult and the single account
became a bottleneck. We needed a better solution.

To solve this problem I built a service I called Webhook Warpgate. It was
deployed on a public facing URL to receive incoming webhook requests and
forwarded those requests on to one or more registered clients. We used
Tailscale[tailscale] as our Engineering VPN so by connecting Warpgate to our
Tailnet we could forward the requests to individual developer machines without
them needing to do any additional setup beyond connecting to the VPN.

The service was built in Go and used the Gin web framework, with a simple
vanilla JS frontend. The frontend allowed developers to register new webhook
endpoints (the address we'd provide to the external service) and to register
listeners against those webhooks.

To forward the requests to the clients we used Traefik[traefik]. It was
configured to load its configuration from a route served by the Go backend
which allowed us to dynamically update the Traefik configuration as developers
added and removed listeners and endpoints.

At Relay Platform we used Docker containers and Hashicorp's Nomad for
orchestration. We deployed Warpgate as a Nomad job with one service for the
service and one for the Traefik instance reading the configuration. Both were
configured with access to the Tailnet but only the Traefik instance was
available to the outside world.

Using Tailscale made this project significantly easier to build and manage.
Because the configuration interface was only available on our internal VPN we
didn't need to implement any authentication or authorization for the frontend
and we could trust that only our developers could access it. Additionally, with
developer machines already being connected to the tailnet we didn't need any
additional setup to forward requests to the clients, making it easy to drive
adoption within the team. If you don't already use Tailscale I highly recommend
taking a look at it. We were small enough that a completely open application on
the internal network was sufficient, but for larger teams or more sensitive
applications you can also use Tailscale's ACLs to restrict access to specific
internal services, or use a device's Tailscale connection to authenticate
users.

Traefik also simplified the implementation. Routing requests to multiple
endpoints can be complex and error-prone, so by using Traefik we were able to
build on the shoulders of giants rather than needing to replicate that logic
just for this application.

Sadly when Relay Platform closed down in August 2024 we were unable to open
source the project, but I'm considering rebuilding it as a personal project as
the problem of working with webhooks in development is one that I've faced
before and I'm sure that I'll face again.

[ngrok]: https://ngrok.com
[tailscale]: https://tailscale.com
[traefik]: https://traefik.io

