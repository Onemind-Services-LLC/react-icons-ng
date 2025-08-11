#!/bin/bash -eux

# Ensure local icon repos are up to date before computing hashes.
time (cd packages/react-icons-ng/ && yarn fetch)
# Now update stored hashes based on freshly fetched origins.
time (cd packages/react-icons-ng/ && yarn update-hashes)
# Confirm no remaining diffs relative to stored hashes.
time (cd packages/react-icons-ng/ && yarn diff)

echo "Done."
