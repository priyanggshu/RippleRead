import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/Blog_Context";
import { AuthProvider } from "./context/Auth_Context";
import Home from "./pages/Home";
import Protected from "./components/Protected";

function App() {
  return (
    <BlogProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Auth pages */}
            {/* <Route path="/Signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> */}

            {/*Protected exclusively till Logged-in users*/}
            <Route
              // path="/dashboard"
              // element={
              //   <Protected>
              //     <Dashboard />
              //   </Protected>
              // }
            />

            {/* <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </AuthProvider>
    </BlogProvider>
  );
}

export default App;
