## <a name="core">🏃‍♂️ TrackSprint</a>

TrackSprint is your all-in-one task and sprint management platform. Create, assign, and track tasks effortlessly with full user authentication, real-time updates, and intuitive controls — all built for high performance and productivity.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React (with Vite) – Fast front-end tooling for blazing development speed.
- Redux Toolkit – Simplified and scalable state management.
- Formik + Yup – Robust forms with powerful validation.
- Supabase – Backend-as-a-service for database, auth, and real-time functionality.
- Axios – Promise-based HTTP client.
- Material UI (MUI) – Accessible, responsive component library.
- TypeScript – Type-safe codebase for maintainability and scalability.
- React Testing Library + Vitest – Reliable and easy-to-use testing tools.


## <a name="features">🔋 Features</a>

- 📝 Task Management – Create, update, and view tasks with ease.
- 🧠 Sprint Organization – Group tasks under sprint cycles for agile tracking.
- 👥 Mock Assignees – Assign tasks to predefined mock team members.
- 🔐 Authentication – User login/signup via Supabase.
- 📄 Validation – All forms validated with Formik and Yup.
- 💡 Modern UI – Clean and responsive UI using Material UI.
- 🔄 Real-time Updates (coming soon) – Stay in sync with team changes.
- 🧪 Test Coverage – Tested components for reliable behavior.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)


  
**Cloning the Repository**

```bash
git clone https://github.com/engraya/tracksprint
cd tracksprint
```

**Project Structure**


**Setup**
1.Navigate to the frontend folder:
```bash
cd ../tracksprint
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
http://localhost:5173
```

**Installation**

Install the project dependencies using npm:

```bash
# Clone the repository
git clone https://github.com/engraya/tracksprint

# Navigate into the project
dc tracksprint

# Install dependencies
npm install   # or yarn install
```

**🧱 Project Structure (Simplified)**

![Database Schema](./assets/schema.png)


```bash
src/
├── components/       # Reusable UI components
├── assets/           # static files and images
├── layouts/          # layout files
├── lib/              # global functions and db configs
├── pages/            # Route views
├── types/            # TypeScript types
├── routes/           # Public and Private routes configs
├── services/         # Supabase & Axios utils
├── store/            # Redux slices and logic
└── validations/      # Global validations logic
```


## <a name="usage">🎨 How it Works</a>

1. Users can log in or sign up with Supabase auth.
2. On the dashboard, users can create sprints and view them in a list or tree.
3. Each sprint can have tasks added with descriptions, assignees, status, and estimated hours.
4. Tasks are linked to mock assignees for simplicity.
5. Users can edit task details and see nested parent-child task relationships.


## <a name="usage">🔥 Future Enhancements</a>

- 🟢 Real-time updates with Supabase subscriptions
- 📊 Admin overview dashboard
- 🔁 Drag-and-drop task reordering
- 🔔 Notifications system
- 🧑‍🤝‍🧑 Auth-based task ownership (per real users)
- 🗃️ Task history and activity logs


## <a name="usage">🤝 Contributing</a>

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-branch
3. Commit changes: git commit -m "Added new feature"
4. Push to GitHub: git push origin feature-branch
5. Open a Pull Request 🎉


## <a name="usage">🙌 Acknowledgments</a>

- Supabase for providing an easy and powerful backend-as-a-service.
- Redux Toolkit team for simplifying state management in React.
- Material UI (MUI) for the elegant and accessible component library.
- Formik + Yup community for robust form handling and validation tools.
- The React, Vite, and TypeScript communities for their outstanding ecosystem and developer experience.




## <a name="usage">🌐 Deployment</a>
You can deploy Tracksprint on platforms like Vercel, Render, AWS Lambda, Firebase Functions, or Heroku.

Steps:
     - Connect your GitHub repo to the platform.
     - Set environment variables for Supabase (API key, URL).
     - Build and deploy!

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


