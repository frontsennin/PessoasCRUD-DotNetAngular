#!/bin/bash

echo "💜 Configurando .NET no Git Bash..."
echo ""

# Adiciona o .NET ao PATH
export PATH="$PATH:/c/Program Files/dotnet"

# Cria alias para facilitar
alias dotnet="/c/Program Files/dotnet/dotnet.exe"

echo "✅ .NET configurado!"
echo "📋 Comandos disponíveis:"
echo "   dotnet --version"
echo "   dotnet restore"
echo "   dotnet run"
echo ""
echo "🚀 Para executar o backend:"
echo "   cd backend/PessoasAPI"
echo "   dotnet restore"
echo "   dotnet run"
echo ""
echo "🎨 Para executar o frontend:"
echo "   cd frontend"
echo "   npm install"
echo "   npm start" 