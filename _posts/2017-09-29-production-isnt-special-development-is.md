---
layout: post
title: Production isn't special, development is
date: 2017-09-29 12:30:00
---

When writing code to handle differences between environments it's often tempting
to use something like this:

```
if (process.env.NODE_ENV === 'production') {
  // use the optimised version
} else {
  // use the version with debugging support
}
```

This works fine until something gets broken in the version used for production.
Because it's only run in production you won't discover the issue until you
deploy production, when it's potentially too late and might require a rollback.

Instead of making production the special environment, we can turn this around
and make development special. After all, almost everyone who uses this app uses
the production version most of the time.

```
if (process.env.NODE_ENV === 'development') {
  // use the version with debugging support
} else {
  // use the optimised version
}
```

Now, with a fairly minimal change, we'll catch any errors in the production
code when we deploy to the integration or staging environment. We won't
need to disrupt the user experience with a rollback. This all ties back to
wanting staging to be as similar as possible to production.
