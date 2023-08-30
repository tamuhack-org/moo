for %%i in (*) do call :conv %%i

  :conv

  set filepath=%1
  magick "%filepath%" -resize 500x500 "%filepath%"
  goto :eof
