#!/bin/bash

for arg in "$@"; do
  eval "$arg"
done

if [ -z "$VERSION" ]; then
  echo "Usage: $0 VERSION=x.y.z"
  exit 1
fi

SOURCE_DIR="./"
BUILD_DIR="dist/pkg"
INSTALL_DIR="opt/OpenBlockExternalResources"
PKGIGNORE_FILE="./buildResources/.pkgignore"
DEBIAN_DIR="$BUILD_DIR/DEBIAN"

# Clean previous build and create required directories
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/$INSTALL_DIR"

# Read exclusion patterns from .pkgignore
EXCLUDE_PARAMS=()
if [ -f "$PKGIGNORE_FILE" ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    [[ "$line" =~ ^#.*$ ]] && continue     # Skip comments
    [[ -z "$line" ]] && continue           # Skip empty lines
    EXCLUDE_PARAMS+=("--exclude=$line")
  done < "$PKGIGNORE_FILE"
fi

# Copy source files, excluding ignored paths
rsync -av "${EXCLUDE_PARAMS[@]}" "$SOURCE_DIR" "$BUILD_DIR/$INSTALL_DIR"

# Copy DEBIAN control files
mkdir -p "$DEBIAN_DIR"
cp ./buildResources/linux-scripts/* "$DEBIAN_DIR"

# Calculate the Installed-Size (in KB) for the control file
INSTALL_SIZE=$(find "$BUILD_DIR/" -type f -not -path "$DEBIAN_DIR/*" -exec du -b {} + | awk '{total+=$1} END {printf "%.0f\n", total/1024}')

# Update Installed-Size and Version fields in control file
sed -i "s/^Installed-Size: .*/Installed-Size: $INSTALL_SIZE/" "$DEBIAN_DIR/control"
sed -i "s/^Version: .*/Version: $VERSION/" "$DEBIAN_DIR/control"

# Build the .deb package
dpkg-deb -b "$BUILD_DIR" "./dist/OpenBlock-External-Resources-v$VERSION.deb"
