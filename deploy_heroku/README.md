# Caso de algum erro de keystore no android simulator.
rode o seguinte comand:

cd android/app
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
