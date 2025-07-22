@echo off
echo 💜 Iniciando o Backend .NET Core...
echo.
cd backend\PessoasAPI
echo Restaurando dependencias...
dotnet restore
echo.
echo Executando o projeto...
dotnet run
pause 