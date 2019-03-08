---
layout: post
title: Shrink your component API
date: 2019-03-08 10:40:31
---

Something came up recently at work when developing a React component that I ended up writing quite a lengthy PR comment on, and I realised it could be a useful blog post to refer back to.

We use styled-components, so that's what I'll use in these examples, but it applies equally to any situation where you're using the props to change the style of a component. In this case, we were changing the width of a container based on the props and the initial version of the component had something like the following:

    const Container = styled.div`
      // Other styling excluded
      max-width: ${props => props.maxWidth};
    `

The component takes in a `maxWidth` prop and it just uses it as the CSS value for `max-width`, so the API of our component allows any value that is valid CSS. That means that as a maintainer of this component we're committing to make sure this component works with a whole bunch of possible values:

- 1px
- 1000px
- 1000rem
- 50vh
- 150vb
- 5in (TIL CSS supports inches. How quaint)

Every time I've seen this pattern used, the component doesn't actually need to support anywhere near as many different possibilities as this. It probably only needs to support 2, and at most it's likely to need to support 3 or 4.

If we just need to support 2 widths then it's probably one that's the most common, and a variant that we use in a few places. That variant might be wider or narrower than the default, so we could use a `wide` or `narrow` prop. If that prop is true, we'll use the variant size, if it's not true (which would be the default) we just use the default size.

    max-width: ${props => props.wide ? '1500px' : '980px'};`

Now our component exposes a *MUCH* smaller API - a single boolean allowing the user to select between two possible options. We also only have to test those 2 things (in each of the browsers we want to support).

If we're supporting a few more options, then it gets a bit harder, but it's still not too bad. Let's assume that we've got the normal version, as well as both a wide version and a narrow version. Let's even be a little excessive and say there's also an extra-wide version as well.

    const setWidth = width => ({
    	narrow: '500px',
    	normal: '980px',
    	wide: '1500px',
    	extraWide: '8000px',
    }[width] || '980px')
    
    const Container = styled.div`
      max-width: ${props => setWidth(props.width)};
    `

Now the component API allows users to specify one of four fixed widths, it still defaults to the correct width if they don't say otherwise, and if they try to use something else, it gives them the default. Again, the API is reduced to what we need to support for the application, and we only have to test that.

As well as the smaller API, this also helps prevents errors. It'd be very easy for someone to forget to check a value, and end up with a `maxWidth="980px"` on one page and `maxWidth="920px"` on another. That's not possible if our API requires people to specify what they want in a way that is meaningful to the app (wide, narrow, default, etc).
