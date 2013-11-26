# safe-to-hover.js

Making pages scroll smoothly is super important and `:hover` does not play well
with scrolling.

Why? [Because painting is really

scroll a page fast, it leaves a trail of required repainting underneath the
cursor as the document flies by. This makes the page janky. We dont like jank.

For a fix, roll on over to 
https://plus.google.com/+MalteUbl/posts/NsyYKenqYNP
