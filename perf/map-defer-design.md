# Deferred map design

The landing page owns a typed map embed description and passes it to one small client boundary. The boundary renders the existing map container during SSR, observes that container with an `IntersectionObserver`, and mounts the iframe once it is within a generous preload margin. The observer disconnects after the first intersection.

The rejected alternative was a click-only map. It removes more network work, but it changes the current experience because the map no longer appears automatically when the visitor reaches the location section.

The chosen boundary preserves the current box geometry, iframe attributes, heading link, and map styling. Its only behavioral change is that third-party work moves off the initial navigation path. Browsers without `IntersectionObserver` mount the iframe immediately so the map remains available.
