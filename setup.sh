#!/bin/bash

echo "🚀 Setting up Lucas Portfolio..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install additional required packages
echo "🔧 Installing additional packages..."
npm install tailwindcss-animate

# Add shadcn components
echo "🎨 Adding UI components..."
npx shadcn@latest add button --yes
npx shadcn@latest add card --yes
npx shadcn@latest add input --yes
npx shadcn@latest add textarea --yes
npx shadcn@latest add badge --yes
npx shadcn@latest add toast --yes

echo "✅ Setup complete! Run 'npm run dev' to start the development server."
