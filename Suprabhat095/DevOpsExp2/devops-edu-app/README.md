### Making Code Changes
1. Start development environment: `docker-compose up --build`
2. Edit files in `src/` directory
3. Changes automatically reload in browser
4. Test your changes at http://localhost:3000

### Building for Production
1. Run production build: `docker-compose -f docker-compose.prod.yml up --build`
2. Optimized bundle served via Nginx at http://localhost
3. Test performance and functionality