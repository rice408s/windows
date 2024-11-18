# 创建字体目录
New-Item -ItemType Directory -Force -Path "public/fonts"

# 设置工作目录
Set-Location "public/fonts"

# 下载字体文件
$fonts = @{
    "PerfectDOSVGA437" = "https://fonts.cdnfonts.com/s/54103/PxPlus_IBM_VGA9.woff2"
    "C64_Pro" = "https://cdn.jsdelivr.net/gh/photopea/Photopea-Fonts@master/C64_Pro_Mono-STYLE.woff2"
    "TopazPlus" = "https://web.archive.org/web/20220000000000/https://kreativekorp.com/software/fonts/TopazPlus.woff2"
    "ChicagoFLF" = "https://cdn.jsdelivr.net/gh/photopea/Photopea-Fonts@master/ChicagoFLF.woff2"
    "PressStart2P" = "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2"
}

foreach ($font in $fonts.GetEnumerator()) {
    Write-Host "Downloading $($font.Key)..."
    try {
        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($font.Value, "$($font.Key).woff2")
    }
    catch {
        Write-Host "Failed to download $($font.Key): $_"
        continue
    }
}

# 不需要转换了，因为我们直接下载 woff2 格式
Write-Host "Font setup complete!" 