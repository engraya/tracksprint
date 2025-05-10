## <a name="core">🛋️ LosodeHomeware</a>

LosodeHomeware is a modern eCommerce platform focused on selling premium homeware products. Designed with performance and user experience in mind, it allows users to explore, search, and shop for home goods with ease. It’s built using cutting-edge technologies like React, Next.js, TypeScript, Tailwind CSS, and features lightning-fast product search with Fuse.js.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js - Javascript Library for building User Interfaces.
- Next.js - React framework for server-side rendering, static site generation, and routing.
- TypeScript - A superset of JavaScript that adds static typing.
- Tailwind CSS - Utility-first CSS framework for rapidly building custom designs.
- Fuse.js – Lightweight fuzzy search for blazing fast client-side filtering.
- Context API – Built-in state management for handling global search state.


## <a name="features">🔋 Features</a>

- 🛍️ eCommerce Homeware Catalog – A curated list of stylish and functional home products.
- 🔍 Instant Product Search – Fuzzy, typo-tolerant product search using Fuse.js.
- 📱 Responsive UI – Mobile-first responsive design powered by Tailwind.
- 🧠 Smart Filtering – Context-based search display that reorders or hides components based on search activity.
- 🚀 Next.js Optimizations – Fast rendering, image optimization, and SEO support.
- 🎨 Reusable Components – Modular architecture with clean and maintainable code.
- 🧼 Clean Design – Aesthetic UI with clear visual hierarchy and interaction feedback.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)


  
**Cloning the Repository**

```bash
git clone https://github.com/engraya/losode-homeware
cd losode-homeware
```

**Project Structure**


**Setup**
1.Navigate to the frontend folder:
```bash
cd ../losode-homeware
```
2.Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open your browser and go to:
```bash
http://localhost:3000
```

**Installation**

Install the project dependencies using npm:

```bash
# Clone the repository
git clone https://github.com/engraya/losode-homeware

# Navigate into the project
dc losode-homeware

# Install dependencies
npm install   # or yarn install
```


## <a name="usage">🎨 How it Works</a>

1. The home page displays all sections including Hero, Featured, Categories, and Products.
2. When a user types in the search field, the global search state is updated using Context API.
3. The Products component listens to the search query and uses Fuse.js to filter results.
4. If a search is active:
    - Products are shown at the top.
    - Other components are hidden.
5. If no product matches the search:
    -A friendly message suggests exploring other categories.


## <a name="usage">🔥 Future Enhancements</a>

- 🛒 Add to Cart & Checkout Flow
- 👥 User Authentication & Profile Management
- 📊 Admin Dashboard for Inventory Management
- 💳 Payment Integration (Stripe/Paystack)
- 🌍 Internationalization & Currency Conversion

  

## <a name="usage">🤝 Contributing</a>

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-branch
3. Commit changes: git commit -m "Added new feature"
4. Push to GitHub: git push origin feature-branch
5. Open a Pull Request.


## <a name="usage">🙌 Acknowledgments</a>

Special thanks to:
- Fuse.js for blazing fast client-side filtering.
- The React, Vercel & Nextjs communities for their amazing tools!


## <a name="usage">🌐 Deployment</a>
You can deploy losode-homeware on platforms like Vercel, Render, AWS Lambda, Firebase Functions, or Heroku.

Vercel Deployment
- Push the project to a GitHub repository.
- Connect your GitHub repo to Vercel.
- Set up the environment variables in Vercel's dashboard for production.
- Deploy the app to Vercel.
- Vercel will automatically build and deploy the app whenever changes are pushed to your main branch.


## <a name="usage">📬 Contact</a>

- 👨‍💻 Author: Ahmad Yakubu Ahmad (@engraya)
- 📧 Email: engrahmadaya@gmail.com
- 🌐 Portfolio: https://engrahmadaya.vercel.app


