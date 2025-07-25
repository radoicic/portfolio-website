Write-Host "🚀 Setting up Lucas Portfolio..." -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Install additional required packages
Write-Host "🔧 Installing additional packages..." -ForegroundColor Yellow
npm install tailwindcss-animate

# Add shadcn components
Write-Host "🎨 Adding UI components..." -ForegroundColor Yellow
npx shadcn@latest add button --yes
npx shadcn@latest add card --yes
npx shadcn@latest add input --yes
npx shadcn@latest add textarea --yes
npx shadcn@latest add badge --yes
npx shadcn@latest add toast --yes

Write-Host "✅ Setup complete! Run 'npm run dev' to start the development server." -ForegroundColor Green
