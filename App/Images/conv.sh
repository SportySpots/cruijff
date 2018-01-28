#!/bin/bash
# run this script to generate 2/3 and 1/3 resized images for .png in this folder and subdirectories
# original will be renamend to ~@3x etc.

PNGS=$(find . -name "*.png")
for PNG in $PNGS; do
  if [[ ! $PNG =~ ^.*@[23]x.png$ ]]; then
    BASE="${PNG%.*}"
    if [ ! -f $BASE@2x.png ]; then
      set -x
      mv $PNG $BASE@3x.png
      convert -resize 67% $BASE@3x.png $BASE@2x.png
      convert -resize 33% $BASE@3x.png $BASE.png
      set +x
    fi
  fi
done

