import { useState, useEffect } from "react";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import "./Blog.css";

const LIMIT = 9;

function BlogCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="blog_card">
      <div className="blog_banner">
        <span>{post.tags?.[0] || "blog"}</span>
      </div>

      <div className="blog_body">
        <h3>{post.title}</h3>

        <p className={expanded ? "blog_text open" : "blog_text"}>{post.body}</p>

        <button className="blog_more" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Read more"}
        </button>

        <div className="blog_tags">
          {post.tags?.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>

        <div className="blog_meta">
          <p>
            <FaEye /> {post.views}
          </p>
          <p>
            <FaThumbsUp /> {post.reactions?.likes}
          </p>
        </div>
      </div>
    </article>
  );
}

function BlogSkeleton() {
  return (
    <div className="blog_card blog_sk_card">
      <div className="blog_sk blog_sk_banner"></div>
      <div className="blog_body">
        <div className="blog_sk blog_sk_line title"></div>
        <div className="blog_sk blog_sk_line"></div>
        <div className="blog_sk blog_sk_line"></div>
        <div className="blog_sk blog_sk_line short"></div>
      </div>
    </div>
  );
}

function Blog() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(false);

    fetch(`https://dummyjson.com/posts?limit=${LIMIT}&skip=${(page - 1) * LIMIT}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setPosts(data.posts);
          setTotal(data.total);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setError(true);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="blog_page">
      <div className="container">
        <div className="top_slide">
          <h2>Our Blog</h2>
          <p>News, tips and stories from our store.</p>
        </div>

        {error ? (
          <p className="blog_error">Something went wrong. Please try again.</p>
        ) : (
          <div className="blog_grid">
            {loading
              ? [...Array(6)].map((_, i) => <BlogSkeleton key={i} />)
              : posts.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        )}

        {!error && totalPages > 1 && (
          <div className="blog_pagination">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1 || loading}
            >
              Previous
            </button>

            <p>
              Page {page} of {totalPages}
            </p>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages || loading}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;