import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import data from './config.json';
import ThemeToggle from './components/ThemeToggle.jsx';
import SiteNav from './components/SiteNav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { pathname } = useLocation();

  // Start each page at the top instead of keeping the previous scroll position
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <ThemeToggle />
      <SiteNav />

      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/portfolio" element={<Portfolio data={data} />} />
        <Route path="/blog" element={<Blog data={data} />} />
        <Route path="/blog/:slug" element={<BlogPost data={data} />} />
        <Route path="*" element={<NotFound data={data} />} />
      </Routes>

      <Footer data={data} />
    </>
  );
}
