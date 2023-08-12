#!/bin/bash -eux

time (cd packages/react-icons-ng/ && yarn fetch)
time (cd packages/react-icons-ng/ && yarn build)
time (cd packages/react-icons-ng/ && yarn diff)
(cd packages/_react-icons-ng_all/ && npm pack |& tail)

(cd packages/preview/ && yarn build)
(cd packages/demo/ && CI=true yarn test && yarn build)
(cd packages/webpack5-test/ && CI=true yarn test)
(cd packages/ts-test/ && SKIP_PREFLIGHT_CHECK=true yarn build)

# Update README.md with updated Icon version list
VERSION_CONTENT=$(cat packages/react-icons-ng/VERSIONS)
START_COMMENT="\[\/\/\]: # START_VERSION"
END_COMMENT="\[\/\/\]: # END_VERSION"

# Extract the total sum from the Count column
SUM=$(echo "$VERSION_CONTENT" | awk -F '|' 'NR>2 {sum+=$5} END {print sum}')

# Prepare the total sum content
SUM_CONTENT="Total Count of Icons: $SUM"

# Make a temporary file
TEMP_FILE=$(mktemp)

# Write everything up to START_COMMENT to temp file
awk "/$START_COMMENT/{exit}1" README.md > "$TEMP_FILE"

# Add the start comment, version content, total count, and end comment
echo -e "[//]: # START_VERSION\n\n$VERSION_CONTENT\n\n$SUM_CONTENT\n" >> "$TEMP_FILE"

# Write everything after END_COMMENT to temp file
awk "BEGIN{p=0}/$END_COMMENT/{p=1}p" README.md >> "$TEMP_FILE"

# Replace README.md with temp file
mv "$TEMP_FILE" README.md

# Run formatter
yarn format
