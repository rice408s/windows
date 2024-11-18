#!/bin/bash

# 创建字体目录
mkdir -p public/fonts

# 下载字体文件
cd public/fonts

# DOS 字体
curl -O https://int10h.org/oldschool-pc-fonts/download/ultimate_oldschool_pc_font_pack_v2.2.zip
unzip ultimate_oldschool_pc_font_pack_v2.2.zip
mv "Ultimate Oldschool PC Font Pack v2.2"/Px437_IBM_VGA_9x16.ttf PerfectDOSVGA437.ttf
rm -rf "Ultimate Oldschool PC Font Pack v2.2" ultimate_oldschool_pc_font_pack_v2.2.zip

# 其他字体
curl -O https://github.com/kreativekorp/open-relay/raw/master/Fonts/C64_Pro_Mono-STYLE.ttf
curl -O https://github.com/kreativekorp/open-relay/raw/master/Fonts/TopazPlus.ttf
curl -O https://github.com/kreativekorp/open-relay/raw/master/Fonts/ChicagoFLF.ttf
curl -O https://github.com/kreativekorp/open-relay/raw/master/Fonts/PrintChar21.ttf

# 转换为 woff2
for f in *.ttf; do
  woff2_compress "$f"
  rm "$f"
done 