#!/bin/bash -eux

time (cd packages/react-icons-ng/ && yarn update-hashes)
time (cd packages/react-icons-ng/ && yarn fetch)
time (cd packages/react-icons-ng/ && yarn diff)

echo "Done."