#!/bin/bash -eux

# Update icon source hashes to the latest refs per branch
time (cd packages/react-icons-ng/ && yarn update-hashes)

# Refresh sources and rebuild components using updated hashes
time (cd packages/react-icons-ng/ && yarn fetch)
time (cd packages/react-icons-ng/ && yarn build)
time (cd packages/react-icons-ng/ && yarn diff)

# Keep formatting consistent after any changes
yarn format

echo "Done."

