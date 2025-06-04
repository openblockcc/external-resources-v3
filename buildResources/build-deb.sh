#!/bin/bash

VERSION="1.0.0"

while getopts "v:" opt; do
  case $opt in
    v)
      VERSION=$OPTARG
      ;;
    *)
      echo "Usage: $0 [-v version]"
      exit 1
      ;;
  esac
done

SOURCE_DIR="./"
BUILD_DIR="dist/pkg"
INSTALL_DIR="opt/OpenBlockExternalResources"

PKGIGNORE_FILE="./buildResources/.pkgignore"
EXCLUDE_PARAMS=()

if [ -f "$PKGIGNORE_FILE" ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    [[ "$line" =~ ^#.*$ ]] && continue
    [[ -z "$line" ]] && continue
    EXCLUDE_PARAMS+=("--exclude=$line")
  done < "$PKGIGNORE_FILE"
fi

rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR/$INSTALL_DIR

rsync -av "${EXCLUDE_PARAMS[@]}" "$SOURCE_DIR" $BUILD_DIR/$INSTALL_DIR

# copy DEBIAN files to dist
mkdir -p "$BUILD_DIR/DEBIAN"
cp ./buildResources/linux-scripts/* $BUILD_DIR/DEBIAN

# get the size of the installation file
INSTALL_SIZE=$(find $BUILD_DIR/ -type f -not -path "$BUILD_DIR/DEBIAN/*" -exec du -b {} + | awk '{total+=$1} END {printf "%.0f\n", total/1024}')

# update the Installed-Size and Version field in the control file
sed -i "s/^Installed-Size: .*/Installed-Size: $INSTALL_SIZE/" $BUILD_DIR/DEBIAN/control
sed -i "s/^Version: .*/Version: $VERSION/" $BUILD_DIR/DEBIAN/control

dpkg-deb -b $BUILD_DIR "./dist/OpenBlock-External-Resources-v$VERSION.deb"
